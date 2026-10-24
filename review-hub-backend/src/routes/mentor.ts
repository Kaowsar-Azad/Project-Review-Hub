import { Router, Response } from "express";
import prisma from "../lib/prisma.js";
import { AuthRequest, verifyAuth, requireMentor } from "../middlewares/auth.js";

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
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 10);
    const skip = (page - 1) * limit;

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

    const [totalCount, submissions] = await Promise.all([
      prisma.submission.count({ where: whereClause }),
      prisma.submission.findMany({
        where: whereClause,
        include: {
          student: {
            select: {
              name: true,
              fullName: true,
              email: true,
              studentId: true,
            },
          },
        },
        orderBy: { submittedAt: "desc" },
        skip,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit) || 1;

    return res.json({
      success: true,
      count: submissions.length,
      totalCount,
      totalPages,
      currentPage: page,
      limit,
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
