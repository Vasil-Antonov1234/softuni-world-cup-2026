import { prisma } from "../lib/prisma.js";

export default {
    async create(parsedData, ownerId) {
        return await prisma.match.create({
            data: {
                ...parsedData,
                ownerId
            }

        });
    },

    async getAll() {
        return await prisma.match.findMany({
            select: {
                homeTeam: true,
                awayTeam: true,
                homeGoals: true,
                awayGoals: true,
                stage: true,
                imageUrl: true
            }
        });
    }
}