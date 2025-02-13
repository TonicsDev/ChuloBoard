import zod from "zod";
import dotenv from "dotenv";
dotenv.config();
const isValidUrl = new RegExp(`^${process.env.CDN_URL}\/.*`);
const cardModel = zod.object({
    title: zod.string({
        invalid_type_error: "title must be a string",
        required_error: "title field its required"
    }).min(1).max(20),
    description: zod.string({
        invalid_type_error: "description must be a string",
        required_error: "description field its required"
    }).max(25),
    tier: zod.enum(['s', 'a', 'b', 'c']),
    image: zod.string({
        invalid_type_error: "image must be a string",
        required_error: "image field its required"
    }).min(1).regex(isValidUrl, {
        message: "its not valid url"
    })
})

async function verifyCardModel(object) {
    return await cardModel.safeParseAsync(object);
}

export {verifyCardModel}