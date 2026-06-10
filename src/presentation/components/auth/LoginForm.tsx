'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { setAuthCookie } from '@/presentation/contexts/AuthContext';

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

function IconLock() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconEye({ open }: { open: boolean }) {
  return open ? (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" x2="23" y1="1" y2="23" />
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
  suffix?: React.ReactNode;
  autoComplete?: string;
}

function InputField({
  id, label, type, placeholder, value, onChange, icon, error, suffix, autoComplete,
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-300">
        {label}
      </label>
      <div className="relative group">
        {/* left icon */}
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
            w-full pl-11 pr-${suffix ? '11' : '4'} py-3 rounded-xl
            bg-white/5 border text-white text-sm placeholder:text-slate-600
            outline-none transition-all duration-200
            focus:bg-white/8 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/60
            ${error
              ? 'border-red-500/60 ring-1 ring-red-500/30'
              : 'border-white/10 hover:border-white/20'
            }
          `}
        />
        {/* right suffix */}
        {suffix && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {suffix}
          </span>
        )}
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
// LoginForm
// ---------------------------------------------------------------------------
export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState<React.ReactNode>('');
  const [infoMessage, setInfoMessage] = useState<React.ReactNode>('');

  // Check if session expired
  useEffect(() => {
    if (searchParams.get('expired') === 'true') {
      setInfoMessage('Sesi Anda telah berakhir. Silakan login kembali.');
    }
  }, [searchParams]);

  function validate() {
    const e: typeof errors = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Minimum 6 characters';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGlobalError('');
    setInfoMessage('');
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAuthCookie('authenticated');
      const next = searchParams.get('next') || '/';
      router.push(next);
    } catch (err: any) {
      console.warn("Peringatan dari Firebase:", err.message);
      let errMsg: React.ReactNode = 'Email atau password salah. Silakan coba lagi.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errMsg = (
          <span>
            Akun belum terdaftar atau password salah. Jika Anda belum mendaftar, silakan{' '}
            <Link href="/register" className="underline font-semibold hover:text-white transition-colors">
              Registrasi di sini
            </Link>
            .
          </span>
        );
      } else if (err.code === 'auth/too-many-requests') {
        errMsg = 'Terlalu banyak percobaan login yang gagal. Silakan coba lagi nanti.';
      }
      setGlobalError(errMsg);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setGlobalError('');
    setInfoMessage('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      setAuthCookie('authenticated');
      const next = searchParams.get('next') || '/';
      router.push(next);
    } catch (err: any) {
      console.warn("Peringatan dari Firebase:", err.message);
      if (err.code !== 'auth/popup-closed-by-user') {
        setGlobalError('Gagal masuk dengan Google. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-xl font-bold text-white">Welcome back</h2>
          <p className="text-slate-400 text-sm mt-1">Sign in to your account to continue</p>
        </div>

        {/* Info message */}
        {infoMessage && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm flex items-center gap-2 animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
              <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="16" y2="12" /><circle cx="12" cy="8" r="1" />
            </svg>
            {infoMessage}
          </div>
        )}

        {/* Global error */}
        {globalError && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-2 animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            <div className="flex-1 leading-relaxed">{globalError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <InputField
            id="login-email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(v) => { setEmail(v); setErrors(p => ({ ...p, email: undefined })); }}
            icon={<IconMail />}
            error={errors.email}
            autoComplete="email"
          />

          <InputField
            id="login-password"
            label="Password"
            type={showPass ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(v) => { setPassword(v); setErrors(p => ({ ...p, password: undefined })); }}
            icon={<IconLock />}
            error={errors.password}
            autoComplete="current-password"
            suffix={
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                className="text-slate-500 hover:text-violet-400 transition-colors duration-200 cursor-pointer"
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                <IconEye open={showPass} />
              </button>
            }
          />

          {/* Forgot password */}
          <div className="flex justify-end -mt-1">
            <Link
              href="/forgot-password"
              className="text-xs text-slate-500 hover:text-violet-400 transition-colors duration-200"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            id="login-submit"
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
              mt-2
            "
          >
            {loading ? (
              <>
                <IconSpinner />
                Signing in…
              </>
            ) : (
              <>
                Sign in
                <IconArrowRight />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-slate-600 font-medium">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Social placeholder (Google) */}
        <button
          id="login-google"
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="
            w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl
            bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20
            text-slate-300 text-sm font-medium
            transition-all duration-200 cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-violet-500/40
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {/* Google SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4.5 h-4.5">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </button>
      </div>

      {/* Switch to register */}
      <p className="text-center text-slate-500 text-sm mt-6">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="text-violet-400 hover:text-fuchsia-400 font-semibold transition-colors duration-200"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
