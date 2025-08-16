#!/bin/bash

# Docker startup script for fiber-base

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

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker Desktop."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    print_error "docker-compose is not installed or not in PATH."
    exit 1
fi

# Environment selection
ENVIRONMENT=${1:-dev}

case $ENVIRONMENT in
    dev|development)
        COMPOSE_FILE="docker-compose.dev.yml"
        print_status "Starting development environment..."
        ;;
    prod|production)
        COMPOSE_FILE="docker-compose.prod.yml"
        print_status "Starting production environment..."
        
        # Check for .env file in production
        if [ ! -f .env ]; then
            print_error "Production environment requires .env file. Copy .env.example to .env and configure it."
            exit 1
        fi
        ;;
    *)
        COMPOSE_FILE="docker-compose.yml"
        print_status "Starting default environment..."
        ;;
esac

# Create necessary directories
print_status "Creating necessary directories..."
mkdir -p storage/logs
mkdir -p storage/uploads
mkdir -p backups

# Start services
print_status "Starting services with $COMPOSE_FILE..."
docker-compose -f $COMPOSE_FILE up -d

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 10

# Check service health
print_status "Checking service health..."

# Check PostgreSQL
if docker-compose -f $COMPOSE_FILE ps postgres | grep -q "Up"; then
    print_status "✅ PostgreSQL is running"
else
    print_error "❌ PostgreSQL failed to start"
fi

# Check Redis (if exists)
if docker-compose -f $COMPOSE_FILE ps redis &> /dev/null; then
    if docker-compose -f $COMPOSE_FILE ps redis | grep -q "Up"; then
        print_status "✅ Redis is running"
    else
        print_warning "⚠️  Redis failed to start"
    fi
fi

# Check Application (if exists)
if docker-compose -f $COMPOSE_FILE ps app &> /dev/null; then
    if docker-compose -f $COMPOSE_FILE ps app | grep -q "Up"; then
        print_status "✅ Application is running"
        
        # Test API endpoint
        sleep 5
        if curl -s http://localhost:3000/api/v1/users > /dev/null; then
            print_status "✅ API is responding"
        else
            print_warning "⚠️  API is not responding yet (may still be starting up)"
        fi
    else
        print_error "❌ Application failed to start"
    fi
fi

print_status "🚀 Services started successfully!"
print_status ""
print_status "Available services:"
print_status "  - API: http://localhost:3000"
print_status "  - PostgreSQL: localhost:5432"

if docker-compose -f $COMPOSE_FILE ps redis &> /dev/null; then
    print_status "  - Redis: localhost:6379"
fi

if docker-compose -f $COMPOSE_FILE ps pgadmin &> /dev/null; then
    print_status "  - PgAdmin: http://localhost:5050"
fi

if docker-compose -f $COMPOSE_FILE ps nginx &> /dev/null; then
    print_status "  - Nginx: http://localhost:80"
fi

if docker-compose -f $COMPOSE_FILE ps grafana &> /dev/null; then
    print_status "  - Grafana: http://localhost:3001"
fi

print_status ""
print_status "To stop services: docker-compose -f $COMPOSE_FILE down"
print_status "To view logs: docker-compose -f $COMPOSE_FILE logs -f"