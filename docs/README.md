How to use:

Generate docs:

```bash
make swagger-docs
# or
swag init -g cmd/server/main.go --output ./docs
```

Start server:

```bash
make run
# or
go run ./cmd/server/main.go
```

Access Swagger UI: Visit http://localhost:3000/swagger/index.html in your browser
