import express from "express";
import { ResumeController } from '../controllers/resume.controller.js';
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
// PostsController를 인스턴스화 시킨다
const resumeController = new ResumeController();

router.post("/resume", authMiddleware, resumeController.createResume);
router.get("/resume", resumeController.getAllResumes);
router.get("/resume/:resumeId",authMiddleware, resumeController.getResumeById);
router.put("/resume/:resumeId", authMiddleware, resumeController.updateResume);
router.delete("/resume/:resumeId", authMiddleware, resumeController.deleteResume);

export default router;
