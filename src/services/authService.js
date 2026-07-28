import userRepository from "../repositories/userRepository.js"
import bcrypt from "bcrypt";

export default {
    async register(parsedUserData) {
        const user = await userRepository.create(parsedUserData);

        return user;
    },

    async login(userData) {
        const { email, password } = userData;

        const user = await userRepository.getUserByEmail(email);

        if (!user) {
            throw new Error("Invalid email or password");
        };

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        };

        return user;
    }
}