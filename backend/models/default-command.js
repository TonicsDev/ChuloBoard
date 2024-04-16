import zod from "zod";

const defaultCommand = zod.object({
    userlevel: zod.enum(['Propietario', 'Moderador', 'Subscriptor', 'VIP', 'Cualquiera'], {
        invalid_type_error: "The given userlevel is not valid",
        required_error: "The userlevel field is required"
    }),
    cooldown: zod.number({
        invalid_type_error: "The cooldown must be a number",
        required_error: "The cooldown field is required",
    }).int().positive().max(300).min(5),
    queueMax: zod.number({
        invalid_type_error: "The queueMax must be a number",
        required_error: "The queueMax field is required",
    }).int().nonnegative().max(500),
    status: zod.number().nonnegative().min(0).max(1).optional()
});

function validateCommand(object) {
    return defaultCommand.safeParse(object);
}

function validatePartialCommand(object) {
    return defaultCommand.partial().safeParse(object)
}


export {defaultCommand, validateCommand, validatePartialCommand}