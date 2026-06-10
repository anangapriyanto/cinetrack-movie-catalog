import type { Metadata } from "next";
import LoginForm from "@/presentation/components/auth/LoginForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login — CineTrack",
  description: "Sign in to your CineTrack account and track your favorite movies.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-white text-center py-10">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
