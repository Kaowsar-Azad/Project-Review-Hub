import { Metadata } from "next";
import { MentorPageContent } from "@/modules/mentor/server/mentor-page-content";

export const metadata: Metadata = {
  title: "Mentor Dashboard | ReviewHub",
  description: "Review student project submissions, inspect code details, and submit feedback.",
};

export default function MentorPage() {
  return <MentorPageContent />;
}
