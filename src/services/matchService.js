import matchRepository from "../repositories/matchRepository.js"

export default {
    async create(parsedData, ownerId) {
        return await matchRepository.create(parsedData, ownerId);
    },

    async getAll() {
        return await matchRepository.getAll();
    },

    async getLastThree() {
        return await matchRepository.getLastThree();
    },

    async getById(matchId) {
        return await matchRepository.getById(matchId);
    },

    async edit(parsedMatchData, matchId, userId) {
        return await matchRepository.update(parsedMatchData, matchId, userId);
    },

    async like(matchId, userId) {
        return await matchRepository.like(matchId, userId);
    },

    async remove(matchId) {
        return await matchRepository.remove(matchId);
    }
}