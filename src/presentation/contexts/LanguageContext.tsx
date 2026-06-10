'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'id';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    menu_utama: 'Main Menu',
    discovery: 'Discovery',
    my_watchlist: 'My Watchlist',
    sign_out: 'Sign Out',
    settings: 'Settings',
    pro_edition: 'Pro Edition',
    hero_badge: '✨ Explore the Cinema',
    hero_title_1: 'Find Your Favorite',
    hero_title_2: 'Movies',
    hero_title_3: 'Here.',
    hero_desc: 'Explore thousands of the latest movie catalogs with super fast performance powered by Next.js Server Components.',
    trending_now: 'Trending Now',
    see_all: 'See All →',
    watchlist_title: 'My Watchlist',
    watchlist_desc: 'Your personal synchronized watchlist connected with Supabase.',
    watchlist_empty_title: 'Your Watchlist is Empty',
    watchlist_empty_desc: 'No movies added yet. Explore the home page and secure your exciting movies now!',
    theme: 'Theme',
    language: 'Language',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    indonesian: 'Indonesian',
    english: 'English',
    close: 'Close',
    all_rights: 'All rights reserved.',
    powered_by: 'Powered by Next.js & TMDB API',
    free_plan: 'Free Plan',
    search_placeholder: 'Search for movies (e.g. Batman)...',
    search_button: 'Search',
    overview: 'Overview',
    genres: 'Genres',
    tagline: 'Tagline',
    status: 'Status',
    runtime: 'Runtime',
    release_date: 'Release Date',
    minutes: 'minutes',
    play_trailer: '▶ Play Trailer',
    adding: 'Adding...',
    add_to_watchlist: '+ Add to Watchlist',
    movie_exists: 'Movie is already in your watchlist',
    add_success: 'Added to watchlist successfully',
    error_occurred: 'Something went wrong',
    watchlist_manage: 'Manage your favorite movies watchlist here.',
    find_movie: 'Find Movies',
    no_poster: 'No Poster',
    added_on: 'Added on',
    plan_to_watch: '📅 Plan to Watch',
    watching: '👀 Watching',
    completed: '✅ Completed',
    remove: 'Remove',
    remove_confirm: 'Are you sure you want to remove this movie?',
  },
  id: {
    menu_utama: 'Menu Utama',
    discovery: 'Beranda',
    my_watchlist: 'Tontonan Saya',
    sign_out: 'Keluar',
    settings: 'Pengaturan',
    pro_edition: 'Edisi Pro',
    hero_badge: '✨ Jelajahi Sinema',
    hero_title_1: 'Temukan Film',
    hero_title_2: 'Favoritmu',
    hero_title_3: 'Di Sini.',
    hero_desc: 'Eksplorasi ribuan katalog film terkini dengan performa super cepat bertenaga Next.js Server Components.',
    trending_now: 'Sedang Tren Sekarang',
    see_all: 'Lihat Semua →',
    watchlist_title: 'Watchlist Saya',
    watchlist_desc: 'Daftar tontonan pribadi Anda yang tersinkronisasi dengan database Supabase.',
    watchlist_empty_title: 'Watchlist Kamu Masih Kosong',
    watchlist_empty_desc: 'Belum ada film yang ditambahkan. Jelajahi halaman utama dan amankan tontonan serumu sekarang!',
    theme: 'Tema',
    language: 'Bahasa',
    light: 'Terang',
    dark: 'Gelap',
    system: 'Sistem',
    indonesian: 'Indonesia',
    english: 'Inggris',
    close: 'Tutup',
    all_rights: 'Hak cipta dilindungi.',
    powered_by: 'Diberdayakan oleh Next.js & TMDB API',
    free_plan: 'Paket Gratis',
    search_placeholder: 'Cari film (contoh: Batman)...',
    search_button: 'Cari',
    overview: 'Sinopsis',
    genres: 'Genre',
    tagline: 'Semboyan',
    status: 'Status',
    runtime: 'Durasi',
    release_date: 'Tanggal Rilis',
    minutes: 'menit',
    play_trailer: '▶ Putar Trailer',
    adding: 'Menambahkan...',
    add_to_watchlist: '+ Tambah ke Watchlist',
    movie_exists: 'Film sudah ada di watchlist Anda',
    add_success: 'Berhasil ditambahkan ke watchlist',
    error_occurred: 'Terjadi kesalahan',
    watchlist_manage: 'Kelola daftar tontonan film favorit Anda di sini.',
    find_movie: 'Cari Film',
    no_poster: 'Tidak Ada Poster',
    added_on: 'Ditambahkan pada',
    plan_to_watch: '📅 Ingin Menonton',
    watching: '👀 Sedang Menonton',
    completed: '✅ Selesai Menonton',
    remove: 'Hapus',
    remove_confirm: 'Apakah Anda yakin ingin menghapus film ini?',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
