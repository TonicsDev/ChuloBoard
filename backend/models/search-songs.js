import zod from "zod";
const filterParams = zod.object({
    position: zod.string({
        invalid_type_error: "The position field must be a string",
        required_error: "The position field is required"
    }).regex(/[0-9]{1,2}/),
    video_id: zod.string({
        invalid_type_error: "The video_id must be a string",
        required_error: "The video_id field is required",
    }).length(11),
    url: zod.string({
        invalid_type_error: "The url must be string",
        required_error: "The url field is required",
    }).length(43).regex(/https:\/\/www.youtube.com\/watch\?v=[a-zA-Z0-9_-]{11}/, "its not valid youtube url"),
    title: zod.string({
        invalid_type_error: "The title must be string",
        required_error: "The title field is required",
    }),
    artist: zod.string({
        invalid_type_error: "The artist must be string",
        required_error: "The artist field is required",
    }),
    user: zod.string({
        invalid_type_error: "The user must be string",
        required_error: "The user field is required",
    }).regex(/[A-Za-z0-9_]/)
});

function validateParams(object) {
    return filterParams.safeParse(object);
}

function validatePartialParams(object) {
    return filterParams.partial().safeParse(object)
}


export {filterParams, validateParams, validatePartialParams}