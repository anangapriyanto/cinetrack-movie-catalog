'use client';

import React from 'react';
import { useTheme } from '@/presentation/contexts/ThemeContext';
import { useLanguage } from '@/presentation/contexts/LanguageContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* OVERLAY DENGAN BLUR */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* KOTAK MODAL */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-fade-in">
        
        {/* HEADER MODAL */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            ⚙️ {t('settings')}
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
          >
            ✕
          </button>
        </div>

        {/* KONTEN PENGATURAN */}
        <div className="p-6 space-y-6">
          
          {/* PENGATURAN TEMA */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {t('theme')}
            </label>
            <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
              {(['light', 'dark', 'system'] as const).map((tOpt) => (
                <button
                  key={tOpt}
                  onClick={() => setTheme(tOpt)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                    theme === tOpt 
                      ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-sm border border-slate-200 dark:border-slate-700' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {tOpt === 'light' ? '🌞 ' : tOpt === 'dark' ? '🌙 ' : '💻 '}
                  {t(tOpt)}
                </button>
              ))}
            </div>
          </div>

          {/* PENGATURAN BAHASA */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {t('language')}
            </label>
            <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setLanguage('id')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  language === 'id' 
                    ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-sm border border-slate-200 dark:border-slate-700' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                🇮🇩 {t('indonesian')}
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  language === 'en' 
                    ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-sm border border-slate-200 dark:border-slate-700' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                🇬🇧 {t('english')}
              </button>
            </div>
          </div>

        </div>

        {/* FOOTER MODAL */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors shadow-md shadow-violet-500/20"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
}
