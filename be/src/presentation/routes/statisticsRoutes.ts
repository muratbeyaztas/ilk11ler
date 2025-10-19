import { Router } from "express";
import { StatisticsController } from "../controllers/StatisticsController";

const router = Router();
const statisticsController = new StatisticsController();

router.get("/team/:teamId", (req, res) =>
	statisticsController.getTeamStatistics(req, res)
);
router.get("/team/:teamId/position/:position", (req, res) =>
	statisticsController.getPositionStatistics(req, res)
);

export default router;
