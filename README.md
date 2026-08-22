# AhaduPlay Casino 🎰 - Telegram Gaming Platform

AhaduPlay is a premium, high-performance, mobile-first casino application front-end. It serves as the User-facing frontend of the Telegram Gaming Platform. It features an ultra-modern, glassmorphic "video game" UI design, complete with animated curved navigation, high-fidelity leaderboards, and a luxurious gold-and-charcoal visual system.

The application is fully optimized as a Progressive Web App (PWA) and includes native hooks for deep integration as a Telegram Mini App via the Telegram Web App SDK.

This frontend repository connects to a separate Laravel REST API backend (maintained in a separate repository).

---

## 📁 Repository Architecture (Monorepo)

This repository is structured as a monorepo intended to house multiple frontend applications.

### Current vs Future Architecture

**CURRENT STATE**

- The **User App** (AhaduPlay) is fully implemented and operational.
- The **Admin App** is NOT implemented (exists only as a placeholder).
- The **Backend** is separate.

**FUTURE ARCHITECTURE**

```text
frontend/
├── apps/
│   ├── user-app/       # AhaduPlay (Implemented)
│   └── admin-app/      # Admin Dashboard (Planned/Future)
│
└── packages/           # Planned shared packages (UI, types, api-client)
```

The frontend contains two future application boundaries:

1. **User App** (`apps/user-app/`)
2. **Admin App** (`apps/admin-app/`)

**Important:** The User App does not and must not contain `/admin` routes. The future Admin App will be an independent React + Vite + TypeScript application. Production will eventually use separate domains:

- `gaming.example.com` → User App
- `admin.gaming.example.com` → Admin App
- `api.gaming.example.com` → Laravel Backend

---

## 🏗️ User App Architecture

The existing User Frontend (`apps/user-app/`) follows **Feature-Sliced Design** (FSD) principles to promote high cohesion and low coupling.

```text
apps/user-app/src/
├── app/               # Application initialization, global layout, routing, providers
│   ├── layout/
│   └── router.tsx
├── features/          # Business-facing user features
│   ├── auth/
│   ├── games/
│   ├── promotions/
│   ├── wallet/
│   └── withdrawal/
├── shared/            # Reusable UI components, utilities, API helpers, Telegram integration
│   ├── components/
│   ├── lib/
│   └── types/
└── main.tsx           # Entry point
```

**APP**: Application initialization, routing, global layout, providers and application-level configuration.
**FEATURES**: Business-facing user features (auth, games, promotions, wallet, withdrawal).
**SHARED**: Reusable UI components, utilities, API helpers, Telegram integration and common types.

---

## 🛠️ Technology Stack

**Current User App:**

- **Core**: React 18, TypeScript, Vite
- **Routing**: React Router DOM (v6)
- **Data Fetching / Cache**: TanStack React Query
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Utilities**: `date-fns`, `clsx`, `tailwind-merge`
- **Integration**: Telegram Web App SDK
- **PWA**: Existing PWA capabilities where implemented

---

## 📦 Package Management

**Planned workspace package manager:** pnpm

The target architecture is intended to support a pnpm workspace/monorepo.
_(Note: Until the full migration is complete, the repository may still utilize npm workspaces via `package.json` for managing the `apps/_` packages).\*

---

## 💻 Local Development

The User App is independently runnable.

```bash
# Install dependencies
pnpm install

# Start the User App development server
pnpm dev:user

# Build the User App for production
pnpm build:user
```

---

## 🔗 Backend & API Architecture

The backend is maintained separately from this frontend repository.

- **Frontend**: React + Vite + TypeScript
- **Backend**: Laravel REST API
- **Database**: MySQL or PostgreSQL (pending final backend decision)
- **Cache/Queues**: Redis (Planned)

**Security Rule:** The frontend must never contain database credentials, payment provider secrets, game provider secrets, Laravel secrets, or private API keys.

### API Layer

The frontend uses a decoupled API layer.

- Currently, the application may use mocked/hardcoded Promises in some places.
- **TanStack Query** is used as the data-fetching/cache layer.

**Target Architecture:**
`React Component` → `Feature Hook` → `TanStack Query` → `API Client` → `Laravel REST API`

_Examples of planned API endpoints:_

- `GET /api/v1/games`
- `GET /api/v1/wallet`
- `GET /api/v1/transactions`
- `POST /api/v1/deposits`
- `POST /api/v1/withdrawals`

---

## 📱 Telegram Mini App & PWA

The User App is designed to run both as a normal web application and inside Telegram as a **Telegram Mini App**.

**Telegram Integration:**

- Isolated within the frontend architecture (`telegram.ts`).
- Includes Telegram Web App SDK access, viewport handling (`WebApp.expand()`), safe-area handling, and mobile viewport behavior.
- **Security:** The frontend must not trust Telegram identity information by itself. Telegram authentication data must eventually be sent to the Laravel backend for verification.

**Progressive Web App (PWA):**
The User App can operate as a PWA where supported. This is complementary to the Telegram Mini App integration, not mutually exclusive.

---

## 🚀 Deployment & Vercel Configuration

The existing User App is expected to be deployed using **Vercel**.
The repository structure preserves Vercel compatibility.

**Intended Vercel Configuration:**

- **Root Directory:** `apps/user-app`
- **Build Command:** `npm run build` (or `pnpm build` depending on package manager)
- **Output Directory:** `dist/`

The build output (`apps/user-app/dist/`) is a purely static SPA.

### Vercel SPA Routing

Because the application uses React Router, Vercel must correctly serve the SPA entry point for client-side routes (e.g., `/games`, `/wallet`, `/profile`). Existing Vercel rewrite configurations must be preserved to prevent 404 errors on direct navigation.

### Deployment Architecture

```text
                    Telegram User
                         │
                         ▼
                  Telegram Bot
                         │
                         ▼
                 Telegram Mini App
                         │
                         ▼
                  User React App
                         │
                         ▼
                     Vercel
                         │
                         ▼
                  Laravel REST API
                         │
               ┌─────────┴─────────┐
               ▼                   ▼
            Database             Redis
```

---

## 🎨 Design System & Principles

**Design Assets:**

- Glassmorphism, gold/charcoal visual system, mobile-first design, animated navigation, responsive layouts, backdrop blur, custom shadows, dynamic viewport units (`100dvh`), and safe-area support.

**Development Principles:**

1. Preserve feature boundaries and keep business features isolated.
2. Keep API access decoupled and Telegram-specific logic isolated.
3. Keep User and future Admin applications strictly separate.
4. Share code only when it is genuinely reusable.
5. Do not put backend business logic in React.
6. Do not expose secrets in Vite environment variables.
7. Keep the User App independently deployable.
8. Avoid unnecessary over-engineering.
