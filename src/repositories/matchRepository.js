import { prisma } from "../lib/prisma.js";

export default {
    async create(parsedData) {
        return await prisma.match.create({
            data: {
                ...parsedData
            }
        });
    }
}