import matchRepository from "../repositories/matchRepository.js"

export default {
    async create(parsedData, ownerId) {
        return await matchRepository.create(parsedData, ownerId);
    },

    async getAll() {
        return await matchRepository.getAll();
    },

    async getById(matchId) {
        return await matchRepository.getById(matchId);
    },

    async edit(parsedMatchData, matchId, userId) {
        return await matchRepository.update(parsedMatchData, matchId, userId);
    }
}