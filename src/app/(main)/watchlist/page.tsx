import prisma from '@/lib/prisma';
import WatchlistContent from '@/presentation/components/WatchlistContent';

// Force dynamic rendering — cannot query DB during build on Vercel
export const dynamic = 'force-dynamic';

export default async function WatchlistPage() {
  let items: Awaited<ReturnType<typeof prisma.watchlist.findMany>> = [];

  try {
    items = await prisma.watchlist.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Failed to fetch watchlist:', error);
  }

  return <WatchlistContent items={items} />;
}
