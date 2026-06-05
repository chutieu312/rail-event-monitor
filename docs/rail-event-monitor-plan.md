# Rail Event Monitor — JD Practice Plan

> **Job:** Software Engineer (Java / Angular) – Siemens Railroad / Transportation  
> **Contract:** 12+ Months | Remote (US Citizens) | Agile  
> **Generated:** 2026-06-04

---

## Original JD Summary

Siemens is seeking a Software Engineer to build and maintain scalable, cloud-native distributed systems for railroad/transportation technology. The stack centers on **Java + Angular** with event-driven messaging (RabbitMQ/Kafka), PostgreSQL/CockroachDB, REST APIs, Docker/Kubernetes, and CI/CD pipelines. The role requires Agile collaboration, code reviews, technical documentation, and mentoring junior engineers.

---

## 1. JD Skill Extraction

### Required Technical Skills
- Java (including JavaFX)
- Angular (front-end)
- JUnit 5 + Mockito (testing)
- REST APIs + JSON
- AMQP messaging protocols
- Event-driven, service-oriented, and cloud-native architectures
- Multithreading, concurrency, and asynchronous IPC
- Git version control
- Docker + Kubernetes
- CI/CD tools and deployment practices
- Strong debugging and analytical skills

### Preferred Technical Skills
- RabbitMQ (AMQP broker)
- PostgreSQL or CockroachDB
- Python development
- Industrial Control Systems (ICS) experience
- Railroad / transportation domain knowledge
- CENELEC safety standards (EN 50128 / EN 50129)

### Soft Skills & Collaboration Expectations
- Agile team collaboration (sprint planning, standups, retrospectives)
- Code reviews and adherence to coding standards
- Technical documentation and software specifications
- Effort estimation and project planning contributions
- Mentoring junior engineers and providing technical leadership
- Ability to work independently in a distributed remote team

---

## 2. Skill Categories

| Category | Skills |
|---|---|
| **Backend** | Java 17, Spring Boot 3, Spring AMQP, Spring WebSocket, Spring Security, REST APIs, multithreading/concurrency |
| **Frontend** | Angular 17+ (standalone components), RxJS, Angular Material, WebSocket client |
| **Database** | PostgreSQL, Spring Data JPA, Flyway migrations |
| **Cloud** | AWS ECS + RDS (deployment target), or Render/Railway for simplicity |
| **DevOps / CI/CD** | Docker, Docker Compose, Kubernetes manifests, GitHub Actions |
| **Testing** | JUnit 5, Mockito, Spring Boot Test, Testcontainers |
| **Security** | Spring Security + JWT (Bearer token auth), secured Swagger UI |
| **AI Tools / Automation** | Python event simulator (synthetic train data generation) |
| **Other** | RabbitMQ (AMQP), Flyway DB migrations, Storybook, springdoc-openapi |

---

## 3. Recommended Mini Project

### Rail Event Monitor

A simplified railroad operations monitoring system that demonstrates real-time train tracking using event-driven architecture. A Python microservice simulates train position and status events by publishing messages to RabbitMQ. A Java Spring Boot backend consumes those events, persists them to PostgreSQL, and broadcasts live updates via WebSocket. An Angular dashboard displays the real-time train grid, event log, and incident alerts.

**Why this project:**
- Small enough to build in a few days
- Demonstrates every major skill in the JD
- Closely mirrors real Siemens domain (railroad signal/ops monitoring)
- Easy to demo live: start the stack with `docker compose up`, show events flowing in real time
- Clear interview story: "I built a simplified version of the kind of event-driven distributed system Siemens deploys in railroad ops"

---

## 4. Why This Project Matches the JD

