import { Router } from "express";
import { LineupController } from "../controllers/LineupController";

const router = Router();
const lineupController = new LineupController();

router.post("/", (req, res) => lineupController.saveLineup(req, res));
router.get("/user/:userId", (req, res) =>
	lineupController.getUserLineups(req, res)
);

export default router;
