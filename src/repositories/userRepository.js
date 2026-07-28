import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";


export default {
    async create(parsedUserData) {        
        const user = await prisma.user.create({
            data: {
                ...parsedUserData
            }
        });

        return user;
    },

    async getUserByEmail(email) {
        const user =  await prisma.user.findUnique({
            where: {
                email
            }
        });

        return user;
    }
}