| JD Responsibility | Project Coverage |
|---|---|
| Build cloud-native and event-driven solutions | Python → RabbitMQ → Java consumer pipeline |
| Develop and consume RESTful APIs | Spring Boot REST API for trains, routes, events |
| Integrate messaging systems (RabbitMQ/Kafka) | RabbitMQ with Spring AMQP, AMQP protocol |
| Design scalable distributed systems | Separate Python simulator, Java processor, Angular UI services |
| Multithreading, concurrency, async IPC | Spring AMQP listener threads, WebSocket async broadcast |
| JUnit + Mockito | Unit tests on service layer with Mockito mocks |
| Docker + Kubernetes | docker-compose for local; K8s manifests for cloud demo |
| CI/CD pipelines | GitHub Actions: build → test → Docker push |
| Technical documentation | Swagger UI auto-generated API docs |
| Agile, code reviews | GitHub PR workflow, branch strategy |
| Railroad/transportation domain | Train, Route, Signal, Incident domain model |

---

## 5. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        docker-compose                           │
│                                                                 │
│  ┌──────────────┐    AMQP     ┌───────────────────────────┐    │
│  │ Python Event │────────────▶│  RabbitMQ (message broker) │    │
│  │  Simulator   │             └────────────┬──────────────┘    │
│  └──────────────┘                          │ AMQP consume       │
│                                            ▼                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           Java Spring Boot Backend (:8080)               │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐   │   │
│  │  │ REST API    │  │ AMQP Listener│  │ WebSocket     │   │   │
│  │  │ /api/trains │  │ (async thread)│  │ /ws/events   │   │   │
│  │  └─────────────┘  └──────┬───────┘  └───────┬───────┘   │   │
│  │                          │                   │           │   │
│  │              ┌───────────▼───────────────────▼───────┐   │   │
│  │              │     Spring Data JPA (PostgreSQL)       │   │   │
│  │              └───────────────────────────────────────┘   │   │
│  │  ┌─────────────────┐                                      │   │
│  │  │ Spring Security │  JWT Bearer token auth               │   │
│  │  │ + Swagger UI    │  /swagger-ui.html                    │   │
│  │  └─────────────────┘                                      │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────┐   ┌──────────────────────────┐   │
│  │  Angular Frontend (:4200)│   │  PostgreSQL (:5432)       │   │
│  │  - Train status grid     │   │  + Adminer (:8888)        │   │
│  │  - Live event log        │   └──────────────────────────┘   │
│  │  - Incident alerts       │                                   │
│  │  - JWT login page        │   ┌──────────────────────────┐   │
│  │  - WebSocket RxJS        │   │  RabbitMQ Mgmt (:15672)  │   │
│  └──────────────────────────┘   └──────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

- **Frontend:** Angular 17 with standalone components, Angular Material, RxJS WebSocket, JWT interceptor
- **Backend:** Java 17 + Spring Boot 3 + Spring AMQP + Spring WebSocket + Spring Security (JWT) + springdoc-openapi
- **Database:** PostgreSQL 16 with Flyway schema migrations
- **Messaging:** RabbitMQ 3 (AMQP) — Python publishes, Java consumes
- **Cloud Services:** AWS ECS (backend) + RDS (PostgreSQL) + ECR (Docker images)
- **CI/CD:** GitHub Actions — build → test → Docker push → optional deploy
- **Testing:** JUnit 5 + Mockito (unit) + Testcontainers (integration)
- **Security:** Spring Security JWT, HTTPS-ready, Swagger UI `Authorize` dialog
- **Developer Exploration Tools:** Swagger UI, Storybook (Angular), Adminer, RabbitMQ Management UI

---

## 6. Tech Stack Mapping

