import z from "zod";

export const testSchema = z.object({
        name:
            z.string()
                .min(1, "Test name is required"),

        price:
            z.number({ error: "Enter a number" })
                .positive("Price must be a greater than 0"),

        offerPrice:
            z.number()
                .optional(),

        category:
            z.enum(["LABORATORY", "RADIOLOGY"], { error: "select a category" }),

        isPopular:
            z.boolean()
                .optional(),

        relevance:
            z.array(z.string())
                .min(1, "Add at least one relevance"),

        preparation:
            z.string()
    })