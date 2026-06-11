import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

// Lazy initialization — PrismaClient is only created when first accessed,
// not at import/module evaluation time. This prevents build failures
// when DATABASE_URL is not available (e.g., during Vercel static generation).

declare const globalThis: {
  prismaGlobal: PrismaClient | undefined;
} & typeof global;

function getPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Please set it in your environment variables.'
    )
  }

  // Prisma v7: use Neon serverless adapter with connection string config
  const adapter = new PrismaNeon({ connectionString: url })
  const client = globalThis.prismaGlobal ?? new PrismaClient({ adapter })

  if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = client
  }

  return client
}

// Export a proxy that lazily initializes PrismaClient on first property access
const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop: string | symbol) {
    // These are checked by Next.js/runtime — return safe values
    if (prop === 'then' || prop === 'catch' || prop === 'finally') {
      return undefined
    }
    if (typeof prop === 'symbol') {
      return undefined
    }

    const client = getPrismaClient()
    const value = (client as unknown as Record<string | symbol, unknown>)[prop]
    if (typeof value === 'function') {
      return value.bind(client)
    }
    return value
  },
})

export default prisma
