import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

// Use Accelerate for production, regular client for development
const createPrismaClient = () => {
  if (process.env.NODE_ENV === 'production' && process.env.PROD_DATABASE_URL) {
    // Production with Prisma Accelerate
    return new PrismaClient({
      datasources: {
        db: {
          url: process.env.PROD_DATABASE_URL,
        },
      },
    }).$extends(withAccelerate())
  } else {
    // Development with SQLite
    return new PrismaClient()
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma