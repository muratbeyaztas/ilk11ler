import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.post("/register", (req, res) => userController.register(req, res));
router.post("/verify", (req, res) => userController.verify(req, res));

export default router;
