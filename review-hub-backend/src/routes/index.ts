import { Router } from "express";
import submissionRoutes from "./submissions";
import mentorRoutes from "./mentor";

const router = Router();

router.use("/submissions", submissionRoutes);
router.use("/mentor", mentorRoutes);

export default router;
