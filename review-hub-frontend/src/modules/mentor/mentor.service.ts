import { api } from "@/lib/api";

export class MentorService {
  static async getStats() {
    const response = await api.get("/mentor/stats");
    return response.data;
  }

  static async getSubmissions(filter?: string, search?: string) {
    const params = new URLSearchParams();
    if (filter && filter !== "ALL") params.append("status", filter);
    if (search) params.append("search", search);
    const response = await api.get(`/mentor/submissions?${params.toString()}`);
    return response.data;
  }

  static async updateReview(id: string, status: "APPROVED" | "REJECTED", feedback?: string) {
    const response = await api.patch(`/mentor/submissions/${id}`, { status, feedback });
    return response.data;
  }
}
