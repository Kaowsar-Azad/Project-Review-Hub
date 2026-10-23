import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

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
      req.user = {
        id: session.user.id,
        role: (session.user as any).role || "STUDENT",
      };
      return next();
    }

    const userId = req.headers["x-user-id"] as string;
    const userRole = req.headers["x-user-role"] as "STUDENT" | "MENTOR";

    if (userId) {
      req.user = { id: userId, role: userRole || "STUDENT" };
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
