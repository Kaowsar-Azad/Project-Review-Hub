import { api } from "@/lib/api";
import { IProjectSubmission } from "./student.types";

export class StudentService {
  static async submitProject(data: IProjectSubmission & { studentId?: string }) {
    const response = await api.post("/submissions", data);
    return response.data;
  }

  static async getMySubmissions(studentId: string) {
    const response = await api.get(`/submissions/my/${studentId}`);
    return response.data;
  }
}
