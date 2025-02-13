import zod from "zod";

const cardModel = zod.object({
    id: zod.string({
        invalid_type_error: "id must be a string",
        required_error: "The id field its required"
    })
});

async function verifyDeleteCardModel(object) {
    return await cardModel.safeParseAsync(object);
}

export {verifyDeleteCardModel}