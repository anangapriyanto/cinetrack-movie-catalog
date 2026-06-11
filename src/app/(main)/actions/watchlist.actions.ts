'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

async function getUserId() {
  const cookieStore = await cookies();
  return cookieStore.get('auth-token')?.value;
}

export async function addToWatchlist(data: { movieId: number, title: string, posterPath: string | null }) {
  try {
    const userId = await getUserId();
    if (!userId) return { success: false, message: 'Unauthorized' };

    const existing = await prisma.watchlist.findUnique({
      where: { userId_movieId: { userId, movieId: data.movieId } }
    });

    if (existing) {
      return { success: false, message: 'Movie is already in your watchlist' };
    }

    await prisma.watchlist.create({
      data: {
        userId,
        movieId: data.movieId,
        title: data.title,
        posterPath: data.posterPath,
        status: 'Plan to Watch'
      }
    });

    revalidatePath('/watchlist');
    return { success: true, message: 'Added to watchlist successfully' };
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return { success: false, message: 'Failed to add to watchlist' };
  }
}

export async function checkWatchlistStatus(movieId: number) {
  try {
    const userId = await getUserId();
    if (!userId) return false;

    const existing = await prisma.watchlist.findUnique({
      where: { userId_movieId: { userId, movieId } }
    });
    return !!existing;
  } catch (error) {
    console.error('Error checking watchlist status:', error);
    return false;
  }
}

export async function getWatchlist() {
  try {
    const userId = await getUserId();
    if (!userId) return [];

    const items = await prisma.watchlist.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    return items;
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return [];
  }
}

export async function updateWatchlistStatus(id: string, status: string) {
  try {
    const userId = await getUserId();
    if (!userId) return { success: false };

    // Update only if the item belongs to the user
    await prisma.watchlist.updateMany({
      where: { id, userId },
      data: { status }
    });
    
    revalidatePath('/watchlist');
    return { success: true };
  } catch (error) {
    console.error('Error updating status:', error);
    return { success: false };
  }
}

export async function removeFromWatchlist(id: string) {
  try {
    const userId = await getUserId();
    if (!userId) return { success: false };

    // Delete only if the item belongs to the user
    await prisma.watchlist.deleteMany({
      where: { id, userId }
    });
    
    revalidatePath('/watchlist');
    return { success: true };
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return { success: false };
  }
}
