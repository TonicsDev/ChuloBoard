import { useParams } from "react-router-dom"
import Commands from "./Commands";
import { useEffect, useState } from "react";
import axios from "axios";

function CommandsContainer() {
    const params = useParams();
    const [commands, setCommands] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        axios.get(`${import.meta.env.VITE_API_URL}customs/commands`, {signal}).then(res => {
            setCommands(res.data);
        }).catch(error => {
            return;
        });

        return () => controller.abort();
    }, []);

    return(
        <>
            <Commands commands={commands}/>
        </>
    )
}

export default CommandsContainer;