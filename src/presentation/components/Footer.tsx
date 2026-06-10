'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/presentation/contexts/LanguageContext';

export default function Footer() {
  const [text, setText] = useState('');
  const { t } = useLanguage();
  
  const fullText = `© ${new Date().getFullYear()} CineTrack. ${t('all_rights')} • ${t('powered_by')}`;

  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const typeWriter = () => {
      if (!isDeleting && i <= fullText.length) {
        // Fase Mengetik
        setText(fullText.substring(0, i));
        i++;
        timer = setTimeout(typeWriter, 50); // Kecepatan mengetik
      } else if (isDeleting && i >= 0) {
        // Fase Menghapus
        setText(fullText.substring(0, i));
        i--;
        timer = setTimeout(typeWriter, 30); // Kecepatan menghapus
      } else {
        // Ganti arah (selesai ngetik -> pause lama -> hapus, selesai hapus -> pause sebentar -> ngetik)
        isDeleting = !isDeleting;
        
        if (isDeleting) {
          i = fullText.length - 1; // Mulai hapus dari karakter terakhir
        } else {
          i = 1; // Mulai ngetik lagi
        }
        
        timer = setTimeout(typeWriter, isDeleting ? 4000 : 500);
      }
    };

    // Mulai animasi
    timer = setTimeout(typeWriter, 500);

    return () => clearTimeout(timer);
  }, [fullText]); // Tambahkan fullText ke dependency agar animasi ter-reset jika bahasa berubah

  return (
    <footer className="w-full mt-auto border-t border-[var(--card-border)] bg-[var(--card-bg)] pt-6 pb-8 px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[2rem]">
        {/* EFEK ANIMASI KETIKAN (TYPEWRITER) */}
        <div className="flex items-center text-xs sm:text-sm font-mono tracking-wide text-slate-500 dark:text-slate-400">
          <span className="bg-gradient-to-r from-slate-600 to-slate-400 dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
            {text}
          </span>
          {/* Kursor berkedip ala terminal */}
          <span className="w-1.5 h-4 sm:h-5 ml-1 bg-violet-500 animate-[pulse_1s_infinite]"></span>
        </div>
      </div>
    </footer>
  );
}