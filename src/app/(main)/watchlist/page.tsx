import prisma from '@/lib/prisma';
import WatchlistContent from '@/presentation/components/WatchlistContent';

export default async function WatchlistPage() {
  const items = await prisma.watchlist.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <WatchlistContent items={items} />;
}
