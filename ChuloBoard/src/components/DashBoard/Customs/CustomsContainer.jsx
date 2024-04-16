import { useCallback, useEffect, useState } from "react";
import Customs from "./Customs";
import axios from "axios";
import {useModal} from "../../../hooks/useModal";
import {useAlert} from "../../../hooks/useAlert";
import {Alert} from "../../Utils/Alert";
import {AlertSuccess} from "../../Utils/AlertSuccess";
import CreateModal from "./Modals/CreateModal";
import userlevels from "../../../assets/allowedUserlevels.json";
import EditModal from "./Modals/EditModal";
import DeleteModal from "./Modals/DeleteModal";
import { useUser } from "../../../hooks/useUser";
function CustomContainer() {
    const user = useUser();
    const [commands, setCommands] = useState([]);
    const [createModal, openCreateModal, closeCreateModal] = useModal(false);
    const [editModal, openEditModal, closeEditModal] = useModal(false);
    const [deleteModal, openDeleteModal, closeDeleteModal] = useModal(false);
    const [errorAlert, openErrorAlert, closeErrorAlert] = useAlert(false);
    const [successAlert, openSuccessAlert, closeSuccessAlert] = useAlert(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [index, setIndex] = useState(0);
    const [command, setCommand] = useState({
        name: "",
        message: "",
        cooldown: 5,
        userlevel: "Cualquiera"
    });

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        axios.get(`${import.meta.env.VITE_API_URL}customs/commands`, {signal}).then(res => {
            setCommands(res.data);
        }).catch(error => {
            if(error.response) {
                return;
            }
        });

        return () => controller.abort();
    }, []);

    const changeStatus = useCallback((index) => {
        if(commands[index].status) {
            axios.patch(`${import.meta.env.VITE_API_URL}customs/commands?name=${commands[index].name}`, {
                status: 0
            }).then(res => {
                getCommands();
            }).catch(error => {
                setError("Hubo un error al intentar cambiar el estado del comando");
                openErrorAlert();
            });
        } else {
            axios.patch(`${import.meta.env.VITE_API_URL}customs/commands?name=${commands[index].name}`, {
                status: 1
            }).then(res => {
                getCommands();
            }).catch(error => {
                setError("Hubo un error al intentar cambiar el estado del comando");
                openErrorAlert();
            });
        }
    }, [commands]);

    function validateCommand() {
        if(command.name.trim().length <= 0) {
            setError("El comando necesita un nombre");
            openErrorAlert();
            return false;
        }
        if(command.message.trim().length <= 0) {
            setError("El campo mensaje no puede estar vacio");
            openErrorAlert();
            return false;
        }
        if(command.message.length > 400) {
            setError("El mensaje no puede tener mas de 400 carácteres");
            openErrorAlert();
            return false;
        }
        if(command.cooldown < 5 && command.cooldown > 300) {
            setError("El cooldown debe estar entre 5 y 300 segundos");
            openErrorAlert();
            return false;
        }
        if(!userlevels.includes(command.userlevel)) {
            setError("El nivel de usuario seleccionado no es válido");
            openErrorAlert();
            return false;
        }
        return true;
    }

    const addCommand = useCallback((event) => {
        event.preventDefault();
        if(!validateCommand()) return;
        axios.post(`${import.meta.env.VITE_API_URL}customs/commands`, command).then(res => {
            getCommands();
            resetCommandState();
            closeCreateModal();
            setMessage("Comando creado correctamente");
            openSuccessAlert();
        }).catch(error => {
            setError("Hubo un error al intentar crear el comando");
            openErrorAlert();
        });
    }, [command]);
    
    const updateCommand = useCallback((event) => {
        event.preventDefault();
        if(!validateCommand()) return;
        axios.patch(`${import.meta.env.VITE_API_URL}customs/commands?name=${commands[index].name}`, command).then(res => {
            getCommands();
            resetCommandState();
            closeEditModal();
            setMessage("Comando actualizado correctamente");
            openSuccessAlert();
        }).catch(error => {
            setError("Hubo un error al intentar actualizar el comando");
            openErrorAlert();
        });
    }, [command, commands, index]);

    const deleteCommand = useCallback((event) => {
        event.preventDefault();
        axios.delete(`${import.meta.env.VITE_API_URL}customs/commands?name=${commands[index].name}`).then(res => {
            getCommands();
            resetCommandState();
            closeDeleteModal();
            setMessage(`Comando "${commands[index].name}" eliminado`);
            openSuccessAlert();
        }).catch(error => {
            setError("Hubo un error al intentar eliminar el comando");
            openErrorAlert();
        });
    }, [commands, index]);
    function getCommands() {
        axios.get(`${import.meta.env.VITE_API_URL}customs/commands`).then(res => {
            setCommands(res.data);
        }).catch(error => {
            return;
        });   
    }

    const resetCommandState = useCallback(() => {
        setCommand({
            name: "",
            message: "",
            cooldown: 5,
            userlevel: "Cualquiera"
        });
    });
    
    const openEdit = useCallback((index) =>  {
        setIndex(index);
        setCommand({
            name: commands[index].name,
            message: commands[index].message,
            cooldown: commands[index].cooldown,
            userlevel: commands[index].userlevel
        });
        openEditModal();
    }, [commands]);
    const openDelete = useCallback((index) =>  {
        setIndex(index);
        setCommand({
            name: commands[index].name,
            message: commands[index].message,
            cooldown: commands[index].cooldown,
            userlevel: commands[index].userlevel
        });
        openDeleteModal();
    }, [commands]);
    return(
        <>
            {
                createModal && <CreateModal command={command} setCommand={setCommand} closeCreateModal={closeCreateModal} addCommand={addCommand} resetCommandState={resetCommandState}/>
            }
            {
                editModal && <EditModal command={command} setCommand={setCommand} closeEditModal={closeEditModal} resetCommandState={resetCommandState} updateCommand={updateCommand}/>
            }
            {
                deleteModal && <DeleteModal command={command} resetCommandState={resetCommandState} closeDeleteModal={closeDeleteModal} deleteCommand={deleteCommand}/>
            }
            {
                errorAlert && <Alert error={error} closeAlert={closeErrorAlert}/>
            }
            {
                successAlert && <AlertSuccess message={message} closeAlert={closeSuccessAlert}/>
            }
            <Customs commands={commands} changeStatus={changeStatus} openCreateModal={openCreateModal} openEdit={openEdit} openDelete={openDelete}/>
        </>
    )
}
export default CustomContainer;