import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";
import prisma from "../lib/prisma.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "STUDENT" | "MENTOR";
  };
}

export const verifyAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (session?.user) {
      const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { id: true, role: true },
      });

      req.user = {
        id: session.user.id,
        role: dbUser?.role || (session.user as any).role || "STUDENT",
      };
      return next();
    }

    // Support Better Auth JWT Bearer Token
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        const parts = token.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf-8"));
          const userId = payload.sub || payload.id;
          if (userId) {
            const dbUser = await prisma.user.findUnique({
              where: { id: userId },
              select: { id: true, role: true },
            });
            if (dbUser) {
              req.user = {
                id: dbUser.id,
                role: dbUser.role || payload.role || "STUDENT",
              };
              return next();
            }
          }
        }
      } catch (jwtErr) {
        // Fallback to other auth methods
      }
    }

    const userId = req.headers["x-user-id"] as string;

    if (userId) {
      const dbUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, role: true },
      });

      req.user = {
        id: userId,
        role: dbUser?.role || (req.headers["x-user-role"] as "STUDENT" | "MENTOR") || "STUDENT",
      };
      return next();
    }

    return res.status(401).json({
      success: false,
      message: "Unauthorized: Please log in first",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export const requireMentor = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "MENTOR") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Mentor access required",
    });
  }
  next();
};
