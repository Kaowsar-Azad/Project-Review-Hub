import { Metadata } from "next";
import { SignUpPageContent } from "@/modules/auth/server/signup-page-content";

export const metadata: Metadata = {
  title: "Student Registration | ReviewHub",
  description: "Create your student account on ReviewHub to submit projects for mentor evaluation.",
};

export default function SignUpPage() {
  return <SignUpPageContent />;
}
