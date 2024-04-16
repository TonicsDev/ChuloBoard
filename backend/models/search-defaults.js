import zod from "zod";

const defaultFilters = zod.object({
    name: zod.string({
        invalid_type_error: "Tha name must be a string",
        required_error: "the name field its required"
    }).regex(/[A-Za-z0-9\!_]/),
    userlevel: zod.enum(['Propietario', 'Moderador', 'Subscriptor', 'VIP', 'Cualquiera'], {
        invalid_type_error: "The given userlevel is not valid",
        required_error: "The userlevel field is required"
    }),
    status: zod.string({
        invalid_type_error: "Tha status must be a string",
        required_error: "the status field its required"
    }).regex(/[0-9]{1}/)
});

function validatePartialdefaultFilters(object) {
    return defaultFilters.partial().safeParse(object);
}

export {defaultFilters, validatePartialdefaultFilters}