| JD Skill | Project Feature | How I Can Explain It in an Interview |
|---|---|---|
| Java / Spring Boot | REST API, AMQP consumer, WebSocket broadcaster | "I used Spring Boot 3 as the central hub: REST API for CRUD, Spring AMQP for consuming RabbitMQ messages asynchronously, and Spring WebSocket to push updates to the Angular client in real time." |
| Angular | Real-time dashboard, JWT auth, reactive data | "The Angular frontend uses RxJS WebSocket observables to show live train events without polling. I used Angular Material for the data grid and a JWT HTTP interceptor for auth on every API call." |
| RabbitMQ / AMQP | Python publishes events; Java Spring AMQP listens | "RabbitMQ is the event bus. A Python simulator publishes position/status events. The Java backend binds a @RabbitListener to the queue, processes each message in its own thread, persists to Postgres, and fans out to WebSocket clients." |
| PostgreSQL | Spring Data JPA entities, Flyway migrations | "I used Flyway for versioned migrations so the schema is reproducible and reviewable in PRs — same practice used in production CI/CD pipelines." |
| Multithreading / concurrency | Spring AMQP SimpleMessageListenerContainer (thread pool), WebSocket session management | "Spring AMQP uses a configurable listener thread pool. I set concurrentConsumers to demonstrate I understand the threading model and back-pressure concerns." |
| REST APIs + JSON | CRUD endpoints: /api/trains, /api/events, /api/incidents | "Standard REST: proper HTTP verbs, JSON payloads, pagination with Spring Data Pageable, and OpenAPI docs auto-generated by springdoc." |
| Docker | Dockerfile per service, docker-compose.yml | "One command — `docker compose up` — spins up the full stack: backend, frontend, Postgres, RabbitMQ, Python simulator, Adminer, and the RabbitMQ management UI." |
| Kubernetes | k8s/ manifests: Deployments, Services, ConfigMaps, Secrets | "I wrote K8s manifests to show how the app would deploy to a production cluster — Deployments for backend and frontend, a Secret for JWT keys and DB credentials, and a ConfigMap for RabbitMQ connection settings." |
| CI/CD | GitHub Actions: build → test → Docker push | "The pipeline runs on every PR: Maven build and JUnit tests, then builds and pushes Docker images to a registry. On merge to main it optionally deploys to AWS ECS." |
| JUnit 5 + Mockito | Unit tests on TrainService, EventProcessor; Testcontainers integration test | "I mocked RabbitMQ templates and repository interfaces with Mockito so unit tests run without any infrastructure. Then I added a Testcontainers integration test that spins up a real Postgres container to validate Flyway migrations and JPA queries." |
| Python | Event simulator microservice | "The Python service uses `pika` (the Python AMQP client) to publish synthetic train telemetry every few seconds. It demonstrates event producer design and also serves as a conversation starter about polyglot microservices." |
| Spring Security / JWT | Login endpoint, JWT filter, protected API routes | "I implemented stateless JWT auth: the login endpoint returns a signed token, a custom OncePerRequestFilter validates it on every request, and Swagger UI has an Authorize dialog so the interviewer can test protected endpoints live." |
| Git / PR workflow | Feature branch + PR + GitHub Actions gate | "I followed trunk-based development: feature branches, PRs, required CI status checks, and squash merges — the same workflow described in the JD." |
| Cloud deployment | AWS ECS + RDS architecture diagram and deploy script | "I documented the AWS deployment path: ECR for images, ECS Fargate for compute, RDS for managed Postgres, and Secrets Manager for credentials — no hardcoded secrets anywhere." |
| CENELEC / safety awareness | README section on safety-critical design considerations | "I can speak to EN 50128 at a conceptual level: deterministic behavior, auditability, and fail-safe defaults — and explain how the event-sourcing pattern in this project supports auditability of every state change." |

---

## 7. Step-by-Step Build Plan

### Phase 1: Backend Foundation
**Goal:** Running Spring Boot app with REST API, RabbitMQ consumer, WebSocket, and JWT auth.

