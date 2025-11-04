const prisma = require('./prismaClient')
const bcrypt = require('bcrypt')

async function findUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    return user
  } catch (err) {
    console.error('findUserByEmail error', { email, err })
    throw err
  }
}

async function getUserById(id) {
  const user = await prisma.user.findUnique({ where: { id: Number(id) } })
  if (!user) return null
  return { id: user.id, email: user.email, role: user.role }
}

async function createUser(email, password, role = 'shop_owner') {
  try {
    const existing = await findUserByEmail(email)
    if (existing) throw new Error('user_exists')
    const hash = await bcrypt.hash(password, 10)
    console.log('Creating user', { email })
    const user = await prisma.user.create({ data: { email, password_hash: hash, role } })
    console.log('User created', { id: user.id, email: user.email })
    return { id: user.id, email: user.email, role: user.role }
  } catch (err) {
    console.error('createUser error', { email, err })
    throw err
  }
}

async function verifyUser(email, password) {
  if (!email || !password) return null
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return null
    const ok = await bcrypt.compare(password, user.password_hash)
    if (!ok) return null
    return { id: user.id, email: user.email, role: user.role }
  } catch (err) {
    // Log unexpected errors (DB connectivity, unexpected Prisma errors)
    console.error('verifyUser error', err)
    // Rethrow so caller can decide how to respond (500 server error)
    throw err
  }
}

module.exports = { findUserByEmail, getUserById, createUser, verifyUser }
