import zod from "zod";
import dotenv from "dotenv";
dotenv.config();
const isValidUrl = new RegExp(`^${process.env.CDN_URL}\/.*`);
const cardModel = zod.object({
    id: zod.string({
        invalid_type_error: "id must be a string",
    }).uuid(),
    title: zod.string({
        invalid_type_error: "title must be a string",
    }).min(1).max(20).optional(),
    description: zod.string({
        invalid_type_error: "description must be a string",
        required_error: "description field its required"
    }).max(25).optional(),
    tier: zod.enum(['s', 'a', 'b', 'c']).optional(),
    image: zod.string({
        invalid_type_error: "image must be a string",
    }).min(1).regex(isValidUrl, {message: "its not valid url"}).optional()
})

async function verifyUpdateCardModel(object) {
    return await cardModel.safeParseAsync(object);
}

export {verifyUpdateCardModel}