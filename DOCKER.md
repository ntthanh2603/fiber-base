# Docker Setup Guide

This guide explains how to run the fiber-base application using Docker and Docker Compose.

## Prerequisites

- Docker Desktop or Docker Engine
- Docker Compose v3.8+

## Quick Start

### Development Environment

```bash
# Start development services (PostgreSQL, Redis, PgAdmin)
make docker-dev

# Or using docker-compose directly
docker-compose -f docker-compose.dev.yml up -d

# Run the app locally
make run
```

### Production Environment

```bash
# Copy environment variables
cp .env.example .env
# Edit .env with your production values

# Start all services including the app
make docker-prod

# Or using docker-compose directly
docker-compose -f docker-compose.prod.yml up -d
```

### Default Environment

```bash
# Start all services with default configuration
make docker-up

# Or using docker-compose directly
docker-compose up -d
```

## Available Services

### Core Services

| Service | Port | Description |
|---------|------|-------------|
| **app** | 3000 | Fiber application |
| **postgres** | 5432 | PostgreSQL database |
| **redis** | 6379 | Redis cache |

### Management Services

| Service | Port | Description | Credentials |
|---------|------|-------------|-------------|
| **pgadmin** | 5050 | PostgreSQL admin | admin@fiber-base.com / admin123 |
| **nginx** | 80, 443 | Reverse proxy | - |
| **grafana** | 3001 | Monitoring dashboard | admin / (see .env) |
| **prometheus** | 9090 | Metrics collector | - |

## Docker Files

### Dockerfiles

- `Dockerfile` - Standard development build
- `Dockerfile.prod` - Optimized production build with security enhancements

### Docker Compose Files

- `docker-compose.yml` - Full stack with all services
- `docker-compose.dev.yml` - Development dependencies only
- `docker-compose.prod.yml` - Production stack with monitoring

## Environment Variables

### Required for Production

```bash
POSTGRES_PASSWORD=your_secure_password
JWT_SECRET=your_jwt_secret_key
```

### Optional

```bash
GRAFANA_PASSWORD=your_grafana_password
REDIS_PASSWORD=your_redis_password
SENTRY_DSN=your_sentry_dsn
```

See `.env.example` for full list.

## Make Commands

### Basic Operations

```bash
make docker-up          # Start default stack
make docker-down        # Stop default stack
make docker-logs        # View logs
make docker-restart     # Restart all services
```

### Environment-Specific

```bash
make docker-dev         # Start development stack
make docker-dev-down    # Stop development stack
make docker-prod        # Start production stack
make docker-prod-down   # Stop production stack
```

### Build & Maintenance

```bash
make docker-build       # Build development image
make docker-build-prod  # Build production image
make docker-clean       # Clean up containers and volumes
```

## Scripts

### Automated Scripts

```bash
# Start with health checks
./scripts/docker-start.sh [dev|prod]

# Stop with optional cleanup
./scripts/docker-stop.sh [dev|prod] [--cleanup]
```

## Networking

### Default Network

- **Network**: `fiber-network` (172.20.0.0/16)
- **Services**: All services communicate via service names

### Production Network

- **Network**: `fiber-prod-network` (172.21.0.0/16)
- **Isolation**: Production services are isolated

## Volumes

### Persistent Data

```bash
postgres_data     # Database data
redis_data        # Redis persistence
nginx_logs        # Nginx access/error logs
grafana_data      # Grafana dashboards
prometheus_data   # Metrics data
```

### Development Volumes

```bash
./config:/root/config:ro           # Configuration files
./storage/logs:/root/storage/logs  # Application logs
./storage/uploads:/root/storage    # File uploads
```

## Health Checks

All services include health checks:

- **PostgreSQL**: `pg_isready`
- **Redis**: `redis-cli ping`
- **Application**: HTTP GET to `/api/v1/users`
- **Nginx**: `nginx -t`

## Monitoring

### Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app

# With timestamps
docker-compose logs -f -t app
```

### Metrics

- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001
- **Application metrics**: http://localhost:3000/metrics

## Troubleshooting

### Common Issues

1. **Port conflicts**
   ```bash
   # Check what's using port 3000
   netstat -tulpn | grep :3000
   lsof -i :3000
   ```

2. **Database connection issues**
   ```bash
   # Check PostgreSQL logs
   docker-compose logs postgres
   
   # Test connection
   docker-compose exec postgres psql -U fiber-base -d fiber-base
   ```

3. **Memory issues**
   ```bash
   # Check container resources
   docker stats
   
   # Increase Docker Desktop memory
   # Docker Desktop > Settings > Resources > Memory
   ```

### Reset Everything

```bash
# Complete reset
make docker-clean
docker system prune -a
docker volume prune -f

# Restart fresh
make docker-up
```

## Production Deployment

### SSL/HTTPS

1. **Generate SSL certificates**
   ```bash
   mkdir -p ssl
   # Add your SSL certificates to ./ssl/
   ```

2. **Update nginx configuration**
   ```bash
   # Edit nginx/nginx.prod.conf
   # Update server_name with your domain
   ```

### Environment Setup

1. **Create production .env**
   ```bash
   cp .env.example .env
   # Edit with production values
   ```

2. **Deploy**
   ```bash
   make docker-prod
   ```

### Security Considerations

- Change default passwords
- Use strong JWT secrets
- Configure firewall rules
- Enable SSL/TLS
- Regular security updates
- Monitor logs

## Development Workflow

### Local Development

```bash
# 1. Start dependencies only
make docker-dev

# 2. Run app locally for hot reload
make run

# 3. Access services
# - App: http://localhost:3000
# - PgAdmin: http://localhost:5050
# - Database: localhost:5432
```

### Testing with Docker

```bash
# Build and test
docker build -t fiber-base-test .
docker run --rm fiber-base-test go test ./tests/unit/...
```

### Database Operations

```bash
# Run migrations
make migrate

# Access database
docker-compose exec postgres psql -U fiber-base -d fiber-base

# Backup database
docker-compose exec postgres pg_dump -U fiber-base fiber-base > backup.sql

# Restore database
docker-compose exec -T postgres psql -U fiber-base -d fiber-base < backup.sql
```