import { Router, Response } from "express";
import prisma from "../lib/prisma";
import { AuthRequest, verifyAuth, requireMentor } from "../middlewares/auth";

const router = Router();

router.get("/stats", verifyAuth, requireMentor, async (req: AuthRequest, res: Response) => {
  try {
    const total = await prisma.submission.count();
    const pending = await prisma.submission.count({ where: { status: "PENDING" } });
    const approved = await prisma.submission.count({ where: { status: "APPROVED" } });
    const rejected = await prisma.submission.count({ where: { status: "REJECTED" } });

    return res.json({
      success: true,
      stats: {
        total,
        pending,
        approved,
        rejected,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch dashboard stats",
    });
  }
});

router.get("/submissions", verifyAuth, requireMentor, async (req: AuthRequest, res: Response) => {
  try {
    const { status, search } = req.query;

    const whereClause: any = {};
    if (status && status !== "ALL") {
      whereClause.status = status;
    }

    if (search && typeof search === "string") {
      whereClause.projectName = {
        contains: search,
        mode: "insensitive", 
      };
    }

    const submissions = await prisma.submission.findMany({
      where: whereClause,
      include: {
        student: {
          select: {
            fullName: true,
            email: true,
            studentId: true,
          },
        },
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
      message: error.message || "Failed to fetch submissions",
    });
  }
});

router.patch("/submissions/:id", verifyAuth, requireMentor, async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status, feedback } = req.body;

    if (!status || !["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status (PENDING, APPROVED, REJECTED) is required",
      });
    }

    const updatedSubmission = await prisma.submission.update({
      where: { id },
      data: {
        status,
        feedback: feedback || null,
        reviewedAt: new Date(),
      },
      include: {
        student: {
          select: {
            fullName: true,
            email: true,
            studentId: true,
          },
        },
      },
    });

    return res.json({
      success: true,
      message: "Submission review updated successfully",
      submission: updatedSubmission,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update submission review",
    });
  }
});

export default router;
