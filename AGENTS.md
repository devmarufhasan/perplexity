# Project Agent Guide

## Overview
- Project root contains a React + Vite frontend in [`frontend`](/Users/maruf/Documents/Course/sheriyans/perplexity/frontend) and a Node.js backend in [`backend`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend).
- Frontend stack: React 19, Vite 8, ESLint.
- Backend stack: Express 5, Mongoose, dotenv, CORS, cookie-parser, JSON Web Token support.
- Database: MongoDB.
- Container orchestration: [`docker-compose.yml`](/Users/maruf/Documents/Course/sheriyans/perplexity/docker-compose.yml) for production-style runs and [`docker-compose.dev.yml`](/Users/maruf/Documents/Course/sheriyans/perplexity/docker-compose.dev.yml) for live-reload development.
- Module system: native ES modules in both apps.

## Repository Responsibilities
- [`frontend`](/Users/maruf/Documents/Course/sheriyans/perplexity/frontend): client application, built with Vite and served by Nginx in production containers.
- [`backend`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend): API server and database access.
- [`docker-compose.yml`](/Users/maruf/Documents/Course/sheriyans/perplexity/docker-compose.yml): production-minded Compose stack for `frontend`, `backend`, and `mongodb`.
- [`docker-compose.dev.yml`](/Users/maruf/Documents/Course/sheriyans/perplexity/docker-compose.dev.yml): bind-mounted developer workflow with Vite and nodemon.
- [`frontend/nginx.conf`](/Users/maruf/Documents/Course/sheriyans/perplexity/frontend/nginx.conf): SPA serving and reverse proxy rules for `/api` and `/health`.

## Architecture Summary
- [`backend/server.js`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/server.js) is the bootstrap entrypoint. It loads env config indirectly, connects to MongoDB, starts HTTP listening, and handles graceful shutdown.
- [`backend/src/app.js`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/src/app.js) builds the Express app only. Keep it focused on middleware and route registration.
- [`backend/src/config/env.js`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/src/config/env.js) centralizes env loading and validation.
- [`backend/src/config/db.js`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/src/config/db.js) owns the Mongoose connection.
- [`backend/src/routes/index.js`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/src/routes/index.js) is the `/api/v1` base router.
- Middleware is centralized under [`backend/src/middlewares`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/src/middlewares).
- [`frontend/Dockerfile`](/Users/maruf/Documents/Course/sheriyans/perplexity/frontend/Dockerfile) uses a Vite build stage and an Nginx runtime stage.
- [`backend/Dockerfile`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/Dockerfile) provides separate development and production targets.

## Folder Responsibilities
- [`backend/server.js`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/server.js): startup and shutdown lifecycle.
- [`backend/src/app.js`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/src/app.js): app composition.
- [`backend/src/config`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/src/config): environment and infrastructure config.
- [`backend/src/routes`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/src/routes): route grouping and versioned API mounting.
- [`backend/src/controllers`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/src/controllers): request/response handlers.
- [`backend/src/middlewares`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/src/middlewares): Express middleware, especially shared request error handling.
- Add [`backend/src/models`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/src/models) when domain entities are introduced.
- Add [`backend/src/services`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/src/services) only when business logic becomes too large for controllers.
- [`frontend/src`](/Users/maruf/Documents/Course/sheriyans/perplexity/frontend/src): React app source.
- [`frontend/public`](/Users/maruf/Documents/Course/sheriyans/perplexity/frontend/public): static assets copied as-is by Vite.

## Naming Conventions
- Use lowercase file names with hyphens for multi-word modules: `error-handler.js`, `health-controller.js`.
- Keep default exports for singleton-style modules like the Express app or router.
- Prefer named exports for utilities, middleware, and controller functions.
- Use clear verb-based controller names like `getUserProfile`, `createSession`, `updatePost`.
- Keep Docker-related files explicit and colocated with the service they build.

## Route, Controller, and Service Conventions
- Mount API routes under `/api/v1`.
- Keep routes thin: define paths and attach controller handlers only.
- Keep controllers focused on HTTP concerns: validation handoff, calling services/models, and shaping responses.
- Introduce a service layer only when logic is reused or complex; don’t add service wrappers for trivial CRUD.
- Return JSON consistently with a top-level `success` flag and a concise `message` when useful.

## Config and Env Conventions
- Load env vars only through [`backend/src/config/env.js`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/src/config/env.js).
- Add every new env variable to [`backend/.env.example`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/.env.example).
- Treat required env values as startup requirements and fail fast if they are missing.
- Use `PORT`, `NODE_ENV`, and `MONGODB_URI` naming unless a strong reason exists to diverge.
- Keep Compose-level variables in the root `.env`, and app-local examples in service-specific `.env.example` files.

## Database Conventions
- Current database technology is MongoDB via Mongoose.
- Keep connection logic centralized in [`backend/src/config/db.js`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/src/config/db.js).
- Define future schemas in `src/models` and keep schema options explicit.
- Avoid scattering raw connection logic across routes or controllers.
- Prefer service-name networking in Docker (`mongodb`, `backend`) instead of `localhost`.

## Middleware Conventions
- Register global middleware in [`backend/src/app.js`](/Users/maruf/Documents/Course/sheriyans/perplexity/backend/src/app.js) in this order:
  1. security/basic request middleware
  2. parsers
  3. cookies
  4. routes
  5. not-found middleware
  6. global error middleware
- Keep middleware single-purpose and reusable.
- Avoid embedding route-specific middleware inline once it grows beyond a tiny check.

## Error Handling Rules
- Unknown routes must flow through the not-found middleware.
- Operational errors should carry `statusCode` and readable client-safe messages.
- The global error middleware should be the only place that formats final error responses.
- Do not leak internal stack traces in production responses.

## Do and Don’t Rules
- Do preserve the current stack: npm, Vite, React, Express, Mongoose, ES modules.
- Do keep `server.js` separate from `src/app.js`.
- Do extend the versioned router instead of attaching most new routes directly to the app.
- Do keep production Docker images lean and prefer multi-stage builds.
- Do use Compose service names for inter-container communication.
- Do update this file when architecture or conventions change.
- Don’t switch database technology unless the codebase itself requires it.
- Don’t access `process.env` all over the codebase; use the env config module.
- Don’t add abstractions before there is real complexity.
- Don’t remove or silently change existing route contracts without checking all callers.
- Don’t hardcode container-only hostnames like `mongodb` into local-only env examples.