Tasks:
1. Generate Spring Boot 3 project (Spring Web, Spring AMQP, Spring WebSocket, Spring Security, Spring Data JPA, springdoc-openapi, Flyway, PostgreSQL driver)
2. Implement domain model: `Train`, `Route`, `TrainEvent`, `Incident`
3. Implement `TrainController` and `EventController` with CRUD endpoints
4. Implement `AuthController` with `/api/auth/login` → returns JWT
5. Add `JwtFilter` (OncePerRequestFilter) to secure all `/api/**` routes
6. Implement `RabbitMqEventListener` with `@RabbitListener` — receives `TrainEvent`, persists it, broadcasts via WebSocket
7. Configure `RabbitAdmin` to declare queue/exchange on startup
8. Configure springdoc-openapi with JWT `SecurityScheme` in Swagger UI
9. Write `application.yml` with profiles: `local`, `prod`

**JD Skills:** Java, Spring Boot, REST APIs, AMQP, multithreading, concurrency, Spring Security

---

### Phase 2: Database Layer
**Goal:** PostgreSQL schema managed by Flyway; JPA repositories.

Tasks:
1. Add Flyway migration `V1__init.sql`: create `trains`, `routes`, `train_events`, `incidents` tables
2. Define JPA entities with proper relationships and constraints
3. Create `TrainRepository`, `EventRepository`, `IncidentRepository` (Spring Data JPA)
4. Add a `V2__seed_data.sql` migration with 5 sample trains and 2 routes
5. Verify Flyway runs cleanly on startup

**JD Skills:** PostgreSQL, Flyway, JPA, schema versioning

---

### Phase 3: Frontend UI
**Goal:** Angular dashboard with live event feed, train grid, login page.

Tasks:
1. Generate Angular 17 project with `ng new rail-event-monitor --standalone --routing`
2. Install Angular Material, RxJS, `@stomp/stompjs`
3. Create `AuthService` with `login()`, JWT storage, `HttpInterceptor` to attach `Authorization: Bearer` header
4. Create `LoginComponent`
5. Create `TrainGridComponent` (Angular Material table) — fetches `/api/trains`
6. Create `EventLogComponent` (scrolling list) — connects to WebSocket `/ws/events`, receives live events via RxJS observable
7. Create `IncidentBannerComponent` — highlights active incidents
8. Add `AuthGuard` on `/dashboard` route
9. Configure proxy: `proxy.conf.json` pointing `/api` to backend

**JD Skills:** Angular, RxJS, REST API consumption, async/reactive programming, JWT auth

---

### Phase 4: Testing
**Goal:** JUnit 5 unit tests with Mockito; Testcontainers integration test.

Tasks:
1. Write `TrainServiceTest`: mock `TrainRepository` with Mockito, verify business logic
2. Write `EventProcessorTest`: mock `TrainEventRepository` and `SimpMessagingTemplate`, verify event routing
3. Write `JwtFilterTest`: verify token validation logic with mocked `HttpServletRequest`
4. Write `TrainControllerIntegrationTest` with `@SpringBootTest` + Testcontainers PostgreSQL
5. Verify Flyway migrations run cleanly in container
6. Aim for ≥ 80% line coverage on service layer
7. Add Jacoco plugin to `pom.xml`

**JD Skills:** JUnit 5, Mockito, Testcontainers, code coverage, integration testing

---

### Phase 5: Docker
**Goal:** Full stack running with `docker compose up`.

Tasks:
1. Write `backend/Dockerfile` (multi-stage: Maven build → JRE 17 slim)
2. Write `frontend/Dockerfile` (Node build → nginx serve)
3. Write `python-simulator/Dockerfile`
4. Write `docker-compose.yml` with services:
   - `db` (postgres:16)
   - `rabbitmq` (rabbitmq:3-management)
   - `backend` (depends_on: db, rabbitmq)
   - `frontend` (depends_on: backend)
   - `simulator` (depends_on: rabbitmq)
   - `adminer` (adminer:4, depends_on: db)
5. Add health checks for db and rabbitmq
6. Use `.env` file for secrets (never hardcoded)

**JD Skills:** Docker, Docker Compose, containerization, environment management

---

