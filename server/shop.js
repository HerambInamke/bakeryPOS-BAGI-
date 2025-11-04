const prisma = require('./prismaClient')

async function getShopByUserId(userId) {
  const shop = await prisma.shop.findFirst({ where: { userId: Number(userId) } })
  return shop
}

async function upsertShop(userId, { shopName, mobile, address, ownerName, profilePic }) {
  // use upsert by unique userId
  const data = {
    userId: Number(userId),
    shopName,
    mobile,
    address,
    ownerName,
    profilePic,
  }
  await prisma.shop.upsert({
    where: { userId: Number(userId) },
    update: data,
    create: data,
  })
  return { ok: true }
}

module.exports = { getShopByUserId, upsertShop }
