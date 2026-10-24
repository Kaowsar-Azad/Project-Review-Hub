import { api } from "@/lib/api";

export class AuthService {
  static async signUp(data: { name: string; email: string; password: string }) {
    const response = await api.post("/auth/sign-up/email", data);
    return response.data;
  }

  static async signIn(data: { email: string; password: string }) {
    const response = await api.post("/auth/sign-in/email", data);
    return response.data;
  }
}
