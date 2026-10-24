import { Metadata } from "next";
import { SubmissionsPageContent } from "@/modules/student/server/submissions-page-content";

export const metadata: Metadata = {
  title: "My Submissions | ReviewHub",
  description: "Track your submitted projects, review progress, and mentor evaluation timeline.",
};

export default function SubmissionsPage() {
  return <SubmissionsPageContent />;
}
