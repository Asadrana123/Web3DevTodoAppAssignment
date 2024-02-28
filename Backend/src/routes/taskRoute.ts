import express, { Router } from "express";
import { addTask, getTask, removeTask } from "../controllers/taskController";
import requireAuth from  "../middleware/requireAuth";

const router: Router = express.Router();

router.post("/addTask", requireAuth, addTask);
router.get("/getTask", requireAuth, getTask);
router.delete("/removeTask/:id", requireAuth, removeTask);

export default router;
