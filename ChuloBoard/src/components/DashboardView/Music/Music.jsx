import CurrentSong from "./CurrentSong";
import MusicList from "./MusicList";

function Music({songs}) {
    return(
        <div className="music">
            <CurrentSong song={songs[0]}/>
            <MusicList songs={songs}/>
        </div>
    )
}

export default Music;