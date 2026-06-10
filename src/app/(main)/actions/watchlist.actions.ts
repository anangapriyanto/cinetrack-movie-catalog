'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addToWatchlist(data: { movieId: number, title: string, posterPath: string | null }) {
  try {
    const existing = await prisma.watchlist.findUnique({
      where: { movieId: data.movieId }
    });

    if (existing) {
      return { success: false, message: 'Movie is already in your watchlist' };
    }

    await prisma.watchlist.create({
      data: {
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

export async function getWatchlist() {
  try {
    const items = await prisma.watchlist.findMany({
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
    await prisma.watchlist.update({
      where: { id },
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
    await prisma.watchlist.delete({
      where: { id }
    });
    
    revalidatePath('/watchlist');
    return { success: true };
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return { success: false };
  }
}
