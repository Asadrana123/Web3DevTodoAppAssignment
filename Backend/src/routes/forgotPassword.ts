import express, { Router } from "express";
import { forgotPassword, resetPassword } from "../controllers/forgotPasswordController";

const router: Router = express.Router();

router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

export default router;
