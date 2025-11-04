const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// In development, log queries to help debugging
if (process.env.NODE_ENV !== 'production') {
	try {
		prisma.$on('query', (e) => {
			// e.query may include parameter markers; log for debugging
			console.log('[prisma] query:', e.query)
		})
	} catch (e) {
		// ignore if $on not available
	}
}

module.exports = prisma
