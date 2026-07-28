import * as z from "zod";

export const createMatchSchema = z.object({
    homeTeam: z.string()
        .min(1, { error: "Home team is required" }),
    awayTeam: z.string()
        .min(1, { error: "Away team is required" }),
    homeGoals: z.coerce.number({ error: "invalid input" })
        .int({ error: "Goals must be an integer" })
        .nonnegative({ error: "Goals must be positive number" }),
    awayGoals: z.coerce.number({ error: "invalid input" })
        .int({ error: "Goals must be an integer" })
        .nonnegative({ error: "Goals must be positive number" }),
    stage: z.enum(["Group Stage", "Round of 16", "Quarter-final", "Semi-final", "Final"], { error: "Invalid stage"}),
    venue: z.string()
        .min(1, { error: "Venue is required" }),
    date: z.string()
        .nonoptional({ error: "Date is required" }),
    imageUrl: z.url({ error: "Invalid URL format"} )
        .nonoptional({ error: "Image URL is required"} ),
    description: z.string()
        .min(1, { error: "Description is required" })
})