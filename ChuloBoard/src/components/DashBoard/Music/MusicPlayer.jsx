import ReactPlayer from "react-player";
import { FiLink, FiUser } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import placeholder from "../../../assets/placeholder.png";
function MusicPlayer({song, setDuration, setProgress, volume, isPlaying, setIsPlaying, videoRef, nextSong}) {
    function handleProgress(event) {
        const progress = event.playedSeconds;
        setProgress(Number.parseFloat(progress));
    }
    return(
        <div className="music-player">
            <div className="player-container">
                {
                    song?.url ? 
                    <ReactPlayer width={"100%"} height={"100%"} ref={videoRef} url={song?.url} playing={isPlaying} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onDuration={setDuration} onProgress={handleProgress} onEnded={nextSong} volume={volume} controls/>
                    :
                    ""
                }
                
            </div>
            <div className="song-info">
                <h3 className="song-title">
                    {song?.title ? song.title : "titulo de la canción"}
                </h3>
                <div className="info-container">
                    <div className="icon">
                        <MdAccessTime/>
                    </div>
                    <span className="text-info">
                        {song?.duration ? song.duration : "00:00"}
                    </span>
                </div>
                <div className="info-container">
                    <div className="icon">
                        <FiLink/>
                    </div>
                    <a className="link-info" href={song?.url ? song?.url : "https://www.youtube.com"}>
                        {song?.url ? song.url : "https://www.youtube.com"}
                    </a>
                </div>
                <div className="info-container">
                    <div className="icon">
                        <FiUser/>
                    </div>
                    <span className="text-info">
                        {song?.user ? song.user : "usuario"}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer;