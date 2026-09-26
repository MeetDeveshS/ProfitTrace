# ProfitTrace

> **See where your money is made. Trace where it leaks.**

ProfitTrace is an AI-assisted business profitability and decision intelligence platform. It turns sales, cost, inventory, and operational data into clear profitability signals, helping management teams identify margin pressure, cost increases, weak products, underperforming locations, and high-value opportunities worth investigating.

Built for businesses from one location to enterprise networks, including petrol pumps, retail chains, food and beverage franchises, and multi-location operators.

---

## Core Philosophy

```
DATA → ANALYSIS → TRACE THE PROBLEM → INSIGHT → ACTION
```

ProfitTrace is not just a chart display. It is an operational decision support system that pinpoints why results occur and models projected financial outcomes before changes are committed.

---

## Key Features

1. **The Profit Trace Waterfall Engine**
   - Dissects top-line revenue through unit delivered volume, average realized prices, direct wholesale procurement, promotional discount surcharges, forecourt operating costs, and net retained contribution.
   - Decomposes exact variance drivers (e.g. wholesale supplier cost creep, peak shift labor overtime, or fleet card discount concessions).

2. **Multi-Location Benchmarking**
   - Side-by-side location comparison for revenue, margin rate, volume throughput, and direct operational overhead.
   - Detailed station view with shift performance breakdowns, tank capacity levels, and settlement channel reconciliations.

3. **Dynamic What-If Financial Simulator**
   - Real-time sensitivity modeling of selling price adjustments, discount rates, wholesale cost inflation, and volume elasticity.
   - Outputs clearly designated scenario estimates.

4. **Ask ProfitTrace Intelligence Panel**
   - Natural language query analyzer grounded in actual workspace transaction data.
   - Inspects queries such as "Why did profit fall this month?", "Which location has the highest margin?", or "Which products are tying up inventory?".

5. **Data Ingestion & CSV Import**
   - 4-step ingestion pipeline: Upload → Validate & Preview → Map Schema Columns → Execute & Reconcile.
   - Built-in validation checking for missing headers, duplicate records, and invalid number formatting with a downloadable sample template.

6. **Audit-Ready Reports**
   - Printable and CSV-exportable profitability statements, location benchmarking audits, product margin schedules, and inventory exposure tables.

---

## Tech Stack & Architecture

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide React
- **Design System:** Restrained White + Pista Green palette (`#A8CFA3` / `#587C55` / `#F7FAF5` / `#1F2421`)
- **Backend Server:** Node.js, Express, tsx
- **Database & ORM:** PostgreSQL schema representation with Prisma ORM (`src/db/schema.prisma`)
- **Multi-Tenant Model:** Organization → Businesses → Locations → Products → Ledgers

---

## Development & Build Instructions

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Local Development
Start the development server on port 3000:
```bash
npm run dev
```

### 4. Compiling & Production Build
Validate TypeScript types and build client bundle:
```bash
npm run build
```

### 5. Database Setup & Migrations (When connecting PostgreSQL)
Generate Prisma client and apply migrations:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

---

## License
Apache-2.0
