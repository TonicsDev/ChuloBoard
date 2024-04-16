import zod from "zod";

const eventModel = zod.object({
    message: zod.string({
        invalid_type_error: "The message must be a string",
        required_error: "The message field is required"
    }).max(400),
    cooldown: zod.number({
        invalid_type_error: "The cooldown must be a number",
        required_error: "The cooldown field is required",
    }).int().positive().max(300).min(5),
    queueMax: zod.number({
        invalid_type_error: "The queueMax must be a number",
        required_error: "The queueMax field is required",
    }).int().nonnegative().max(500),
    status: zod.number().nonnegative().min(0).max(1).optional(),
});

function validateEvent(object) {
    return eventModel.safeParse(object);
}

function validatePartialEvent(object) {
    return eventModel.partial().safeParse(object)
}


export {eventModel, validateEvent, validatePartialEvent}