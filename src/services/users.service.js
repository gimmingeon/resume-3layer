// src/services/posts.service.js
import { UsersRepository } from '../repositories/users.repository.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export class UsersService {
    usersRepository = new UsersRepository();

    // 회원가입
    createUser = async (email, password, name) => {

        const hashedPassword = await bcrypt.hash(password, 10);

        const isExistUser = await this.usersRepository.loginUser(email);

        if (isExistUser) {

            return null;
        }

        const createdUser = await this.usersRepository.createUser(
            email, hashedPassword, name
        );

        return {
            email: createdUser.email,
            name: createdUser.name
        }
    }

    // 로그인
    loginUser = async (email, password) => {
        const user = await this.usersRepository.loginUser(email)

        // 유저 없음
        if (!user) {
            return null;
        }

        // 비번 일치 x
        if (!(await bcrypt.compare(password, user.password))) {
            return null;
        }
        const token = jwt.sign({ userId: user.userId }, "custom-secret-key", {
            expiresIn: "12h",
        });

        return {
            message: "로그인되었습니다",
            token: `Bearer ${token}`,
        };

    };

    // 회원조회 api
    inquiryUser = async (userId) => {
        
        const user = await this.usersRepository.inquiryUser(userId);

        return user
    };

}