# Bookings Dashboard ✅

**A small Vue 3 + Vite dashboard with a mock Express API.**

---

## 📦 Quick Start

**Requirements**
- Node.js v18+ (v20 recommended)
- npm (or yarn/pnpm if you prefer)

**Install**
```bash
# Install front-end deps
npm install
# Install back-end deps
cd back-end && npm install
```

**Run (development)**
```bash
# From project root (runs client + server concurrently)
npm run dev
# Or run server and client separately:
# Backend
npm run server
# Frontend
npm run dev
```

---

## 🏗 Architecture Overview

**High level**
- Frontend: Vue 3 + Vite, Tailwind CSS, PrimeVue, Chart.js
- Backend: Minimal Express mock API serving in-memory data on port **3000**
- Frontend -> Backend communication via axios wrapped with a backoff helper

**Key folders**
- `src/` — Vue app
  - `components/` — UI components (e.g. `AnalyticsPanel.vue`, `PieChart.vue`, `WDatable.vue`)
  - `services/` — `apiService.ts` (API calls)
  - `composables/` — reusable logic (e.g. `useAutoRefresher.ts`)
  - `utils/` — helpers (e.g. `fetchWithBackoff.ts`, `colors.ts`)
- `back-end/` — Express mock API (`server.js`)

**API Endpoints (mock)**
- GET /suppliers → list of suppliers
- GET /bookings → list of bookings
- PUT /bookings/:id → update a booking
- GET /analytics → aggregated analytics (top suppliers, top countries, avg price per country)

> The frontend expects the API at `http://localhost:3000` by default. Change base URLs in `src/services/apiService.ts` if needed.

---

## ⚠️ Known Limitations

- Mock API only — data is stored in memory and resets when the server restarts.
- No tests included (unit/integration/e2e tests not present).
- UI is **not responsive** - layout may break on small screens or mobile devices.
- No path aliases configured — imports may use absolute
- Husky commit hooks and ESLint checks are **not configured/enforced** (pre-commit/pre-push hooks and linting checks may be missing or not running reliably).

