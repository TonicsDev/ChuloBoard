import { useState, useEffect, useCallback } from "react";
import Defaults from "./Defaults";
import axios from "axios";
import {useModal} from "../../../hooks/useModal";
import EditModal from "./Modals/EditModal";
import {useAlert} from "../../../hooks/useAlert";
import {Alert} from "../../Utils/Alert";
import {AlertSuccess} from "../../Utils/AlertSuccess";
import allowedUserlevels from "../../../assets/allowedUserlevels.json";
function DefaultsContainer() {
    const [defaults, setDefaults] = useState([]);
    const [command, setCommand] = useState({
        userlevel: "Cualquiera",
        cooldown: 5,
        queueMax: 0
    });
    const [index, setIndex] = useState(0);
    const [editModal, openEditModal, closeEditModal] = useModal(false);
    const [error, setError] = useState("");
    const [errorAlert, openErrorAlert, closeErrorAlert] = useAlert(false);
    const [message, setMessage] = useState("");
    const [successAlert, openSuccessAlert, closeSuccessAlert] = useAlert(false);
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        axios.get(`${import.meta.env.VITE_API_URL}defaults/commands`, {signal}).then(res => {
            setDefaults(res.data);
        }).catch(error => {
            return;
        });

        return () => controller.abort();
    }, []);

    function validateCommand() {
        if(!allowedUserlevels.includes(command.userlevel)) {
            setError("El nivel de usuario seleccionado no es válido");
            openErrorAlert();
            return false;
        }

        if(command.cooldown < 5 && command.cooldown > 300) {
            setError("El cooldown debe estar entre 5 y 300 segundos");
            openErrorAlert();
            return false;
        }
        return true;
    }

    function getCommands() {
        axios.get(`${import.meta.env.VITE_API_URL}defaults/commands`).then(res => {
            setDefaults(res.data);
        }).catch(error => {
            return;
        });
    }

    const updateCommand = useCallback((event) => {
        event.preventDefault();
        if(!validateCommand()) return;
        axios.patch(`${import.meta.env.VITE_API_URL}defaults/commands?name=${defaults[index].name}`, command).then(res => {
            getCommands();
            closeEditModal();
            setMessage(`Comando "${defaults[index].name}" actualizado correctamente`);
            openSuccessAlert();
            resetCommandState();
        }).catch(error => {
            setError("Hubo un error al intentar actualizar el comando");
            openErrorAlert();
        })
    }, [index, defaults, command]);

    const changeStatus = useCallback((index) => {
        if(defaults[index].status) {
            axios.patch(`${import.meta.env.VITE_API_URL}defaults/commands?name=${defaults[index].name}`, {
                status: 0
            }).then(res => {
                getCommands();
            }).catch(error => {
                setError("Hubo un error al intentar cambiar el estado del comando");
                openErrorAlert();
            });
        } else {
            axios.patch(`${import.meta.env.VITE_API_URL}defaults/commands?name=${defaults[index].name}`, {
                status: 1
            }).then(res => {
                getCommands();
            }).catch(error => {
                setError("Hubo un error al intentar cambiar el estado del comando");
                openErrorAlert();
            });
        }
    }, [defaults]);

    const resetCommandState = useCallback(() => {
        setCommand({
            userlevel: "Cualquiera",
            cooldown: 5,
            queueMax: 0
        });
    });

    const openEdit = useCallback((index) => {
        setIndex(index);
        setCommand({
            userlevel: defaults[index].userlevel,
            cooldown: defaults[index].cooldown,
            queueMax: defaults[index].queueMax
        });
        openEditModal();
    }, [defaults]);

    return(
        <>
            <Defaults defaults={defaults} openEdit={openEdit} changeStatus={changeStatus}/>
            {errorAlert && <Alert error={error} closeAlert={closeErrorAlert}/>}
            {successAlert && <AlertSuccess message={message} closeAlert={closeSuccessAlert}/>}
            {
                editModal && <EditModal command={command} setCommand={setCommand} closeEditModal={closeEditModal} resetCommandState={resetCommandState} updateCommand={updateCommand}/>
            }
        </>
    )
}

export default DefaultsContainer;