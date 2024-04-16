import zod from "zod";

const customCommand = zod.object({
    name: zod.string({
        invalid_type_error: "The name must be a string",
        required_error: 'The name field is required'
    }).max(20).min(1).trim().regex(/[A-Za-z0-9\!_]/),
    message: zod.string({
        invalid_type_error: "The message must be a string",
        required_error: "The message field is required"
    }).max(400),
    userlevel: zod.enum(['Propietario', 'Moderador', 'Subscriptor', 'VIP', 'Cualquiera'], {
        invalid_type_error: "The given userlevel is not valid",
        required_error: "The userlevel field is required"
    }),
    cooldown: zod.number({
        invalid_type_error: "The cooldown must be a number",
        required_error: "The cooldown field is required",
    }).int().positive().max(300).min(5),
    status: zod.number().nonnegative().min(0).max(1).optional()
});

function validateCommand(object) {
    return customCommand.safeParse(object);
}

function validatePartialCommand(object) {
    return customCommand.partial().safeParse(object)
}


export {customCommand, validateCommand, validatePartialCommand}