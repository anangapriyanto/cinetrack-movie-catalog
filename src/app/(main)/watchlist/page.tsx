import WatchlistContent from '@/presentation/components/WatchlistContent';
import { getWatchlist } from '@/app/(main)/actions/watchlist.actions';

// Force dynamic rendering — cannot query DB during build on Vercel
export const dynamic = 'force-dynamic';

export default async function WatchlistPage() {
  const items = await getWatchlist();
  return <WatchlistContent items={items} />;
}
