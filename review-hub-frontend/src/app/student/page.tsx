import { Metadata } from "next";
import { StudentPageContent } from "@/modules/student/server/student-page-content";

export const metadata: Metadata = {
  title: "Submit Project | ReviewHub",
  description: "Submit your web development project for mentor review and structured feedback.",
};

export default function StudentPage() {
  return <StudentPageContent />;
}
