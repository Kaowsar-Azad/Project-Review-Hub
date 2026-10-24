import { api } from "./api";

export interface IProjectSubmissionInput {
  projectName: string;
  repoUrl: string;
  liveUrl: string;
  description: string;
  studentId?: string;
}
export const submitProject = async (data: IProjectSubmissionInput) => {
  const response = await api.post("/submissions", data);
  return response.data;
};
export const getMySubmissions = async (studentId: string) => {
  const response = await api.get(`/submissions/my/${studentId}`);
  return response.data;
};
