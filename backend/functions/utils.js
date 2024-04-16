import { validateConfig } from "../models/config.js"

function verifySong(config, song) {
    const result = validateConfig(config);
    if(result.error) return {success: false, type: "invalid_config", error: "Its not valid config"};
    const timeFormated = parseTime(song.duration);
    if(timeFormated.total > 10) return {success: false, type: "too_large", error: "The song exceeds the 10 minute limit"};
    if(Number.parseInt(song.likes) < result.data.min_likes) return {success: false, type: "insufficient_likes", error: `The song must have at least ${result.data.min_likes}`};
    return {success: true, error: null, type: null, duration: timeFormated}
}

function parseTime(time) {
    const duration = time.split('PT')[1];
    const Hrs = duration.match(/\d{1,2}H/) ?? "0H";
    const seconds = duration.match(/\d{1,2}S/) ?? "0S";
    const minutes = duration.match(/\d{1,2}M/) ?? "0M";
    const proof = Number.parseInt(Hrs[0].replace("H", "").trim()) || 0;
    const total = proof + Number.parseInt(minutes[0].replace("M", "").trim());
    return {
        minutes: minutes[0].replace("M", "").trim().padStart(2, "0"),
        seconds: seconds[0].replace("S", "").trim().padStart(2, "0"),
        total
    }
}

export {verifySong}