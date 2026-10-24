export interface IProjectSubmission {
  projectName: string;
  repoUrl: string;
  liveUrl: string;
  description: string;
}

export interface IStudentSubmission {
  id: string;
  projectName: string;
  repoUrl: string;
  liveUrl: string;
  description: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  submittedAt: string;
  reviewedAt?: string | null;
  feedback?: string;
}
