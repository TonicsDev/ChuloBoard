import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
function getSongByUrl(id) {
    return new Promise(async (resolve, reject) => {
        axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${process.env.YOUTUBE_KEY}`)
        .then((res) => {
            const items = res.data.items[0];
            const song = {
                videoId: items.id,
                title: items.snippet.title,
                artist: items.snippet.channelTitle,
                duration: items.contentDetails.duration,
                likes: items.statistics.likeCount
            }
            resolve(song);
        }).catch((err) => {
            reject("An error to search song");
        });
    });
}

async function getPlaylist(id) {
    return new Promise(async (resolve, reject) => {
        axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2C%20id&playlistId=${id}&key=${process.env.YOUTUBE_KEY}&maxResults=50`)
        .then(async (res) => {
            const videoIds = res.data.items.map(video => video.contentDetails.videoId).join(",");
            const videos = await getMultipleSongs(videoIds);
            resolve(videos);
        }).catch((error) => {
            reject("An error to search song");
        });
    });
}

function getSongByName() {

}

function getMultipleSongs(id) {
    return new Promise(async (resolve, reject) => {
        axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${process.env.YOUTUBE_KEY}&maxResults=50`)
        .then((res) => {
            const items = res.data.items;
            const songs = items.map(song => {
                return {
                    videoId: song.id,
                    title: song.snippet.title,
                    artist: song.snippet.channelTitle,
                    duration: song.contentDetails.duration,
                    likes: song.statistics.likeCount
                }
            });
            resolve(songs);
        }).catch((err) => {
            reject("An error to search song");
        });
    });
}

export {getSongByUrl, getPlaylist}