### Phase 6: CI/CD
**Goal:** GitHub Actions pipeline that builds, tests, and pushes Docker images.

Tasks:
1. Create `.github/workflows/ci.yml`:
   - Trigger: `push` to `main`, PRs to `main`
   - Jobs: `build-and-test` (Maven + JUnit), `build-docker` (build backend image)
2. Add Testcontainers service in the CI runner (Docker-in-Docker or GitHub-hosted runner)
3. Add Docker Hub or GHCR push step (gated to `main` branch merges)
4. Add `CODEOWNERS` file to enforce PR review
5. Add branch protection rule documentation in README

**JD Skills:** Git, CI/CD pipelines, GitHub Actions, Docker push, deployment automation

---

### Phase 7: Cloud Deployment Plan
**Goal:** Document and demonstrate a realistic AWS deployment path.

Tasks:
1. Create `k8s/` directory with:
   - `backend-deployment.yaml` + `backend-service.yaml`
   - `frontend-deployment.yaml` + `frontend-service.yaml`
   - `configmap.yaml` (RabbitMQ host, DB host)
   - `secret.yaml` (JWT secret, DB password — sealed with `kubeseal` in real usage)
2. Document AWS deployment architecture in README:
   - ECR for Docker images
   - ECS Fargate for backend and frontend
   - RDS PostgreSQL for managed DB
   - Amazon MQ for managed RabbitMQ
   - Secrets Manager for JWT key and DB credentials
   - Application Load Balancer + HTTPS
3. Alternative: Render.com free tier (backend as Web Service, DB as managed Postgres) — zero-cost demo option

**JD Skills:** Kubernetes, AWS, cloud-native architecture, secrets management

---

### Phase 8: Developer Exploration Tools
**Goal:** New team members can explore the live running system without reading code first.

#### API Explorer — Swagger UI (springdoc-openapi)
- **Tool:** springdoc-openapi-starter-webmvc-ui
- **Dependency:** `springdoc-openapi-starter-webmvc-ui:2.x` in `pom.xml`
- **URL:** `http://localhost:8080/swagger-ui.html`
- **Config:** Add `@SecurityScheme(type = HTTP, scheme = "bearer", bearerFormat = "JWT")` to main class
- **Workflow:** Hit `POST /api/auth/login` → copy token → click Authorize → test protected endpoints live
- **docker-compose:** Exposed automatically via the `backend` service (no extra container needed)

#### Component Explorer — Storybook (Angular)
- **Tool:** `@storybook/angular`
- **Install:** `npx storybook@latest init` inside `frontend/`
- **Port:** 6006
- **Stories to create:**
  - `TrainGridComponent.stories.ts` — with mock train data
  - `EventLogComponent.stories.ts` — simulated event stream
  - `IncidentBannerComponent.stories.ts` — active vs. clear states
  - `LoginComponent.stories.ts` — form states
- **Run command:** `npm run storybook` (NOT in docker-compose; dev-only)
- **docker-compose:** NOT added; run locally with `npm run storybook`

#### Database Admin UI — Adminer
- **Tool:** Adminer 4
- **Docker image:** `adminer:4`
- **Port:** 8888
- **URL:** `http://localhost:8888`
- **Login:** System: PostgreSQL | Server: db | User: postgres | Password: (from .env)
- **docker-compose:**
```yaml
adminer:
  image: adminer:4
  ports:
    - "8888:8080"
  depends_on:
    - db
```

#### RabbitMQ Management UI (bonus — free with rabbitmq:3-management image)
- **URL:** `http://localhost:15672`
- **Login:** guest / guest
- **Use:** Watch messages flow through the `train.events` queue in real time during demo

---

### Phase 9: Interview Demo Script
**Goal:** 5-minute live demo flow for technical interviews.

```
1. docker compose up (30 seconds)
2. Open browser tabs:
   - http://localhost:4200      → Angular dashboard (log in with demo credentials)
   - http://localhost:8080/swagger-ui.html  → Swagger UI (show JWT authorize flow)
   - http://localhost:15672     → RabbitMQ Management (show queue + message rate)
   - http://localhost:8888      → Adminer (show train_events table growing in real time)

3. Walk the interviewer through the live event flow:
   "The Python simulator is publishing a train event every 3 seconds. 
    You can see the message appear in the RabbitMQ queue here, 
    then the Java backend consumes it, saves it to Postgres (visible in Adminer), 
    and the WebSocket pushes it to the Angular dashboard — no page refresh needed."

4. Open Swagger UI → Authorize → POST /api/events/incidents → watch Angular banner appear

5. Run: mvn test — show JUnit results and Jacoco coverage report

6. Show GitHub Actions CI run in browser
```

---

## 8. Project Structure

```
rail-event-monitor/
├── docker-compose.yml
├── .env.example
├── .github/
│   └── workflows/
│       └── ci.yml
├── k8s/
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── configmap.yaml
│   └── secret.yaml
├── backend/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/com/siemens/railmonitor/
│       │   │   ├── RailEventMonitorApplication.java
│       │   │   ├── config/
│       │   │   │   ├── RabbitMqConfig.java
│       │   │   │   ├── SecurityConfig.java
│       │   │   │   ├── WebSocketConfig.java
│       │   │   │   └── OpenApiConfig.java
│       │   │   ├── controller/
│       │   │   │   ├── AuthController.java
│       │   │   │   ├── TrainController.java
│       │   │   │   ├── EventController.java
│       │   │   │   └── IncidentController.java
│       │   │   ├── domain/
│       │   │   │   ├── Train.java
│       │   │   │   ├── Route.java
│       │   │   │   ├── TrainEvent.java
│       │   │   │   └── Incident.java
│       │   │   ├── dto/
│       │   │   │   ├── TrainEventMessage.java
│       │   │   │   ├── LoginRequest.java
│       │   │   │   └── LoginResponse.java
│       │   │   ├── repository/
│       │   │   │   ├── TrainRepository.java
│       │   │   │   ├── RouteRepository.java
│       │   │   │   ├── TrainEventRepository.java
│       │   │   │   └── IncidentRepository.java
│       │   │   ├── service/
│       │   │   │   ├── TrainService.java
│       │   │   │   ├── EventProcessorService.java
│       │   │   │   └── IncidentService.java
│       │   │   ├── messaging/
│       │   │   │   └── TrainEventListener.java
│       │   │   └── security/
│       │   │       ├── JwtUtil.java
│       │   │       └── JwtAuthFilter.java
│       │   └── resources/
│       │       ├── application.yml
│       │       └── db/migration/
│       │           ├── V1__init.sql
│       │           └── V2__seed_data.sql
│       └── test/
│           └── java/com/siemens/railmonitor/
│               ├── service/
│               │   ├── TrainServiceTest.java
│               │   └── EventProcessorServiceTest.java
│               ├── security/
│               │   └── JwtAuthFilterTest.java
│               └── integration/
│                   └── TrainControllerIT.java
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── angular.json
│   ├── tsconfig.json
│   ├── proxy.conf.json
│   └── src/
│       ├── app/
│       │   ├── app.config.ts
│       │   ├── app.routes.ts
│       │   ├── auth/
│       │   │   ├── auth.service.ts
│       │   │   ├── auth.guard.ts
│       │   │   └── jwt.interceptor.ts
│       │   ├── components/
│       │   │   ├── login/login.component.ts
│       │   │   ├── train-grid/train-grid.component.ts
│       │   │   ├── event-log/event-log.component.ts
│       │   │   └── incident-banner/incident-banner.component.ts
│       │   ├── services/
│       │   │   ├── train.service.ts
│       │   │   └── event-websocket.service.ts
│       │   └── types/
│       │       └── index.ts
│       └── stories/
│           ├── TrainGrid.stories.ts
│           ├── EventLog.stories.ts
│           ├── IncidentBanner.stories.ts
│           └── Login.stories.ts
├── python-simulator/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── simulator.py
└── README.md
```

