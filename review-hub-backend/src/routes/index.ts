import { Router } from "express";
import submissionRoutes from "./submissions.js";
import mentorRoutes from "./mentor.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ message: "ReviewHub API is active and running!" });
});

router.use("/submissions", submissionRoutes);
router.use("/mentor", mentorRoutes);

export default router;
