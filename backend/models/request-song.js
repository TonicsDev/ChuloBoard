import zod from "zod";

const requestSongModel = zod.object({
    url: zod.string({
        invalid_type_error: "The url must be a string",
        required_error: "The url field its required"
    }).max(72).regex(/https:\/\/www.youtube.com\/watch\?v=[a-zA-Z0-9_-]{11}|https:\/\/www.youtube.com\/playlist\?list=[a-zA-Z0-9_-]{34}/, "its not valid youtube url"),
    user: zod.string({
        invalid_type_error: "The user must be a string",
        required_error: "The user field its required"
    }).max(25).min(4).regex(/^[a-z]{4,25}$/)
});

function validateRequestSong(object) {
    return requestSongModel.safeParse(object);
}

function validatePartialRequestSong(object) {
    return requestSongModel.partial().safeParse(object);
}


export {requestSongModel, validateRequestSong, validatePartialRequestSong};