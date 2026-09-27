import z from "zod";

export const packageSchema = z.object({
    name:
        z.string()
            .min(1, "Package name is required"),

    price:
        z.number({ error: "Enter a number" })
            .positive("Price must be greater than 0"),

    offerPrice:
        z.number()
            .optional(),

    category:
        z.enum(["LABORATOEY", "RADIOLOGY"], { error: "Select a category" }),

    description:
        z.string()
            .nullable()
            .optional(),

    preparation:
        z.string(),

    isPopular:
        z.boolean()
            .optional(),

            tests:
            z.array(z.string())
            .min(2,"Add at least 2 tests")
})