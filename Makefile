.PHONY: run build test test-unit test-integration migrate seed lint fmt docker-up docker-down clean tidy swagger-docs

run:
	go run ./cmd/server/main.go

build:
	go build -o bin/app ./cmd/server/main.go

test:
	go test ./...

test-unit:
	go test ./tests/unit/...

test-integration:
	go test ./tests/integration/...

test-coverage:
	go test -race -coverprofile=coverage.txt -covermode=atomic ./...

migrate:
	migrate -path internal/database/migrations -database "postgresql://fiber-base:123456@localhost:5432/fiber-base?sslmode=disable" up

migrate-down:
	migrate -path internal/database/migrations -database "postgresql://fiber-base:123456@localhost:5432/fiber-base?sslmode=disable" down

migrate-create:
	migrate create -ext sql -dir internal/database/migrations $(name)

seed:
	go run ./cmd/seed/main.go

lint:
	golangci-lint run

fmt:
	go fmt ./...

tidy:
	go mod tidy

clean:
	rm -rf bin/
	rm -f coverage.txt

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-logs:
	docker-compose logs -f

docker-dev:
	docker-compose -f docker-compose.dev.yml up -d

docker-dev-down:
	docker-compose -f docker-compose.dev.yml down

docker-prod:
	docker-compose -f docker-compose.prod.yml up -d

docker-prod-down:
	docker-compose -f docker-compose.prod.yml down

docker-build:
	docker build -t fiber-base:latest .

docker-build-prod:
	docker build -f Dockerfile.prod -t fiber-base:prod .

docker-clean:
	docker-compose down -v
	docker system prune -f
	docker volume prune -f

docker-restart: docker-down docker-up

docker-restart-dev: docker-dev-down docker-dev

docker-restart-prod: docker-prod-down docker-prod

# Development helpers
dev-setup:
	go mod download
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
	go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

dev-db:
	docker run --name fiber-base-postgres -e POSTGRES_USER=fiber-base -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=fiber-base -p 5432:5432 -d postgres:15-alpine

# Swagger documentation
swagger-docs:
	swag init -g cmd/server/main.go --output ./docs