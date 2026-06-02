# Harbour.Space Clone — Docker Setup

This project runs entirely in Docker with a single command.

## Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+

## Quick Start

### 1. Build and run
```bash
docker-compose up --build -d
```

Or using npm scripts:
```bash
npm run docker:build
npm run docker:up
```

### 2. Access the application
- **App:** http://localhost:3000
- **API:** http://localhost:3000/api/*

### 3. Stop the application
```bash
docker-compose down
```

Or:
```bash
npm run docker:down
```

## Docker Commands Reference

| Command | Description |
|---------|-------------|
| `npm run docker:build` | Build the Docker image |
| `npm run docker:up` | Start containers in detached mode |
| `npm run docker:down` | Stop and remove containers |
| `npm run docker:logs` | Follow application logs |
| `docker-compose up --build` | Build and start in foreground |
| `docker-compose up --build -d` | Build and start in background |

## Architecture

- **Base Image:** `node:20-alpine`
- **Build Stages:**
  1. `deps` — Install npm dependencies
  2. `builder` — Generate Prisma client and build Next.js app
  3. `runner` — Production image with standalone output
- **Database:** SQLite (file-based, included in image)
- **Port:** 3000
- **Healthcheck:** Checks `/api/programs` endpoint every 30s

## Environment Variables

Set these in `docker-compose.yml` or via `.env`:

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `file:./dev.db` | SQLite database path |
| `JWT_SECRET` | `hs-docker-secret-2026` | JWT signing secret |
| `NODE_ENV` | `production` | Runtime environment |

## Database Persistence

By default, the database lives inside the container. To persist data across restarts, uncomment the volumes section in `docker-compose.yml`:

```yaml
volumes:
  - ./dev.db:/app/dev.db
```

This mounts your local `dev.db` into the container.

## Troubleshooting

### Port already in use
If port 3000 is occupied, change the port mapping in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"
```

### Rebuild after code changes
```bash
docker-compose down
docker-compose up --build -d
```

### View logs
```bash
docker-compose logs -f app
```
