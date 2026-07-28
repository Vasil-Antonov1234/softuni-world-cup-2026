import matchRepository from "../repositories/matchRepository.js"

export default {
    async create(parsedData) {
        return await matchRepository.create(parsedData);
    }
}