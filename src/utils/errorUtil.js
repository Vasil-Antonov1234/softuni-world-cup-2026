import * as z from "zod";
import { Prisma } from "../../generated/prisma/client.ts";

export function getErrorMessage(error) {
    let message = "";

    if (error instanceof z.ZodError) {
        const errors = z.flattenError(error).fieldErrors;
        message = Object.values(errors).flat()[0] || "Invalid input data";
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2002":
                message = "Unique constraint failed";
                break;
            case "P2003":
                message = "Foreign key constraint failed";
                break;
            default: message = "Database error";
        }
    } else {
        message = error.message || "Something went wrong!";
    };

    return message;
}