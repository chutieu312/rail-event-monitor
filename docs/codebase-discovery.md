# Codebase Discovery — Rail Event Monitor

## Discovery Findings (Step 1)

### 1A — Language and Runtime
- **Backend:** Java 17 (`<java.version>17</java.version>` in `pom.xml`)
- **Frontend:** TypeScript (Angular 19)
- **Simulator:** Python 3 (`simulator.py`, uses `pika`)

### 1B — Frameworks and Libraries
- **Web framework:** Spring Boot 3.4.2
- **ORM:** Spring Data JPA + Hibernate (Jakarta Persistence)
- **Frontend framework:** Angular 19 (standalone component architecture)
- **Auth library:** Spring Security 6 + JJWT 0.12.6
- **Testing:** JUnit 5, Mockito, Testcontainers, Spring Boot Test (MockMvc)

### 1C — Build and Package Management
- **Backend:** Maven (`pom.xml`)
- **Frontend:** npm (`package.json`, `package-lock.json`)
- **Simulator:** pip (`requirements.txt`)

### 1D — Database and Storage
- **Database:** PostgreSQL 16 (relational)
- **Migrations:** Flyway (`backend/src/main/resources/db/migration/`)
  - `V1__init.sql` — creates `trains` and `train_events` tables
  - `V2__seed_data.sql` — seeds 3 demo trains
  - `V3__incidents.sql` — creates `incidents` table with index

### 1E — Async and Event-Driven
- **Message broker:** RabbitMQ (direct exchange, durable queue)
- **Consumer:** Spring AMQP `@RabbitListener` in `TrainEventListener`
- **Producer:** Python `pika` simulator publishing JSON every 3 seconds
- **Real-time push:** STOMP over SockJS WebSocket (`/ws/events`)

### 1F — API Style
- **REST API** (`/api/auth`, `/api/trains`, `/api/events`, `/api/incidents`)
- **WebSocket (STOMP/SockJS)** for real-time event and incident streaming
- **API documentation:** SpringDoc OpenAPI / Swagger UI at `/swagger-ui.html`

### 1G — CI/CD Pipeline
- **System:** GitHub Actions (`.github/workflows/ci.yml`)
- **Jobs:** `backend-test` → `frontend-build` → `docker-build` → `deploy-staging`
- **CD:** Docker images pushed to DockerHub; Render deploy hook triggered; health polled

### 1H — Containerization and Orchestration
- `Dockerfile` for backend, frontend, and simulator
- `docker-compose.yml` orchestrates: db, rabbitmq, backend, frontend, simulator, adminer
- Kubernetes manifests in `k8s/` (backend, frontend, postgres, rabbitmq, simulator, configmap, secret, namespace)

### 1I — Cloud Infrastructure
- **Target platform:** Render.com (documented in `docs/render-cd-setup.md`)
- **Frontend hosting:** Render Static Site (built from Angular, served via CDN)
- **Backend hosting:** Render Web Service (Docker image from DockerHub)
- **No IaC tool** — deployment driven by `render.yaml` not present yet; CD via deploy hook

### 1J — Observability
- Spring Boot Actuator `/actuator/health` endpoint (exposed in `application.yml`)
- No structured logging config beyond Spring Boot defaults
- No metrics export, distributed tracing, or alerting configured

### 1K — Security
- JWT auth (HMAC-SHA, 1-hour expiry) via JJWT library
- `JwtAuthFilter` — `OncePerRequestFilter` reads `Authorization: Bearer` header
- `SecurityConfig` — stateless session, CORS via `CorsConfigurationSource`, public routes explicitly whitelisted
- Secrets via environment variables; `.env` excluded from git

### 1L — Documentation and Developer Experience
- `README.md` — quick start, service map, credentials
- `docs/render-cd-setup.md` — CD setup guide
- Storybook (`storybook-static/`) for `LoginComponent` and `IncidentBannerComponent`
- `.env.example` — not found (gap)
- `Makefile` / `Taskfile` — not found

---

## Phase Plan (Step 2)

| # | Phase Name |
|---|---|
| 0 | **Welcome** |
| 1 | **Maven `pom.xml` + `application.yml` — Dependencies and Configuration** |
| 2 | **Spring Boot Entry Point — `RailEventMonitorApplication` and Startup Sequence** |
| 3 | **Flyway Migrations + PostgreSQL Schema — `V1`, `V2`, `V3` SQL files** |
| 4 | **JPA Domain Model — `Train`, `TrainEvent`, `Incident` entities** |
| 5 | **Spring Data JPA Repositories + Service Layer** |
| 6 | **REST API Layer — `TrainController`, `IncidentController`, `EventController`, `AuthController`** |
| 7 | **Spring Security + JWT — `SecurityConfig`, `JwtUtil`, `JwtAuthFilter`** |
| 8 | **RabbitMQ + STOMP WebSocket — `RabbitMqConfig`, `TrainEventListener`, `EventProcessorService`, `WebSocketConfig`** |
| 9 | **Python Event Simulator — `simulator.py`** |
| 10 | **Angular 19 Frontend — Routing, Auth, Services, Dashboard, Components** |
| 11 | **Testing — `TrainServiceTest` (Mockito unit), `RailMonitorApiIntegrationTest` (Testcontainers)** |
| 12 | **GitHub Actions CI/CD — `ci.yml`, Docker build + push, Render deploy + health check** |
| 13 | **Docker Compose + Kubernetes Manifests — Local and Cloud Topology** |
| 14 | **Wrap-Up, Full End-to-End Trace, and Open Q&A** |

---

## Session Progress

- [ ] Phase 0 — Welcome
- [ ] Phase 1 — Maven + application.yml
- [ ] Phase 2 — Spring Boot Entry Point
- [ ] Phase 3 — Flyway Migrations + PostgreSQL Schema
- [ ] Phase 4 — JPA Domain Model
- [ ] Phase 5 — Repositories + Service Layer
- [ ] Phase 6 — REST API Layer
- [ ] Phase 7 — Spring Security + JWT
- [ ] Phase 8 — RabbitMQ + STOMP WebSocket
- [ ] Phase 9 — Python Event Simulator
- [ ] Phase 10 — Angular 19 Frontend
- [ ] Phase 11 — Testing
- [ ] Phase 12 — GitHub Actions CI/CD
- [ ] Phase 13 — Docker Compose + Kubernetes
- [ ] Phase 14 — Wrap-Up and Open Q&A
