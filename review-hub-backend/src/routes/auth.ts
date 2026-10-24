import { Router, Request, Response } from "express";
import prisma from "../lib/prisma.js"; 

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, studentId, role } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, and password are required",
      });
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const user = await prisma.user.create({
      data: {
        name: fullName,
        fullName,
        email,
        studentId: studentId || null,
        role: role === "MENTOR" ? "MENTOR" : "STUDENT",
      },
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to register user",
    });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const account = await prisma.account.findFirst({
      where: { userId: user.id },
    });

    if (!user || !account || account.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    return res.json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
});

export default router;
