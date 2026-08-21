# AhaduPlay Casino 🎰

AhaduPlay is a premium, high-performance, mobile-first casino application front-end. It features an ultra-modern, glassmorphic "video game" UI design, complete with animated curved navigation, high-fidelity leaderboards, and a luxurious gold-and-charcoal visual system.

The application is fully optimized as a Progressive Web App (PWA) and includes native hooks for deep integration as a Telegram Mini App via the Telegram Web App SDK.

## 🛠️ Technology Stack

- **Core**: React 18, TypeScript, Vite
- **Routing**: React Router DOM (v6)
- **State Management / Data Fetching**: TanStack React Query
- **Styling**: Tailwind CSS (Custom theme config with custom typography & colors)
- **Icons**: Lucide React
- **Utils**: `date-fns` (time formatting), `clsx` & `tailwind-merge` (class management)

## 📁 Architectural Codebase Structure

The codebase strictly adheres to a **Feature-Sliced Design** (FSD) architecture, promoting high cohesion, low coupling, and massive scalability.

```text
src/
├── app/               # Core application initialization
│   ├── layout/        # Global layout shells, bottom navigation, splash screen
│   └── router.tsx     # Route definitions and lazy-loading
├── features/          # Encapsulated feature modules (The core of the app)
│   ├── auth/          # ProfilePage, VIP management, Settings
│   ├── games/         # Games catalog, filtering, mock data integration
│   ├── promotions/    # Animated Podium Leaderboard, Rewards
│   ├── wallet/        # Wallet balances, History timeline, Deposits
│   └── withdrawal/    # Withdrawal flows and modals
├── shared/            # Reusable UI primitives and utilities
│   ├── components/    # Buttons, Cards, Inputs, EmptyStates, BalanceFigures
│   ├── lib/           # Global helpers (`api-client.ts`, `telegram.ts`)
│   └── types/         # Global TypeScript definitions
└── main.tsx           # Entry point
```

## 🧠 Key Architectural Decisions

1. **Telegram Web App Ready (`telegram.ts`)**
   - Implements global `Window` interface extensions to detect and execute `window.Telegram.WebApp.expand()`. 
   - Uses `env(safe-area-inset-bottom)` to ensure UI elements do not clip with iOS/Android native swipe gestures.

2. **Decoupled API Layer**
   - The application is currently running in a robust standalone mode utilizing hardcoded `Promises` in feature pages. 
   - `TanStack Query` acts as the primary data manager, allowing seamless transition from mocked data to live REST APIs without changing component logic.

3. **Dynamic Viewport Height**
   - Replaced generic `100vh` with `100dvh` (Dynamic Viewport Height) to prevent mobile browser address bars from breaking the bottom navigation layout.

4. **Component Design System**
   - Built on a highly-animated Tailwind config (`tailwind.config.ts`).
   - Extensive use of `backdrop-blur` and custom shadow offsets to create a premium "glass" depth-of-field.

## 🚀 Quick Start

Ensure you are running Node.js (v18+ recommended).

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🚢 Deployment

The output of `npm run build` is a purely static SPA (Single Page Application) found in the `dist` folder. 
It can be dropped into any static hosting service (Vercel, cPanel, Nginx) or served via a Telegram Bot.
