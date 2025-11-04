require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const prisma = require('./prismaClient')
const mysql = require('mysql2/promise')

const app = express();
app.use(cors());
// Increase body size limits to allow base64 profile pictures from the client.
// Keep this reasonable (5-6MB) — for production, prefer multipart file uploads instead of embedding large base64 in JSON.
app.use(express.json({ limit: '6mb' }));
app.use(express.urlencoded({ limit: '6mb', extended: true }));
app.use(morgan('dev'));

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// debug route (safe: does not expose password) to inspect which DB the server thinks it's using
app.get('/api/debug/db', (req, res) => {
  try {
    const dbUrl = process.env.DATABASE_URL || ''
    if (!dbUrl) return res.json({ ok: false, message: 'no DATABASE_URL configured' })
    // parse minimal info
    const url = new URL(dbUrl)
    const user = url.username
    const host = url.hostname
    const port = url.port
    const database = url.pathname ? url.pathname.replace(/^\//, '') : ''
    return res.json({ ok: true, user, host, port, database })
  } catch (err) {
    return res.json({ ok: false, error: String(err) })
  }
})

// Example route that queries a `users` table (adjust to your schema)
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({ select: { id: true, email: true }, take: 10 })
    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Ensure Prisma can connect to the database (simple connectivity check)
async function ensurePrismaConnection() {
  try {
    // simple raw query to verify connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('Prisma connection OK');
  } catch (err) {
    console.error('Prisma connection failed', err);
  }
}


const auth = require('./auth')
const shop = require('./shop')
const product = require('./product')
// Product endpoints
app.post('/api/products', async (req, res) => {
  const { shopId, productName, price, discount, cgst, sgst } = req.body;
  if (!shopId || !productName || !price) return res.status(400).json({ error: 'shopId, productName, price required' });
  try {
    const p = await product.addProduct(shopId, { productName, price, discount, cgst, sgst });
    res.json(p);
  } catch (err) {
    console.error('Add product error:', err);
    res.status(500).json({ error: 'server_error' });
  }
});

app.get('/api/products', async (req, res) => {
  const { shopId } = req.query;
  if (!shopId) return res.status(400).json({ error: 'shopId required' });
  try {
    const products = await product.getProducts(shopId);
    res.json(products);
  } catch (err) {
    console.error('Get products error:', err);
    res.status(500).json({ error: 'server_error' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  const productId = req.params.id;
  const { productName, price, discount, cgst, sgst } = req.body;
  try {
    const updated = await product.updateProduct(productId, { productName, price, discount, cgst, sgst });
    res.json(updated);
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ error: 'server_error' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    await product.deleteProduct(productId);
    res.json({ success: true });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ error: 'server_error' });
  }
});

// Auth endpoints (using auth module)
app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body;
  console.log('POST /api/auth/signup', { email })
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const u = await auth.createUser(email, password, 'shop_owner')
    res.json(u)
  } catch (err) {
    // user already exists -> client error
    if (err && (err.message === 'user_exists' || err.code === 'P2002')) {
      return res.status(400).json({ error: 'user_exists' })
    }
    // Prisma: table/model not found (DB not migrated)
    if (err && err.code === 'P2021') {
      console.error('Prisma model/table missing:', err)
      return res.status(500).json({ error: 'database_not_migrated', message: 'Run `npx prisma db push` or `npx prisma migrate dev` to create tables.' })
    }
    console.error(err)
    res.status(500).json({ error: 'server_error' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'email and password required' })
  try {
    const u = await auth.verifyUser(email, password)
    if (!u) return res.status(400).json({ error: 'invalid_credentials' })
    res.json(u)
  } catch (err) {
    if (err && err.code === 'P2021') {
      console.error('Prisma model/table missing during login:', err)
      return res.status(500).json({ error: 'database_not_migrated', message: 'Run `npx prisma db push` or `npx prisma migrate dev` to create tables.' })
    }
    console.error(err)
    res.status(500).json({ error: 'server_error' })
  }
})

// Shop profile endpoints (using shop module)
app.get('/api/shop/profile', async (req, res) => {
  const userId = req.query.userId
  if (!userId) return res.status(400).json({ error: 'userId required' })
  try {
    const s = await shop.getShopByUserId(userId)
    res.json(s || null)
  } catch (err) {
    if (err && err.code === 'P2021') {
      console.error('Prisma model/table missing during get shop profile:', err)
      return res.status(500).json({ error: 'database_not_migrated', message: 'Run `npx prisma db push` or `npx prisma migrate dev` to create tables.' })
    }
    console.error(err)
    res.status(500).json({ error: 'server_error' })
  }
})

app.post('/api/shop/profile', async (req, res) => {
  const { userId, shopName, mobile, address, ownerName, profilePic } = req.body
  if (!userId) return res.status(400).json({ error: 'userId required' })
  try {
    await shop.upsertShop(userId, { shopName, mobile, address, ownerName, profilePic })
    res.json({ success: true })
  } catch (err) {
    if (err && err.code === 'P2021') {
      console.error('Prisma model/table missing during upsert shop profile:', err)
      return res.status(500).json({ error: 'database_not_migrated', message: 'Run `npx prisma db push` or `npx prisma migrate dev` to create tables.' })
    }
    console.error(err)
    res.status(500).json({ error: 'server_error' })
  }
})

// Ensure Prisma connectivity only
ensurePrismaConnection();

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on ${port}`));

// global error handler to prevent crashes and return JSON errors
app.use((err, req, res, next) => {
  console.error('Unhandled error in request:', err)
  if (res.headersSent) return next(err)
  // Handle large payloads explicitly
  if (err && (err.type === 'entity.too.large' || err.status === 413)) {
    return res.status(413).json({ error: 'payload_too_large', message: 'Request body too large. Reduce image size or use file upload endpoints.' })
  }
  res.status(500).json({ error: 'server_error' })
});

// catch unhandled rejections so the process doesn't crash unexpectedly during dev
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  // don't exit in dev; in production consider exiting and restarting the process
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err)
  // In production you'd likely restart the process. For development keep running.
});
