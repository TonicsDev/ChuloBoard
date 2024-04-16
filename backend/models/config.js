import zod from "zod";

const configModel = zod.object({
    queue_limit: zod.number({
        invalid_type_error: "The queue_limit must be a number",
        required_error: "The queue_limit field is required",
    }).int().positive().max(50),
    user_limit: zod.number({
        invalid_type_error: "The user_limit must be number",
        required_error: "The user_limit field is required",
    }).int().positive().max(50),
    userlevel: zod.enum(['Propietario', 'Moderador', 'Subscriptor', 'VIP', 'Cualquiera'],
    {
        invalid_type_error: "userlevel not valid",
        required_error: "The userlevel field is required",
    }),
    except_level: zod.enum(['Propietario', 'Moderador', 'Subscriptor', 'VIP', 'Cualquiera'],
    {
        invalid_type_error: "except_level not valid",
        required_error: "The except_level field is required",
    }),
    min_likes: zod.number({
        invalid_type_error: "The min_likes must be a number",
        required_error: "The min_likes field is required",
    })
});

function validateConfig(object) {
    return configModel.safeParse(object);
}

function validatePartialConfig(object) {
    return configModel.partial().safeParse(object)
}


export {configModel, validateConfig, validatePartialConfig}