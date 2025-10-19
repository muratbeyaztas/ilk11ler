import { Router } from "express";
import teamRoutes from "./teamRoutes";
import userRoutes from "./userRoutes";
import lineupRoutes from "./lineupRoutes";
import statisticsRoutes from "./statisticsRoutes";

const router = Router();

router.use("/teams", teamRoutes);
router.use("/users", userRoutes);
router.use("/lineups", lineupRoutes);
router.use("/statistics", statisticsRoutes);

export default router;
