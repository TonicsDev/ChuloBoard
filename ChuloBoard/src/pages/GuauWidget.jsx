import { useEffect, useRef, useState } from "react";
import bark from "../assets/guau.wav";
import {useParams} from "react-router-dom";
import axios from "axios";
import { useAlert } from "../hooks/useAlert";
import Bottleneck from "bottleneck";
import { Alert } from "../components/Utils/Alert";
import { socket } from "../client/WebSocket";
function GuauWidget() {
    const audioRef = useRef(null);
    const [config, setConfig] = useState({
        cooldown: 0,
        limit: false
    });
    const params = useParams();
    const [error, setError] = useState("");
    const [limiter, setLimiter] = useState(null);
    const [isOpenErrorAlert, openErrorAlert, closeErrorAlert] = useAlert(false);
    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;

        axios.get(`${import.meta.env.VITE_API_URL}defaults/commands?name=!guau`, {signal}).then(res => {
            setConfig({
                cooldown: res.data[0].cooldown,
                limit: res.data[0].queueMax
            });

            setLimiter(new Bottleneck({
                maxConcurrent: 1,
                minTime: res.data[0].cooldown,
                highWater: res.data[0].queueMax ? res.data[0].queueMax : null
            }));
        }).catch(error => {
            if(error.response) {
                setError("No se ha podido cargar el comando");
                openErrorAlert();
            }
        });
        socket.emit("join-channel", import.meta.env.VITE_CHANNEL + params.id);
    }, []);

    useEffect(() => {
        socket.on("guau-alert", async () => {
            audioRef.current.play();
            console.log("si");
        });
    }, [socket]);
    return(
        <div className="widget">
            <audio src={bark} ref={audioRef}/>
            {isOpenErrorAlert && <Alert error={error} closeAlert={closeErrorAlert}/>}
        </div>
    )
}

export default GuauWidget;