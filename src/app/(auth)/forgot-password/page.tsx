import type { Metadata } from "next";
import ForgotPasswordForm from "@/presentation/components/auth/ForgotPasswordForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password — CineTrack",
  description: "Reset your CineTrack account password.",
};

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="text-white text-center py-10 animate-pulse">Memuat...</div>}>
      <ForgotPasswordForm />
    </Suspense>
  );
}
