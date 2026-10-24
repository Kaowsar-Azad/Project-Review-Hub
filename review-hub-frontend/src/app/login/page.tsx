import { Metadata } from "next";
import { LoginPageContent } from "@/modules/auth/server/login-page-content";

export const metadata: Metadata = {
  title: "Sign In | ReviewHub",
  description: "Sign in to your ReviewHub student or mentor account.",
};

export default function LoginPage() {
  return <LoginPageContent />;
}
