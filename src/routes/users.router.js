import express from "express";
import { UsersController } from '../controllers/users.controller.js';
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
// PostsController를 인스턴스화 시킨다
const usersController = new UsersController();

// 회원가입 api
router.post('/sign-up', usersController.createUser);

// 로그인
router.post('/sign-in', usersController.loginUser);

// 회원조회
router.get("/user",authMiddleware, usersController.inquiryUser);

export default router;
