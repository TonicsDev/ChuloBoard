import { useEffect, useState } from "react"
import Music from "./Music";
import axios from "axios";

function MusicContainer() {
    const [songs, setSongs] = useState([]);
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        axios.get(`${import.meta.env.VITE_API_URL}music/songs`, {signal}).then(res => {
            setSongs(res.data);
        }).catch(error => {
            return;
        });

        return () => controller.abort();
    }, []);
    return(
        <>
            <Music songs={songs}/>
        </>
    )
}

export default MusicContainer;