# Fiber Base Project

A complete Go Fiber REST API project with comprehensive CRUD operations, testing, and clean architecture.

## Features

- 🚀 **Complete User CRUD API** with pagination, search, and sorting
- 🧪 **Comprehensive Testing** (Unit, Integration, E2E)
- 🔒 **Password Hashing** with bcrypt
- ✅ **Request Validation** with go-playground/validator
- 🗄️ **PostgreSQL** database with GORM
- 🌐 **CORS Support**
- 📝 **Request Logging**
- ⚡ **Rate Limiting**
- 🏗️ **Clean Architecture** (handlers, services, repositories)
- 🔧 **Configuration Management** with Viper
- 🐳 **Docker Support**

## API Endpoints

### Users
- `POST /api/v1/users` - Create user
- `GET /api/v1/users` - Get all users (with pagination)
- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user
- `PUT /api/v1/users/:id/password` - Change password

### Query Parameters (for GET /users)
- `page` - Page number (default: 1)
- `page_size` - Items per page (default: 10, max: 100)
- `search` - Search in username, email, first_name, last_name
- `sort_by` - Sort field: username, email, first_name, last_name, created_at, updated_at
- `sort_dir` - Sort direction: asc, desc (default: desc)

## Project Structure

```
├── api/
│   ├── dto/           # Data Transfer Objects
│   └── routes/        # Route definitions
├── cmd/
│   └── server/        # Application entry point
├── config/            # Configuration files
├── internal/
│   ├── config/        # Configuration loading
│   ├── database/
│   │   └── migrations/ # Database migrations
│   ├── handlers/      # HTTP handlers
│   ├── initialize/    # Application initialization
│   ├── middleware/    # Custom middleware
│   ├── models/        # Database models
│   ├── repositories/  # Data access layer
│   ├── services/      # Business logic layer
│   └── utils/         # Utility functions
├── tests/
│   ├── integration/   # Integration tests
│   └── unit/          # Unit tests
└── web/
    └── static/        # Static files
```

## Quick Start

### Prerequisites

- Go 1.21+
- PostgreSQL 15+
- Make (optional)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/ntthanh2603/fiber-base.git
cd fiber-base
```

2. **Install dependencies**
```bash
go mod download
```

3. **Setup database**
```bash
# Using Docker
make dev-db

# Or create manually
createdb fiber-base
```

4. **Configure database**
Edit `config/local.yaml`:
```yaml
server:
  port: 3000
postgresql:
  host: localhost
  port: 5432
  username: fiber-base
  password: 123456
  dbname: fiber-base
logger:
  log_level: debug
  file_log_name: "./storage/logs/dev.001.log"
  max_size: 10
  max_backups: 5
  max_age: 30
  compress: true
```

5. **Run the application**
```bash
make run
# or
go run ./cmd/server/main.go
```

The server will start on `http://localhost:3000`

## Testing

### Run all tests
```bash
make test
```

### Run specific test types
```bash
make test-unit        # Unit tests only
make test-integration # Integration tests (requires database)
make test-coverage    # Generate coverage report
```

### Test database setup
For integration tests, create a test database:
```bash
createdb fiber-base-test
```

## Development

### Available Make commands
```bash
make run              # Run the application
make build            # Build binary
make test             # Run all tests
make test-unit        # Run unit tests
make test-integration # Run integration tests
make test-coverage    # Generate test coverage
make lint             # Run linter
make fmt              # Format code
make tidy             # Clean up dependencies
make clean            # Clean build artifacts
make dev-setup        # Install development tools
make dev-db           # Start PostgreSQL in Docker
```

### Database migrations
```bash
make migrate          # Run migrations
make migrate-down     # Rollback migrations
make migrate-create name=migration_name  # Create new migration
```

## API Examples

### Create User
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

### Get Users with Pagination
```bash
curl "http://localhost:3000/api/v1/users?page=1&page_size=10&search=john&sort_by=created_at&sort_dir=desc"
```

### Update User
```bash
curl -X PUT http://localhost:3000/api/v1/users/{user-id} \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Johnny",
    "last_name": "Doe"
  }'
```

### Change Password
```bash
curl -X PUT http://localhost:3000/api/v1/users/{user-id}/password \
  -H "Content-Type: application/json" \
  -d '{
    "current_password": "oldpassword",
    "new_password": "newpassword123"
  }'
```

## Docker

### Using Docker Compose
```bash
make docker-up    # Start all services
make docker-down  # Stop all services
make docker-logs  # View logs
```

### Build Docker image
```bash
docker build -t fiber-base .
```

## Architecture

This project follows Clean Architecture principles:

- **Handlers** (`internal/handlers/`) - HTTP request/response handling
- **Services** (`internal/services/`) - Business logic and orchestration
- **Repositories** (`internal/repositories/`) - Data access and persistence
- **Models** (`internal/models/`) - Domain entities
- **DTOs** (`api/dto/`) - Data transfer objects for API
- **Middleware** (`internal/middleware/`) - Cross-cutting concerns

## Testing Strategy

1. **Unit Tests** - Test individual functions and methods in isolation
2. **Integration Tests** - Test API endpoints with real database
3. **Repository Tests** - Test data access layer with mock database
4. **Service Tests** - Test business logic with mock repositories

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for your changes
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License