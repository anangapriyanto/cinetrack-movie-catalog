import type { Metadata } from "next";
import RegisterForm from "@/presentation/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account — CineTrack",
  description: "Join CineTrack — start tracking, rating, and discovering movies you love.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
