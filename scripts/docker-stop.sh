#!/bin/bash

# Docker stop script for fiber-base

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Environment selection
ENVIRONMENT=${1:-dev}
CLEANUP=${2:-false}

case $ENVIRONMENT in
    dev|development)
        COMPOSE_FILE="docker-compose.dev.yml"
        print_status "Stopping development environment..."
        ;;
    prod|production)
        COMPOSE_FILE="docker-compose.prod.yml"
        print_status "Stopping production environment..."
        ;;
    *)
        COMPOSE_FILE="docker-compose.yml"
        print_status "Stopping default environment..."
        ;;
esac

# Stop services
print_status "Stopping services..."
docker-compose -f $COMPOSE_FILE down

# Cleanup if requested
if [ "$CLEANUP" = "true" ] || [ "$CLEANUP" = "--cleanup" ]; then
    print_warning "Cleaning up volumes and images..."
    
    # Remove volumes
    docker-compose -f $COMPOSE_FILE down -v
    
    # Remove unused images
    docker image prune -f
    
    # Remove unused volumes
    docker volume prune -f
    
    print_status "✅ Cleanup completed"
fi

print_status "🛑 Services stopped successfully!"
print_status ""
print_status "Usage examples:"
print_status "  - Start again: ./scripts/docker-start.sh $ENVIRONMENT"
print_status "  - Clean restart: ./scripts/docker-stop.sh $ENVIRONMENT --cleanup && ./scripts/docker-start.sh $ENVIRONMENT"