import zod from "zod";

const configModel = zod.object({
    tier1: zod.object({
        legendary: zod.number({
            invalid_type_error: "legendary field must be a number",
        }).int().optional(),
        epic: zod.number({
            invalid_type_error: "epic field must be a number",
        }).int().optional(),
        rare: zod.number({
            invalid_type_error: "rare field must be a number",
        }).int().optional(),
        comun: zod.number({
            invalid_type_error: "comun field must be a number",
        }).int().optional()
    }),
    tier2: zod.object({
        legendary: zod.number({
            invalid_type_error: "legendary field must be a number",
        }).int().optional(),
        epic: zod.number({
            invalid_type_error: "epic field must be a number",
        }).int().optional(),
        rare: zod.number({
            invalid_type_error: "rare field must be a number",
        }).int().optional(),
        comun: zod.number({
            invalid_type_error: "comun field must be a number",
        }).int().optional()
    }),
    tier3: zod.object({
        legendary: zod.number({
            invalid_type_error: "legendary field must be a number",
        }).int().optional(),
        epic: zod.number({
            invalid_type_error: "epic field must be a number",
        }).int().optional(),
        rare: zod.number({
            invalid_type_error: "rare field must be a number",
        }).int().optional(),
        comun: zod.number({
            invalid_type_error: "comun field must be a number",
        }).int().optional()
    })
});


async function verifyUpdateConfigModel(object) {
    return await configModel.partial().safeParseAsync(object);
}

export {verifyUpdateConfigModel}