import { Router, Response } from "express";
import prisma from "../lib/prisma";
import { AuthRequest, verifyAuth } from "../middlewares/auth";

const router = Router();

router.post("/", verifyAuth, async (req: AuthRequest, res: Response) => {
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
