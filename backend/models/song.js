import zod from "zod";

const songModel = zod.object({
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
    duration: zod.string({
        invalid_type_error: "The duration must be string",
        required_error: "The duration field is required",
    }).length(5),
    user: zod.string({
        invalid_type_error: "The user must be string",
        required_error: "The user field is required",
    }).regex(/[A-Za-z0-9_]/)
});

function validateSong(object) {
    return songModel.safeParse(object);
}

function validatePartialSong(object) {
    return songModel.partial().safeParse(object)
}


export {songModel, validateSong, validatePartialSong}