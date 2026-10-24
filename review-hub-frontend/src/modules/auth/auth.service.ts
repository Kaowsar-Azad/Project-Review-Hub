import { authClient } from "@/lib/auth-client";

export class AuthService {
  static async signUp(data: { name: string; email: string; password: string }) {
    const res = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (res.error) {
      throw new Error(res.error.message || "Failed to create account");
    }

    return res.data;
  }

  static async signIn(data: { email: string; password: string }) {
    const res = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (res.error) {
      throw new Error(res.error.message || "Invalid credentials");
    }

    // Retrieve JWT token via Better Auth JWT plugin as per official docs
    try {
      const tokenRes = await authClient.token();
      if (tokenRes?.data?.token) {
        document.cookie = `token=${tokenRes.data.token}; path=/; max-age=604800; SameSite=Lax`;
        localStorage.setItem("token", tokenRes.data.token);
      }
    } catch (e) {
      console.warn("Could not retrieve JWT token:", e);
    }

    return res.data;
  }

  static async getJwtToken() {
    const tokenRes = await authClient.token();
    return tokenRes?.data?.token;
  }
}
