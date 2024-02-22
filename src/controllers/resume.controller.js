import { ResumeService } from "../services/resume.service.js";
import authMiddleware from "../middlewares/auth.middleware.js";

export class ResumeController {
    resumeService = new ResumeService();

    // 이력서 생성
    createResume = async (req, res, next) => {

        const { userId } = req.user;
        const { title, introduction, author, status } = req.body;

        const resumeStatus = status || "APPLY";

        const statusOption = [
            "APPLY",
            "DROP",
            "PASS",
            "INTERVIEW1",
            "INTERVIEW2",
            "FINAL_PASS",
        ];

        if (!statusOption.includes(resumeStatus)) {
            return res.status(400).json({ message: "이력서 상태를 잘못 입력했습니다" });
        }

        const resume = await this.resumeService.createResume(userId, title, introduction, author, status);
        return res.status(201).json({ data: resume });
    };

    // 이력서 전체 조회
    getAllResumes = async (req, res, next) => {
        const resumes = await this.resumeService.getAllResumes();
        return res.status(200).json({ data: resumes });
    };

    getResumeById = async (req, res, next) => {
        const { resumeId } = req.params;
        const { userId } = req.user; // 이 부분을 추가하여 userId를 가져오도록 수정
    
        const resume = await this.resumeService.getResumeById(resumeId, userId);
    
        if (!resume) {
            return res.status(404).json({ message: "이력서 조회에 실패하였습니다." });
        }
    
        if (resume.userId !== +userId) {
            return res.status(403).json({ message: "당신의 이력서가 아닙니다" });
        }
    
        return res.status(200).json({ data: resume });
    };
    
    updateResume = async (req, res, next) => {
        const { resumeId } = req.params;
        const { title, introduction, status } = req.body;

        const resumeStatus = status || "APPLY";

        const statusOption = [
            "APPLY",
            "DROP",
            "PASS",
            "INTERVIEW1",
            "INTERVIEW2",
            "FINAL_PASS",
        ];

        if (!statusOption.includes(resumeStatus)) {
            return res.status(400).json({ message: "이력서 상태를 잘못 입력했습니다" });
        }

        const resume = await this.resumeService.updateResume(resumeId, title, introduction, status);
        
        if (!resume) {
            return res.status(404).json({ message: "이력서 조회에 실패하였습니다." });
        }

        if (resume.userId !== +userId) {
            return res.status(403).json({ message: "당신의 이력서가 아닙니다" });
        }
        
        return res.status(200).json({ message: "이력서 수정 완료" });
    };

    deleteResume = async (req, res, next) => {
        const { resumeId } = req.params;

        const resume = await this.resumeService.deleteResume(resumeId);

        if (!resume) {
            return res.status(404).json({ message: "이력서조회에 실패했습니다" });
        }
        
          if(resume.userId !== +userId) {
            return res.status(404).json({message: "당신의 이력서가 아닙니다"});
        }
        

        return res.status(200).json({ message: "이력서 삭제" });
    }



}