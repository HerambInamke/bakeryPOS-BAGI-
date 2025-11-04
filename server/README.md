# BakeryPOS — Server

This is an Express + MySQL backend scaffold for BakeryPOS.

PowerShell quickstart:

```powershell
cd server; npm install; cp .env.example .env; # edit .env to set DB credentials
npm run dev
```

- Dev: `npm run dev` (uses `nodemon`)
- Start: `npm start`

Notes:
- The DB connection uses `mysql2/promise` and environment variables from `.env`.
- Create your database and tables (example):

```sql
CREATE DATABASE bakerypos;
USE bakerypos;
CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255));
```

- The example route `GET /api/users` expects a `users` table. Adjust queries to your schema.
