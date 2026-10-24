export interface ISubmissionItem {
  id: string;
  projectName: string;
  studentName: string;
  studentId: string;
  repoUrl: string;
  liveUrl: string;
  description: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
  feedback?: string;
}

export type SubmissionFilter = "ALL" | "PENDING" | "APPROVED" | "REJECTED";
