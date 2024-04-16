import zod from "zod";

const eventFilters = zod.object({
    name: zod.string({
        invalid_type_error: "The name must be a string",
        required_error: "The name field is required"
    }).max(400).regex(/[A-Za-z0-9\!_]/),
    event: zod.string({
        invalid_type_error: "The name must be a string",
        required_error: "The name field is required"
    }).regex(/[A-Za-z0-9]/),
    status: zod.string().regex(/[0-9]{1}/)
});

function validateEventsFilter(object) {
    return eventFilters.safeParse(object);
}

function validatePartialEventsFilter(object) {
    return eventFilters.partial().safeParse(object)
}


export {eventFilters, validateEventsFilter, validatePartialEventsFilter}