import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL:
    process.env.BETTER_AUTH_URL ||
    "https://project-review-hub-backend.vercel.app",
  trustedOrigins: [
    "http://localhost:3000",
    "https://project-review-hub-lime.vercel.app",
    ...(process.env.CLIENT_URL ? [process.env.CLIENT_URL] : []),
  ], 
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "STUDENT",
      },
      fullName: {
        type: "string",
        required: false,
      },
      studentId: {
        type: "string",
        required: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const random4Digit = Math.floor(1000 + Math.random() * 9000).toString();
          return {
            data: {
              ...user,
              fullName: user.name,
              studentId: random4Digit,
            },
          };
        },
      },
    },
  },
  plugins: [
    jwt({
      jwt: {
        expirationTime: "7d",
      },
    }),
  ],
});
