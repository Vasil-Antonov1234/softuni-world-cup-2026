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

    async getLastThree() {
        return await prisma.match.findMany({
            orderBy: {
                id: "desc"
            },
            select: {
                id: true,
                homeTeam: true,
                awayTeam: true,
                homeGoals: true,
                awayGoals: true,
                stage: true,
                imageUrl: true
            },
            take: 3
        })
    },

    async getById(matchId) {
        return await prisma.match.findUnique({
            where: {
                id: matchId
            },
            include: {
                likeBy: true
            }
        })
    },

    async update(matchData, matchId, userId) {

        return prisma.match.update({
            where: {
                id: matchId,
                ownerId: userId
            },
            data: {
                ...matchData
            }
        });
    },

    async like(matchId, userId) {
        return await prisma.match.update({
            where: {
                id: matchId
            },
            data: {
                likeBy: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
    },

    async remove(matchId) {        
        return await prisma.match.delete({
            where: {
                id: matchId
            }
        })
    }
}