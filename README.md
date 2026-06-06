# Rail Event Monitor

A JD-practice full-stack project for event-driven railroad operations monitoring.

## Stack
- Backend: Java 17, Spring Boot 3, Spring Security (JWT), Spring AMQP, WebSocket, Flyway, PostgreSQL
- Frontend: Angular 19 standalone app
- Messaging: RabbitMQ
- Simulator: Python + pika
- Dev tooling: Swagger UI, RabbitMQ Management UI, Adminer

## Quick Start

```bash
cp .env.example .env
docker compose up --build
```

## Service Map
- Frontend dashboard: http://localhost:4200
- Backend API: http://localhost:18080
- Swagger UI: http://localhost:18080/swagger-ui.html
- RabbitMQ Management UI: http://localhost:15672
- Adminer: http://localhost:8888
- Active incidents API: http://localhost:18080/api/incidents/active

## Demo Credentials
- **Frontend Dashboard**: `ops@railmonitor.local` / `demo1234`
- **RabbitMQ Management**: `guest` / `guest`
- **Adminer**:
  - System: `PostgreSQL`
  - Server: `db`
  - Username: `postgres`
  - Password: `postgres`
  - Database: `rail_monitor`

## Local Frontend Dev (optional)

```bash
cd frontend
npm install
npm start
```

## Backend Test

```bash
cd backend
mvn test
```

## Storybook

```bash
cd frontend
npm run storybook
```

Storybook runs at http://localhost:6006.

## Kubernetes Manifests

Initial local-demo manifests live in `k8s/`.

```bash
kubectl apply -f k8s/
```
