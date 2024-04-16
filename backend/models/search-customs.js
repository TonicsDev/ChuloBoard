import zod from "zod";

const customFilters = zod.object({
    name: zod.string({
        invalid_type_error: "name field must be string",
        required_error: "name field is required"
    }).regex(/[A-Za-z0-9\!_]/),
    userlevel: zod.enum(['Propietario', 'Moderador', 'Subscriptor', 'VIP', 'Cualquiera'], {
        invalid_type_error: "The given userlevel is not valid",
        required_error: "The userlevel field is required"
    }),
    status: zod.string({
        invalid_type_error: "status field must be string",
        required_error: "status field is required"
    }).regex(/[0-9]{1}/)
});

function validateCustomFilters(object) {
    return customFilters.partial().safeParse(object);
}

export {customFilters, validateCustomFilters}