---

## 9. Local Setup Commands

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/rail-event-monitor.git
cd rail-event-monitor

# 2. Copy environment file
cp .env.example .env
# Edit .env with your JWT secret (anything works for local dev)

# 3. Start the full stack
docker compose up --build

# Services available after startup:
# Angular frontend    → http://localhost:4200
# Backend API         → http://localhost:8080
# Swagger UI          → http://localhost:8080/swagger-ui.html
# RabbitMQ Mgmt UI   → http://localhost:15672  (guest/guest)
# Adminer (Postgres)  → http://localhost:8888

# 4. Login credentials (seeded by Flyway)
# Email: ops@railmonitor.local
# Password: demo1234

# 5. Run backend tests only
cd backend && mvn test

# 6. Run frontend Storybook (component explorer)
cd frontend && npm install && npm run storybook
# Opens → http://localhost:6006

# 7. Stop everything
docker compose down
```

---

## 10. Testing Plan

| Test Type | Framework | What Is Tested | Why |
|---|---|---|---|
| Unit — Service layer | JUnit 5 + Mockito | `TrainService`, `EventProcessorService`, `IncidentService` | Fast, no infrastructure; validates business logic in isolation |
| Unit — Security | JUnit 5 + Mockito | `JwtAuthFilter` — valid/expired/missing token scenarios | Security logic must be tested exhaustively |
| Integration — REST API + DB | Spring Boot Test + Testcontainers (PostgreSQL) | `TrainController` endpoints against a real Postgres container | Validates Flyway migrations, JPA queries, and HTTP layer together |
| Integration — AMQP consumer | Spring Boot Test + EmbeddedRabbitMQ or Testcontainers | `TrainEventListener` end-to-end: publish → consume → persist | Validates the async event pipeline |
| Frontend unit | Jasmine + Angular TestBed | `AuthService`, `TrainGridComponent`, `JwtInterceptor` | Standard Angular testing; shows familiarity with TestBed |
| Coverage gate | Jacoco (Maven) | Fail build if service layer < 80% line coverage | Aligns with enterprise CI/CD quality gates |

---

## 11. CI/CD Plan

**Platform:** GitHub Actions  
**Pipeline file:** `.github/workflows/ci.yml`

```
Triggers:
  - push to main
  - pull_request to main

Jobs:
  1. backend-test
     - Checkout code
     - Set up JDK 17
     - Run: mvn verify (includes JUnit + Jacoco)
     - Upload: target/site/jacoco/ as artifact

  2. frontend-lint-test
     - Checkout code
     - Set up Node 20
     - Run: npm ci && npm run lint && npm test -- --watch=false

  3. docker-build (runs after both test jobs pass)
     - Build backend Docker image
     - Build frontend Docker image
     - Push to GHCR (only on main branch merge)

  4. deploy (optional, on main merge)
     - Deploy to Render.com via deploy hook
       OR
     - Update ECS task definition with new image tag
