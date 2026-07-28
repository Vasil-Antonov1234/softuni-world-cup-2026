import * as z from "zod";
import bcrypt from "bcrypt";

export const createUserSchema = z.object({
    email: z.email({ error: "Invalid email address"}),
    password: z.string()
        .min(1, { error: "Password is required"}),
    rePassword: z.string()
        .refine((data => data.password === data.rePassword), { error: "Passwords missmatch", path: ["password"]})
        .min(1, { error: "Repeat passwors is required"})
}).transform(async({rePassword, ... data}) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return { ...data, password: hashedPassword }
})