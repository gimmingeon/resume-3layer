import {prisma} from '../utils/prisma/index.js'

export class UsersRepository {

    // 데이터베이스 입력
    createUser = async (email, hashedPassword, name) => {

        const createdUser = await prisma.users.create({
            data: {
                email, password : hashedPassword, name
            }
        });

        return createdUser;
    }

    // 로그인하기 위한 이메일 체크 
    // 여기서 이메일 있는지 확인
    loginUser = async (email) => {
        const user = await prisma.users.findFirst({where: {email}});

        return user;
    }


    // 회원조회
    // 마찬가지로 userId를 받아야 하기 때문에 userId dlqfur
    inquiryUser = async (userId) => {

        const user = await prisma.users.findFirst({
            where: {userId: +userId},
            select: {
                userId: true,
                email: true,
                name: true,
            },
        });

        return user || null;
    }

}