```

**Branch strategy:** Feature branches → PR → required CI status checks → squash merge to main

---

## 12. Cloud Deployment Plan

### Option A: AWS (Production-realistic, matches JD)
| Component | AWS Service | Notes |
|---|---|---|
| Backend container | ECS Fargate | No server management; scale by task count |
| Frontend (static) | S3 + CloudFront | Serve built Angular dist; CDN globally |
| Database | RDS PostgreSQL | Managed, automated backups |
| Message broker | Amazon MQ (RabbitMQ) | Managed RabbitMQ; no self-hosting |
| Secrets | Secrets Manager | JWT key, DB password — never in env vars |
| Container registry | ECR | GitHub Actions pushes here |
| Load balancer | ALB + ACM (HTTPS) | TLS termination at the load balancer |

**Estimated AWS cost for demo:** ~$50–80/month (minimize by using `db.t3.micro` and single Fargate task)

### Option B: Render.com (Zero-cost for demo)
| Component | Render Service | Notes |
|---|---|---|
| Backend | Web Service (Docker) | Free tier: 750 hrs/month |
| Frontend | Static Site | Free tier |
| Database | Managed PostgreSQL | Free tier: 1 GB |
| RabbitMQ | CloudAMQP free tier | 1M messages/month free |

**Deploy command:** `docker build + render deploy hook` triggered by GitHub Actions on main merge.

---

## 13. Developer Exploration Tools Plan

### API Explorer — Swagger UI
- **Tool:** springdoc-openapi-starter-webmvc-ui
- **URL:** `http://localhost:8080/swagger-ui.html`
- **Setup:** Add to `pom.xml`, annotate controllers with `@Operation`, configure `@SecurityScheme` for JWT
- **New hire workflow:** Login → copy JWT → Authorize in Swagger → explore all endpoints live

### Component Explorer — Storybook for Angular
- **Tool:** `@storybook/angular`
- **Port:** 6006
- **Run:** `npm run storybook` (dev only, not in docker-compose)
- **Stories:** TrainGrid, EventLog, IncidentBanner, Login — each with multiple arg states

### Database Admin UI — Adminer
- **Tool:** `adminer:4`
- **URL:** `http://localhost:8888`
- **docker-compose entry:**
```yaml
  adminer:
    image: adminer:4
    ports:
      - "8888:8080"
    depends_on:
      - db
    restart: unless-stopped
```

### Bonus — RabbitMQ Management UI
- **Tool:** Built into `rabbitmq:3-management` image
- **URL:** `http://localhost:15672`
- **Value for interview:** "Watch messages enter the queue and get consumed in real time"

---

## 14. Interview Talking Points

### Project Overview
- "I built a railroad event monitoring system as a full-stack distributed application — the same class of system Siemens deploys for transportation operations."
- "The core pattern is event-driven: a Python microservice simulates train telemetry and publishes AMQP messages to RabbitMQ, a Java Spring Boot backend consumes and processes them asynchronously, and an Angular dashboard shows the live state via WebSocket."

### Java / Spring Boot
- "I used Spring AMQP's `@RabbitListener` to handle events on a configurable listener thread pool — I can explain the threading model and how I'd tune `concurrentConsumers` for throughput."
- "All domain state changes go through the service layer, making it easy to mock with Mockito and unit test without any infrastructure."

### Angular
- "The frontend uses RxJS WebSocket observables — no polling. The event log updates the moment the backend broadcasts. I used Angular Material's CDK virtual scroll to keep performance solid with high event volume."

### Event-Driven Architecture
- "RabbitMQ as the event bus decouples the simulator from the backend. If the backend goes down, messages queue up and are processed when it comes back — that's AMQP durability in practice."

### Testing
- "I have two test layers: Mockito unit tests that run in milliseconds and a Testcontainers integration test that spins up a real Postgres container to validate migrations and queries end to end."

### Security
- "Stateless JWT auth: the login endpoint issues a signed token, a custom filter validates it on every request, no server-side session storage. Swagger UI has an Authorize dialog so anyone can test protected endpoints immediately."

### CENELEC / Safety-Critical Awareness
- "I understand that real Siemens railroad software operates under EN 50128/EN 50129. This demo doesn't implement those standards, but the event-sourcing pattern I used — storing every state change as an immutable event record — directly supports the auditability and traceability requirements those standards demand."

### Docker / DevOps
- "One `docker compose up` starts eight services. No manual setup. New team members can be productive within minutes — which is exactly the kind of developer experience good DevOps culture demands."

### Python
- "I used Python with `pika` (the official AMQP client) for the simulator, which shows I can work polyglot — reading and writing Python in a Java-primary codebase, as the JD's preferred qualifications mention."
