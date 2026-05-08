# PayFronte Countries Explorer

A production-grade Next.js app that integrates with the PayFronte public API to display and explore countries, currencies, and locale settings.

---

## Features

- **Countries listing** — fetches from `GET /payfusion/public/v1/countries` via React Query
- **Debounced search** — client-side filtering by name, code, or currency (350ms debounce)
- **Country detail modal** — click any card to see full details + a live currency sample formatted with `Intl.NumberFormat`
- **Dynamic locale switching** — change locale (en-US, fr-FR, ar-SA, etc.) and see all currency previews update instantly
- **Pagination** — 12 cards per page with ellipsis-aware page controls
- **Loading / error / empty states** — skeleton cards, error with retry, and no-results message
- **i18n ready** — English, French, German, Chinese, Spanish and Arabic message files under `/messages`
- **Unit tests** — Jest + React Testing Library covering utils, hooks, and components

---

## Tech Stack

| Layer         | Choice                  | Reason                                            |
| ------------- | ----------------------- | ------------------------------------------------- |
| Framework     | Next.js 15 (App Router) | File-based routing, RSC support                   |
| Language      | TypeScript              | Type safety throughout                            |
| Styling       | Tailwind CSS v4         | Utility-first, no runtime overhead                |
| Data fetching | TanStack React Query v5 | Caching, stale-time, retry                        |
| State         | Zustand                 | Minimal global store for search/pagination/locale |
| HTTP          | Axios                   | Interceptors, timeout, consistent error shape     |
| Fonts         | Syne + JetBrains Mono   | Distinctive display + code pairing                |
| Testing       | Jest + Testing Library  | Unit tests for utils, hooks, components           |

---

## Setup

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
git clone https://github.com/dreal-martins/PayFronte-Countries-Explorer.git
cd PayFronte-countries-explorer
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Run Tests

```bash
npm test              # run all tests
npm run test:watch    # watch mode
npm run test:coverage # with coverage report
```

### Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts + providers
│   ├── page.tsx            # Home page (hero + search + grid)
│   └── globals.css         # Tailwind + custom animations
├── components/
│   ├── Providers.tsx       # React Query client provider
│   ├── countries/
│   │   ├── CountryCard.tsx # Individual country card
│   │   ├── CountryGrid.tsx # Grid with all states
│   │   └── CountryModal.tsx# Detail modal
│   └── ui/
│       ├── SearchBar.tsx   # Debounced search input
│       ├── Skeleton.tsx    # Loading skeletons
│       ├── Pagination.tsx  # Page controls
│       └── LocaleSwitcher.tsx
├── hooks/
│   ├── useCountries.ts     # React Query + filtering + pagination
│   └── useDebounce.ts      # Generic debounce hook
│   └── useTranslate.ts     # Language translator hook
├── lib/
│   ├── api.ts              # Axios instance + fetchCountries()
│   └── utils.ts            # cn(), debounce()
├── store/
│   └── appStore.ts         # Zustand store (search, page, locale)
├── types/
│   └── country.ts          # Country, CountriesResponse types
├── messages/
│   ├── en.json             # English strings
│   ├── fr.json             # French strings
│   └── ar.json             # Arabic strings
│   └── de.json             # German strings
│   └── zh.json             # Chinese strings
│   └── es.json             # Spanish strings
└── __tests__/
    ├── utils.test.ts
    ├── useDebounce.test.ts
    ├── SearchBar.test.tsx
    └── CountryCard.test.tsx
```

---

## Design Decisions

### React Query over useEffect + useState

React Query provides automatic caching (5-minute stale time), background refetching, retry logic, and a clean loading/error state API — all without custom boilerplate.

### Client-side filtering

The country list is small enough that filtering client-side (after a single fetch) is faster and cheaper than round-tripping to the API on every keystroke. The data is cached in React Query so subsequent page visits are instant.

### Zustand for global state

Search query, page number, and active locale need to be shared across multiple components (SearchBar, CountryGrid, LocaleSwitcher). Zustand adds ~1 KB and avoids prop drilling with zero boilerplate.

### Debounce at the hook level

`useDebounce` is a pure hook that can be unit-tested independently. The `SearchBar` uses it to prevent the Zustand store (and therefore the filter function) from running on every keystroke.

### `Intl.NumberFormat` for currency preview

Using the browser-native `Intl` API means currency formatting is automatically correct for every locale — no third-party i18n library needed for the core feature.

---

## API

All data comes from the PayFronte public API (no authentication required):

```
GET https://api.payfonte.com/payfusion/public/v1/countries
```

Expected response fields per country: `name`, `code`, `currency`, `locale`
