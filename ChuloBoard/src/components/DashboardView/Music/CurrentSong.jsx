import { FiLink, FiUser } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";

function CurrentSong({song}) {
    return(
        <div className="music-player">
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

export default CurrentSong;