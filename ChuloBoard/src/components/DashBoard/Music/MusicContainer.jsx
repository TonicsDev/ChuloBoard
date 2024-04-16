import { useCallback, useEffect, useState } from "react";
import Music from "./Music";
import RequestModal from "./Modals/RequestModal";
import { useModal } from "../../../hooks/useModal";
import axios from "axios";
import { useAlert } from "../../../hooks/useAlert";
import { AlertSuccess } from "../../Utils/AlertSuccess";
import { Alert } from "../../Utils/Alert";
import ConfigModal from "./Modals/ConfigModal";
import ClearModal from "./Modals/ClearModal";
import { socket } from "../../../client/WebSocket";

function MusicContainer() {
    const [songs, setSongs] = useState([]);
    const [config, setConfig] = useState({});
    const [url,setUrl] = useState("");
    const [requestModal, openRequestModal, closeRequestModal] = useModal(false);
    const [configModal, openConfigModal, closeConfigModal] = useModal(false);
    const [clearModal, openClearModal, closeClearModal] = useModal(false);
    const [successAlert, openSuccessAlert, closeSuccessAlert] = useAlert(false);
    const [errorAlert, openErrorAlert, closeErrorAlert] = useAlert(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    useEffect(() => {
        const controllerSongs = new AbortController();
        const controllerConfig = new AbortController();
        const signalSongs = controllerSongs.signal;
        const signalConfig = controllerConfig.signal;
        axios.get(`${import.meta.env.VITE_API_URL}music/songs`, {signal: signalSongs}).then(res => {
            setSongs(res.data);
        }).catch(error => {
            return;
        });

        axios.get(`${import.meta.env.VITE_API_URL}music/config`, {signal: signalConfig}).then(res => {
            setConfig(res.data);
        }).catch(error => {
            return;
        });
        return () => {
            controllerSongs.abort();
            controllerConfig.abort();
        }
    }, []);

    useEffect(() => {
        socket.on('new-song', () => {
            getSongs();
        });

        return () => socket.offAny();
    }, [socket]);

    const addSong = useCallback((event) => {
        event.preventDefault();
        axios.post(`${import.meta.env.VITE_API_URL}music/songs`, {url, user: import.meta.env.VITE_USER}).then(res => {
            getSongs();
            closeRequestModal();
            resetURL();
            if(res.data.type === "individual_song") {
                setMessage(`${res.data.song.title} ha sido agregada a la lista de reproducción`);
            } else {
                setMessage(`La canciones de la playlist han sido agregadas`);
            }
            openSuccessAlert();
        }).catch(error => {
            if(error.response.status === 400) {
                const type = error.response.data.type;
                switch(type) {
                    case "song_exist":
                        setError("La canción ya se esta en la lista");
                        openErrorAlert();
                        break;
                    case "too_large":
                        setError("La canción excede el límite de 10 minutos");
                        openErrorAlert();
                        break;
                    case "invalid_url": 
                        setError("No es una url valida de youtube");
                        openErrorAlert();
                        break;
                    case "list_full":
                        setError("La lista de reproducción esta llena");
                        openErrorAlert();
                        break;
                    case "insufficient_likes": 
                        setError("La cancion no tiene suficientes likes");
                        openErrorAlert();
                        break;
                    case "songs_verification":
                        setError("Ninguna de las canciones de la playlist cumple con los requisitos para agregarse a la lista");
                        openErrorAlert();
                        break;
                }
            }
        });
    }, [url]);

    const promoteSong = useCallback((index) => {
        axios.patch(`${import.meta.env.VITE_API_URL}music/songs?position=${index}`).then(res => {
            getSongs();
        }).catch(error => {
            if(error.response.status === 400) {
                const type = error.response.data.type;
                switch(type) {
                    case "invalid_url": 
                        setError("No es una url valida de youtube");
                        openErrorAlert();
                        break;
                    case "required_error":
                        setError("El parametro position es requirido");
                        openErrorAlert();
                        break;
                    case "not_exist":
                        setError("La posición excede el numero de canciones o la posición no existe");
                        openErrorAlert();
                        break;
                }
            }
        });
    }, []);

    const deleteSong = useCallback((index) => {
        axios.delete(`${import.meta.env.VITE_API_URL}music/songs?position=${index}`).then(res => {
            getSongs();
        }).catch(error => {
            if(error.response.status === 400) {
                const {type} = error.response.data;
                switch(type) {
                    case "invalid_type":
                        setError("La posición debe ser un número");
                        openErrorAlert();
                        break;
                    case "not_exist":
                        setError("La posición excede el numero de canciones o la posición no existe");
                        openErrorAlert();
                        break;
                    case "required_error":
                        setError("El parametro position es requirido");
                        openErrorAlert();
                        break;                   
                }
            }
        });
    }, []);

    const updateConfig = useCallback((event) => {
        event.preventDefault();
        axios.patch(`${import.meta.env.VITE_API_URL}music/config`, config).then(res => {
            getConfig();
            closeConfigModal();
            setMessage("Configuración actualizada");
            openSuccessAlert();
        }).catch(error => {
            setError("Hubo un error al intentar actualizar la configuración");
            openErrorAlert();
        });
    }, [config]);

    const clearList = useCallback(() => {
        axios.delete(`${import.meta.env.VITE_API_URL}music/list`).then(res => {
            getSongs();
            closeClearModal();
            setMessage("La lista de reproducción ha sido limpiada");
            openSuccessAlert();
        }).catch(error => {
            setError("Hubo un error al limpiar la lista de reproducción");
            openErrorAlert();
        });
    }, []);

    function getSongs() {
        axios.get(`${import.meta.env.VITE_API_URL}music/songs`).then(res => {
            setSongs(res.data);
        }).catch(error => {
            return;
        });
    }
    const getConfig = useCallback(() => {
            axios.get(`${import.meta.env.VITE_API_URL}music/config`).then(res => {
                setConfig(res.data);
            }).catch(error => {
                return;
            });
    }, []);

    const resetURL = useCallback(() => {
        setUrl("");
    }, []);
    return(
        <>
            <Music songs={songs} openRequestModal={openRequestModal} deleteSong={deleteSong} openClearModal={openClearModal} promoteSong={promoteSong} openConfigModal={openConfigModal}/>
            {
                successAlert && <AlertSuccess message={message} closeAlert={closeSuccessAlert}/>
            }
            {
                errorAlert && <Alert error={error} closeAlert={closeErrorAlert}/>
            }
            {
                clearModal && <ClearModal clearList={clearList} closeClearModal={closeClearModal}/>
            }
            {
                requestModal && <RequestModal url={url} setUrl={setUrl} closeRequestModal={closeRequestModal} resetURL={resetURL} addSong={addSong}/>
            }
            {
                configModal && <ConfigModal config={config} updateConfig={updateConfig} setConfig={setConfig} closeConfigModal={closeConfigModal} getConfig={getConfig}/>
            }
        </>
    )
}
export default MusicContainer;