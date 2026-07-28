import matchRepository from "../repositories/matchRepository.js"

export default {
    async create(parsedData, ownerId) {
        return await matchRepository.create(parsedData, ownerId);
    }
}