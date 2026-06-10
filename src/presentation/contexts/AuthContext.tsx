'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface AuthUser {
  name: string;
  email: string;
  photoURL: string | null;
  uid: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const COOKIE_NAME = 'auth-token';
export const STORAGE_KEY = 'cinetrack-user';

export function setAuthCookie(value: string) {
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=604800; SameSite=Lax`;
}

export function clearAuthCookie() {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Handle Auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      setIsLoading(true);
      if (firebaseUser) {
        let name = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User';
        let photoURL = firebaseUser.photoURL || null;

        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.name) name = data.name;
            if (data.photoURL) photoURL = data.photoURL;
          } else {
            // Save initial doc in Firestore if it doesn't exist (e.g. for Google sign in)
            await setDoc(doc(db, 'users', firebaseUser.uid), {
              uid: firebaseUser.uid,
              name,
              email: firebaseUser.email || '',
              photoURL,
              createdAt: new Date().toISOString()
            }, { merge: true });
          }
        } catch (err) {
          console.warn("Peringatan: Gagal membaca/menyimpan data user di Firestore (mungkin karena offline/AdBlocker):", err);
        }

        const userData: AuthUser = {
          uid: firebaseUser.uid,
          name,
          email: firebaseUser.email || '',
          photoURL,
        };

        setAuthCookie('authenticated');
        setUser(userData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      } else {
        const wasAuthenticated = !!localStorage.getItem(STORAGE_KEY);
        const isIntentional = localStorage.getItem('intentional-logout') === 'true';
        
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
        clearAuthCookie();
        
        if (wasAuthenticated && !isIntentional) {
          router.push('/login?expired=true');
        }
        localStorage.removeItem('intentional-logout');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      localStorage.setItem('intentional-logout', 'true');
      await signOut(auth);
      setUser(null);
      localStorage.removeItem(STORAGE_KEY);
      clearAuthCookie();
      router.push('/login');
    } catch (err) {
      console.error("Error signing out:", err);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
