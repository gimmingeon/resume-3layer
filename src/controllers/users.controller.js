import { UsersService } from "../services/users.service.js";

export class UsersController {
    usersService = new UsersService();

    // 회원가입
    createUser = async (req, res, next) => {

        const { email, password, passwordcheck, name } = req.body;

        if (!email) {
            return res.status(400).json({ message: "이메일을 적지 않았습니다" });
        }

        if (!password) {
            return res.status(400).json({ message: "비밀번호를 적지 않았습니다" });
        }

        if (!passwordcheck) {
            return res.status(400).json({ message: "비밀번호 확인을 적지 않았습니다" });
        }

        if (!name) {
            return res.status(400).json({ message: "이름을 적지 않았습니다" });
        }

        if (password !== passwordcheck) {
            return res
                .status(400)
                .json({ message: "비밀번호가 비밀번호 확인과 다릅니다" });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: "비밀번호는 6자리 이상으로 만들어야 합니다" });
        }

        const user = await this.usersService.createUser(email, password, name);

        if (!user) {
            return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
        }

        return res.status(201).json({ email: user.email, name: user.name });

    }

    // 로그인
    loginUser = async (req, res, next) => {
        const { email, password } = req.body;
        const result = await this.usersService.loginUser(email, password);

        if (!result) {
            return res.status(401).json({ message: "없는 이메일이거나 비밀번호가 틀렸습니다." });
        }

        const { token, message } = result;
        res.cookie("authorization", token);
        return res.status(200).json({ message });
    };

    // 회원조회
    inquiryUser = async (req, res, next) => {

        const { userId } = req.user;
        const user = await this.usersService.inquiryUser(userId);

        if (!user) {
            return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
        }

        return res.status(201).json({ data: user });
    };
}