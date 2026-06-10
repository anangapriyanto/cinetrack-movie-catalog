'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// ---------------------------------------------------------------------------
// Inline SVG Icons (Heroicons outline)
// ---------------------------------------------------------------------------
function IconFilm() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M3.375 3h17.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125H3.375A1.125 1.125 0 0 1 2.25 19.875V4.125C2.25 3.504 2.754 3 3.375 3Z" />
      <path d="m21 9-9 9-9-9" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v18M15 3v18" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function IconSpinner() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-green-400">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// InputField component
// ---------------------------------------------------------------------------
interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  error?: string;
  autoComplete?: string;
}

function InputField({ id, label, type, placeholder, value, onChange, icon, error, autoComplete }: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-300">
        {label}
      </label>
      <div className="relative group">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-colors duration-200 pointer-events-none">
          {icon}
        </span>
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className={`
            w-full pl-11 pr-4 py-3 rounded-xl
            bg-white/5 border text-white text-sm placeholder:text-slate-600
            outline-none transition-all duration-200
            focus:bg-white/8 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/60
            ${error
              ? 'border-red-500/60 ring-1 ring-red-500/30'
              : 'border-white/10 hover:border-white/20'
            }
          `}
        />
      </div>
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1.5 animate-fade-in-up">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 shrink-0">
            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm-.75-5V5.75a.75.75 0 0 1 1.5 0V10a.75.75 0 0 1-1.5 0Zm.75 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ForgotPasswordForm
// ---------------------------------------------------------------------------
export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email wajib diisi');
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Format email tidak valid');
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      console.warn("Peringatan dari Firebase:", err.message);
      let errMsg = 'Gagal mengirim email reset. Silakan coba lagi.';
      if (err.code === 'auth/user-not-found') {
        errMsg = 'Email tidak terdaftar di sistem kami.';
      } else if (err.code === 'auth/invalid-email') {
        errMsg = 'Format email tidak valid.';
      } else if (err.code === 'auth/too-many-requests') {
        errMsg = 'Terlalu banyak permintaan. Silakan coba lagi nanti.';
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="animate-fade-in-up text-center" style={{ animationDuration: '0.5s' }}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/30 mb-4">
            <IconFilm />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
            CINETRACK
          </h1>
        </div>
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-10 shadow-2xl backdrop-blur-md">
          <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
            <IconCheck />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Email Terkirim!</h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            Kami telah mengirimkan instruksi untuk mengatur ulang password ke email <strong className="text-white font-medium">{email}</strong>. Silakan cek kotak masuk atau folder spam Anda.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white transition-all duration-200 cursor-pointer"
          >
            Kembali ke Login <IconArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up" style={{ animationDuration: '0.5s' }}>
      {/* Brand */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/30 mb-4">
          <IconFilm />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
          CINETRACK
        </h1>
        <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold mt-1">Pro Edition</p>
      </div>

      {/* Card */}
      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">Reset Password</h2>
          <p className="text-slate-400 text-sm mt-1">Masukkan email Anda untuk menerima link reset password.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <InputField
            id="reset-email"
            label="Alamat Email"
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(v) => { setEmail(v); setError(''); }}
            icon={<IconMail />}
            error={error}
            autoComplete="email"
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm
              bg-gradient-to-r from-violet-600 to-fuchsia-600
              hover:from-violet-500 hover:to-fuchsia-500
              text-white shadow-lg shadow-violet-500/25
              transition-all duration-200 cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-transparent
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {loading ? (
              <>
                <IconSpinner />
                Mengirim...
              </>
            ) : (
              <>
                Kirim Link Reset
                <IconArrowRight />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-200 flex items-center justify-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Kembali ke Login
          </Link>
        </div>
      </div>
    </div>
  );
}
