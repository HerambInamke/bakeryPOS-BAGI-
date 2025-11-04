# BakeryPOS

Monorepo scaffold for a Point of Sale, Billing & Inventory system.

This repository contains two main parts:

- `client/` — React + Vite + Tailwind frontend
- `server/` — Node.js + Express backend with MySQL connection

Quick local setup (PowerShell)

```powershell
# Client (frontend)
cd client; npm install; npm run dev

# Server (backend)
cd server; npm install; cp .env.example .env; # edit .env with your DB credentials
npm run dev
```

Open the frontend (Vite) URL shown by `npm run dev` (default http://localhost:5173) and the server runs on the port in `server/.env` (default 4000).

See `client/README.md` and `server/README.md` for more details.
