import { Router, Response } from "express";
import rateLimit from "express-rate-limit";
import prisma from "../lib/prisma.js";
import { AuthRequest, verifyAuth } from "../middlewares/auth.js";

const router = Router();

const submissionRateLimiter = rateLimit({
  windowMs: 30 * 1000,
  max: 1,
  keyGenerator: (req: any) => {
    return req.user?.id || req.ip || "anonymous";
  },
  validate: false,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Rate limit reached: Please wait 30 seconds before submitting another project.",
  },
});

router.post("/", verifyAuth, submissionRateLimiter, async (req: AuthRequest, res: Response) => {
  try {
    const { projectName, repoUrl, liveUrl, description } = req.body;
    const studentId = req.user?.id || req.body.studentId;

    if (!projectName || !repoUrl || !liveUrl || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields (project name, repo URL, live URL, description) are required",
      });
    }

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    const existingSubmission = await prisma.submission.findFirst({
      where: {
        studentId,
        repoUrl,
      },
    });

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a project with this GitHub repository URL",
      });
    }

    const submission = await prisma.submission.create({
      data: {
        projectName,
        repoUrl,
        liveUrl,
        description,
        studentId,
        status: "PENDING",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Project submitted successfully for review!",
      submission,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to submit project",
    });
  }
});

router.get("/my/:studentId", verifyAuth, async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.params.studentId as string;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    const submissions = await prisma.submission.findMany({
      where: { 
        studentId: studentId 
      },
      orderBy: { submittedAt: "desc" },
    });

    return res.json({
      success: true,
      count: submissions.length,
      submissions,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch your submissions",
    });
  }
});
export default router;
