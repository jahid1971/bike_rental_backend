
import { z } from "zod";

const rentalSchema = z.object({
    bikeId: z.string(),
    startTime: z.string().transform((str) => new Date(str)),
});

export const rentalValidation = {
    rentalSchema,
};
