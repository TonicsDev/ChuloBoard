import zod from "zod";


const imageModel = zod.object({
    name: zod.string({
        invalid_type_error: "name must be a string",
        required_error: "name field its required"
    }).min(1).max(50),
    image: zod.string({
        invalid_type_error: "image must be a string",
        required_error: "image field its required"
    }).min(1).refine(async (check) => {
        const [header, base64Data] = check.split(',');
        const result = await zod.string().base64().safeParseAsync(base64Data); 
        if(result.error) return false;
        const mimeType = header.match(/:(.*?);/)[1];
        const imageExtension = mimeType.split("/")[0];

        if(imageExtension === "image") return true;
        return false;
    }, {message: "image must be a base64 string"})
});

async function verifyImageModel(object) {
    return await imageModel.safeParseAsync(object);
}

export {verifyImageModel}