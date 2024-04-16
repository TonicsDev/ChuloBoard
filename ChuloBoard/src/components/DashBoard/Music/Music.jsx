import { useCallback, useState, useRef, useEffect } from "react";
import MusicControls from "./Modals/MusicControls";
import MusicPlayer from "./MusicPlayer";
import MusicList from "./MusicList";
import { socket } from "../../../client/WebSocket";

function Music({songs, openRequestModal, openConfigModal, openClearModal, deleteSong, promoteSong}) {
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        socket.on("play-music", () => {
            setIsPlaying(true);
        });

        socket.on("pause-music", () => {
            setIsPlaying(false);
        });

        socket.on("volume-music", (volume) => {
            setVolume(volume);
            socket.emit('notify-bot', `El volumen se cambió al ${volume*100}%`);
        })

        return () => socket.offAny();
    }, [socket]);
    const togglePlay = useCallback(() => {
        setIsPlaying(!isPlaying);
    }, [isPlaying]);
    function controlProgress(event) {
        const {value} = event.target;
        const video = videoRef.current;
        if(!video) return setProgress(Number.parseFloat(value));
        const player = video.getInternalPlayer();
        player.seekTo(value, "seconds");
    }
    const nextSong = useCallback(() => {
        deleteSong(1);
    }, []);
    return(
        <div className="music">
            <MusicControls openRequestModal={openRequestModal} openConfigModal={openConfigModal} openClearModal={openClearModal} setVolume={setVolume} volume={volume} togglePlay={togglePlay} isPlaying={isPlaying} progress={progress} duration={duration} controlProgress={controlProgress} nextSong={nextSong}/>
            <MusicPlayer song={songs[0]} setDuration={setDuration} setProgress={setProgress} volume={volume} isPlaying={isPlaying} setIsPlaying={setIsPlaying} videoRef={videoRef} nextSong={nextSong}/>
            <MusicList songs={songs} promoteSong={promoteSong} deleteSong={deleteSong}/>
        </div>
    )
}

export default Music;