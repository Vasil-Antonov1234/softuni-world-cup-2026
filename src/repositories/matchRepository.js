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
                id: true,
                homeTeam: true,
                awayTeam: true,
                homeGoals: true,
                awayGoals: true,
                stage: true,
                imageUrl: true
            }
        });
    },

    async getById(matchId) {
        return await prisma.match.findUnique({
            where: {
                id: matchId
            }
        })
    }
}