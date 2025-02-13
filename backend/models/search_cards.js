import zod from "zod";

const searchCardsModel = zod.object({
    id: zod.string({
        required_error: "id field is required",
        invalid_type_error: "id field must be a string"
    }).uuid(),
    title: zod.string({
        required_error: "name field is required",
        invalid_type_error: "name field must be a string"
    }).regex(/[A-Za-z0-9\!_]/).max(20),
    description: zod.string({
        required_error: "description field is required",
        invalid_type_error: "description field must be a string"
    }).regex(/[A-Za-z0-9\!_]/).max(25),
    tier: zod.enum(['s', 'a', 'b', 'c'], {
        invalid_type_error: "tier field must be a string",
        required_error: "tier field is required"
    })
});


function validCardFilters(object) {
    return searchCardsModel.partial().safeParse(object);
}

export {validCardFilters};