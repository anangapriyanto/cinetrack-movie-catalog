'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, signOut } from 'firebase/auth';
import { auth, db, googleProvider } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { setAuthCookie } from '@/presentation/contexts/AuthContext';

// ---------------------------------------------------------------------------
// Inline SVG Icons (Heroicons outline)
// ---------------------------------------------------------------------------
function IconFilm() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M3.375 3h17.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125H3.375A1.125 1.125 0 0 1 2.25 19.875V4.125C2.25 3.504 2.754 3 3.375 3Z" />
      <path d="m21 9-9 9-9-9" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
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

function IconCheck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// PasswordStrength indicator
// ---------------------------------------------------------------------------
function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: 'At least 8 characters', ok: password.length >= 8 },
    { label: 'Uppercase letter', ok: /[A-Z]/.test(password) },
    { label: 'Number', ok: /[0-9]/.test(password) },
    { label: 'Special character', ok: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.ok).length;
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  const label = ['Weak', 'Fair', 'Good', 'Strong'];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2 animate-fade-in">
      {/* Strength bar */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1 flex-1">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < score ? colors[score - 1] : 'bg-white/10'}`}
            />
          ))}
        </div>
        <span className={`text-xs font-medium transition-colors duration-300 ${score === 4 ? 'text-green-400' : score === 3 ? 'text-yellow-400' : score === 2 ? 'text-orange-400' : 'text-red-400'}`}>
          {label[score - 1] ?? ''}
        </span>
      </div>
      {/* Checklist */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {checks.map(c => (
          <span key={c.label} className={`flex items-center gap-1.5 text-[11px] transition-colors duration-200 ${c.ok ? 'text-green-400' : 'text-slate-600'}`}>
            <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${c.ok ? 'bg-green-500 text-white' : 'border border-white/20'}`}>
              {c.ok && <IconCheck />}
            </span>
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// InputField
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

function InputField({ id, label, type, placeholder, value, onChange, icon, error, suffix, autoComplete }: InputFieldProps) {
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
            w-full pl-11 ${suffix ? 'pr-11' : 'pr-4'} py-3 rounded-xl
            bg-white/5 border text-white text-sm placeholder:text-slate-600
            outline-none transition-all duration-200
            focus:bg-white/8 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/60
            ${error ? 'border-red-500/60 ring-1 ring-red-500/30' : 'border-white/10 hover:border-white/20'}
          `}
        />
        {suffix && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{suffix}</span>
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
// RegisterForm
// ---------------------------------------------------------------------------
export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Full name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 8) e.password = 'Minimum 8 characters';
    if (!confirm) e.confirm = 'Please confirm your password';
    else if (confirm !== password) e.confirm = 'Passwords do not match';
    if (!agreed) e.agreed = 'You must accept the terms';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update Firebase Profile
      await updateProfile(user, {
        displayName: name,
      });

      // Save user to Firestore users collection
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        photoURL: null,
        createdAt: new Date().toISOString(),
      });

      // Prevent AuthContext from seeing this as a session expiration
      localStorage.setItem('intentional-logout', 'true');
      // Sign out immediately so the user is forced to log in manually
      await signOut(auth);

      setSuccess(true);
    } catch (err: any) {
      console.warn("Peringatan dari Firebase:", err.message);
      let errMsg = 'Gagal membuat akun. Silakan coba lagi.';
      if (err.code === 'auth/email-already-in-use') {
        errMsg = 'Email ini sudah terdaftar. Silakan gunakan email lain atau login.';
      } else if (err.code === 'auth/invalid-email') {
        errMsg = 'Format email tidak valid.';
      } else if (err.code === 'auth/weak-password') {
        errMsg = 'Password terlalu lemah.';
      } else if (err.code === 'auth/invalid-credential') {
        errMsg = 'Kredensial tidak valid atau sudah digunakan.';
      }
      alert(errMsg);
      setErrors(p => ({ ...p, global: errMsg }));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignUp() {
    setErrors({});
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      setAuthCookie('authenticated');
      router.push('/');
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        const errMsg = 'Gagal mendaftar dengan Google. Silakan coba lagi.';
        alert(errMsg);
        setErrors(p => ({ ...p, global: errMsg }));
      }
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="animate-fade-in-up text-center" style={{ animationDuration: '0.5s' }}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/30 mb-4">
            <IconFilm />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
            CINETRACK
          </h1>
        </div>
        <div className="bg-white/4 border border-white/10 rounded-2xl p-10 shadow-2xl backdrop-blur-md">
          <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-green-400">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Account created!</h2>
          <p className="text-slate-400 text-sm mb-6">Welcome to CineTrack. Your account has been successfully created.</p>
          <Link
            href="/login"
            id="goto-login-after-register"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white transition-all duration-200 cursor-pointer"
          >
            Go to Login <IconArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up" style={{ animationDuration: '0.5s' }}>
      {/* Brand */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/30 mb-4">
          <IconFilm />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
          CINETRACK
        </h1>
        <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold mt-1">Pro Edition</p>
      </div>

      {/* Card */}
      <div className="bg-white/4 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">Create your account</h2>
          <p className="text-slate-400 text-sm mt-1">Join thousands of movie lovers on CineTrack</p>
        </div>

        {/* Global error */}
        {errors.global && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2 animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
              <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            {errors.global}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <InputField
            id="register-name"
            label="Full name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(v) => { setName(v); setErrors(p => ({ ...p, name: '' })); }}
            icon={<IconUser />}
            error={errors.name}
            autoComplete="name"
          />

          <InputField
            id="register-email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(v) => { setEmail(v); setErrors(p => ({ ...p, email: '' })); }}
            icon={<IconMail />}
            error={errors.email}
            autoComplete="email"
          />

          <div>
            <InputField
              id="register-password"
              label="Password"
              type={showPass ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              value={password}
              onChange={(v) => { setPassword(v); setErrors(p => ({ ...p, password: '' })); }}
              icon={<IconLock />}
              error={errors.password}
              autoComplete="new-password"
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
            <PasswordStrength password={password} />
          </div>

          <InputField
            id="register-confirm"
            label="Confirm password"
            type={showConfirm ? 'text' : 'password'}
            placeholder="Repeat your password"
            value={confirm}
            onChange={(v) => { setConfirm(v); setErrors(p => ({ ...p, confirm: '' })); }}
            icon={<IconLock />}
            error={errors.confirm}
            autoComplete="new-password"
            suffix={
              <button
                type="button"
                onClick={() => setShowConfirm(s => !s)}
                className="text-slate-500 hover:text-violet-400 transition-colors duration-200 cursor-pointer"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                <IconEye open={showConfirm} />
              </button>
            }
          />

          {/* Terms */}
          <div>
            <label htmlFor="register-terms" className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5 shrink-0">
                <input
                  id="register-terms"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => { setAgreed(e.target.checked); setErrors(p => ({ ...p, agreed: '' })); }}
                  className="sr-only peer"
                />
                <div className={`
                  w-4 h-4 rounded border transition-all duration-200 flex items-center justify-center
                  peer-focus-visible:ring-2 peer-focus-visible:ring-violet-500/50
                  ${agreed ? 'bg-violet-600 border-violet-600' : 'bg-white/5 border-white/20 group-hover:border-white/40'}
                `}>
                  {agreed && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-slate-400 leading-snug">
                I agree to the{' '}
                <Link href="/terms" className="text-violet-400 hover:text-fuchsia-400 transition-colors duration-200">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-violet-400 hover:text-fuchsia-400 transition-colors duration-200">Privacy Policy</Link>
              </span>
            </label>
            {errors.agreed && (
              <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 shrink-0">
                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm-.75-5V5.75a.75.75 0 0 1 1.5 0V10a.75.75 0 0 1-1.5 0Zm.75 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" clipRule="evenodd" />
                </svg>
                {errors.agreed}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            id="register-submit"
            type="submit"
            disabled={loading}
            className="
              w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm
              bg-linear-to-r from-violet-600 to-fuchsia-600
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
                Creating account…
              </>
            ) : (
              <>
                Create account
                <IconArrowRight />
              </>
            )}
          </button>
        </form>

        {/* Divider + Google */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-slate-600 font-medium">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <button
          id="register-google"
          type="button"
          onClick={handleGoogleSignUp}
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4.5 h-4.5">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Sign up with Google
        </button>
      </div>

      {/* Switch to login */}
      <p className="text-center text-slate-500 text-sm mt-6">
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-violet-400 hover:text-fuchsia-400 font-semibold transition-colors duration-200"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
