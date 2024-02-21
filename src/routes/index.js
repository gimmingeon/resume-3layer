import express from 'express';
import UsersRouter from './users.router.js';
import ResumeRouter from './resume.router.js';

const router = express.Router();

router.use('/users', UsersRouter);
router.use('/resumes', ResumeRouter);

export default router;
