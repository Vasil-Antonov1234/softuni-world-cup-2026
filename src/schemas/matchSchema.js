import * as z from "zod";

export const createMatchSchema = z.object({
    homeTeam: z.string()
        .min(2, { error: "Home team name must be at least 2 characters long" }),
    awayTeam: z.string()
        .min(2, { error: "Away team name must be at least 2 characters long" }),
    homeGoals: z.coerce.number({ error: "invalid input" })
        .int({ error: "Goals must be an integer" })
        .nonnegative({ error: "Goals must be positive number" }),
    awayGoals: z.coerce.number({ error: "invalid input" })
        .int({ error: "Goals must be an integer" })
        .nonnegative({ error: "Goals must be positive number" }),
    stage: z.enum(["Group Stage", "Round of 16", "Quarter-final", "Semi-final", "Final"], { error: "Invalid stage"}),
    venue: z.string()
        .min(5, { error: "Venue must be at least 5 characters long" }),
    date: z.string()
        .nonoptional({ error: "Date is required" }),
    imageUrl: z.url({ error: "Invalid URL format"} )
        .nonoptional({ error: "Image URL is required"} ),
    description: z.string()
        .min(10, { error: "Description must be at least 10 characters long" })
})