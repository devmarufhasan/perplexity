# Project Run Guide

## Overview

This project supports two main ways to run:

- Development mode: live reload, bind mounts, Vite dev server, and nodemon
- Production-style mode: built containers for frontend, backend, and MongoDB

## Files You Should Know

- [`docker-compose.dev.yml`](/Users/maruf/Documents/Course/sheriyans/perplexity/docker-compose.dev.yml): development containers with auto sync
- [`docker-compose.yml`](/Users/maruf/Documents/Course/sheriyans/perplexity/docker-compose.yml): production-style container setup
- [`.env.example`](/Users/maruf/Documents/Course/sheriyans/perplexity/.env.example): root Docker/Compose env template
- [`backend/.env.example`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/.env.example): backend local env template for running backend outside Docker

## Environment Files

### Root `.env`

Used by Docker Compose.

Create it once:

```bash
cp .env.example .env
```

This file controls:

- published ports
- MongoDB container credentials
- database name
- Compose runtime settings

### `backend/.env`

Used only when running the backend directly with Node on your machine.

Create it once:

```bash
cp backend/.env.example backend/.env
```

This file is not required for normal Docker Compose runs.

## Development Mode

Use this when you are actively coding and want instant updates.

Start development containers:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Run in background:

```bash
docker compose -f docker-compose.dev.yml up --build -d
```

Stop development containers:

```bash
docker compose -f docker-compose.dev.yml down
```

What development mode gives you:

- frontend auto reload through Vite
- backend auto restart through nodemon
- code changes from your host machine are mounted into the containers
- MongoDB runs in Docker with persistent named volumes

Development URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Backend health: `http://localhost:3000/health`
- API root: `http://localhost:3000/api/v1`
- MongoDB: `localhost:27017`

## Production-Style Mode

Use this when you want to run the app the way containers would run in a deployed environment.

Start production-style containers:

```bash
docker compose up --build
```

Run in background:

```bash
docker compose up --build -d
```

Stop production-style containers:

```bash
docker compose down
```

This mode:

- builds the frontend into static files
- serves the frontend with Nginx
- runs the backend as a production Node container
- connects backend to MongoDB using Docker service networking
- does not auto sync source code changes

Production-style URLs:

- Frontend: `http://localhost:8080`
- Backend: `http://localhost:3000`
- Backend health: `http://localhost:3000/health`
- API root: `http://localhost:3000/api/v1`

## Important Difference Between Development And Production

### Development

- changes on your host machine appear inside containers immediately
- frontend hot reload works
- backend restarts automatically
- best for coding

### Production-Style

- containers run from built images
- code changes do not appear automatically
- you need rebuild/restart after changes

Rebuild after changes:

```bash
docker compose up --build
```

## Logs And Status

Check running containers:

```bash
docker compose ps
```

Check development containers:

```bash
docker compose -f docker-compose.dev.yml ps
```

View logs:

```bash
docker compose logs -f
```

View development logs:

```bash
docker compose -f docker-compose.dev.yml logs -f
```

## Rebuild Tips

Rebuild a single service:

```bash
docker compose build frontend
docker compose build backend
```

Restart a single service:

```bash
docker compose up -d frontend
docker compose up -d backend
```

## Clean Up

Stop and remove containers:

```bash
docker compose down
```

Stop and remove development containers:

```bash
docker compose -f docker-compose.dev.yml down
```

Remove volumes too:

```bash
docker compose down -v
```

For development:

```bash
docker compose -f docker-compose.dev.yml down -v
```

Be careful: removing volumes deletes MongoDB data for that stack.

## Service Communication

Inside Docker:

- frontend container reaches backend through `backend`
- backend container reaches MongoDB through `mongodb`

Examples:

- backend Mongo URI in Docker: `mongodb://admin:change_me@mongodb:27017/perplexity?authSource=admin`
- frontend Nginx proxy forwards `/api/*` to `http://backend:3000`

Outside Docker from your browser:

- frontend is accessed through `localhost:5173` in dev
- frontend is accessed through `localhost:8080` in production-style mode
- backend is accessed through `localhost:3000`

## Local Non-Docker Backend Run

If you want to run only the backend locally without Docker:

```bash
cd backend
npm install
npm run dev
```

For that path, `backend/.env` must exist and should use `localhost` for MongoDB.

## Recommended Workflow

For daily coding:

```bash
docker compose -f docker-compose.dev.yml up --build
```

For production-like validation:

```bash
docker compose up --build
```
