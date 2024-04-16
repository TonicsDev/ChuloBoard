import { IoMdAdd, IoMdSettings, IoMdTrash } from "react-icons/io";
import {FaForward, FaPause, FaPlay, FaVolumeUp} from "react-icons/fa";
function MusicControls({duration, progress, volume, openRequestModal, openClearModal, setVolume, togglePlay, isPlaying, controlProgress, nextSong, openConfigModal}) {
    function formatTime(time) {
        const seconds = Math.floor(time % 60);
        const minutes = Math.floor(time / 60);

        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return(
        <div className="music-controls">
            <div className="music-header">
                <h3 className="header-title">
                    Reproductor
                </h3>
                <div className="music-buttons">
                    <button className="music-button" onClick={openRequestModal}>
                        <div className="icon">
                            <IoMdAdd/>
                        </div>
                        Agregar
                    </button>
                    <button className="music-button" onClick={openClearModal}>
                        <div className="icon">
                            <IoMdTrash/>
                        </div>
                         Limpiar lista
                    </button>
                    <button className="music-button" onClick={openConfigModal}>
                        <div className="icon">
                            <IoMdSettings/>
                        </div>
                         Configuración
                    </button>
                </div>
            </div>
            <div className="controls-box">
                <div className="buttons-controls">
                    <button className="play-btn" onClick={togglePlay}>
                        {isPlaying ? <FaPause/> : <FaPlay/>}
                    </button>
                    <button className="next-btn" onClick={nextSong}>
                        <FaForward/>
                    </button>
                </div>
                <div className="progress-container">
                    <span className="progress-time">
                       {formatTime(progress)}
                    </span>
                    <div className="progress-box">
                        <div className="progress">
                            <div className="progress-fill" style={{width: `${progress / duration * 100}%`}}></div>
                        </div>
                        <input type="range" name="progress" id="progress" step={0.01} min={0} max={duration} value={progress} className="progress-input" onChange={controlProgress}/>
                    </div>
                    <span className="duration-time">
                        {formatTime(duration)}
                    </span>
                </div>
                <div className="volume-container">
                    <div className="volume-icon">
                        <FaVolumeUp/>
                    </div>
                    <div className="volume-box">
                        <input type="range" name="volume" id="volume" className="volume-input" value={volume} step={0.01} min={0} max={1} onChange={(e) => setVolume(Number.parseFloat(e.target.value))}/>
                        <div className="volume-bar">
                            <div className="volume-fill" style={{width: `${volume * 100}%`}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicControls;