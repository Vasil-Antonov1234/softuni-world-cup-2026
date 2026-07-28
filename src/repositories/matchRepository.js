import { prisma } from "../lib/prisma.js";

export default {
    async create(parsedData, ownerId) {
        return await prisma.match.create({
            data: {
                ...parsedData,
                ownerId
            }
        });
    }
}