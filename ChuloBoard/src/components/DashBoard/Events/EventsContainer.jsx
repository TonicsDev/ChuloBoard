import { useState, useCallback, useEffect } from "react";
import Events from "./Events";
import axios from "axios";
import {useModal} from "../../../hooks/useModal";
import {useAlert} from "../../../hooks/useAlert";
import {AlertSuccess} from "../../Utils/AlertSuccess";
import {Alert} from "../../Utils/Alert";
import EditModal from "./Modals/EditModal";
axios.defaults.withCredentials = true;
function EventsContainer() {
    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState({
        name: "",
        message: "",
        cooldown: 5,
        queueMax: 0,
    });
    const [index, setIndex] = useState(0);
    const [editModal, openEditModal, closeEditModal] = useModal(false);
    const [successAlert, openSuccessAlert, closeSuccessAlert] = useAlert(false);
    const [errorAlert, openErrorAlert, closeErrorAlert] = useAlert(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;
        axios.get(`${import.meta.env.VITE_API_URL}events`, {signal}).then(res => {
            setEvents(res.data);
        }).catch(error => {
            return;
        });

        return () => controller.abort();
    }, []);

    const changeStatus = useCallback((index) => {
        if(events[index].status) {
            axios.patch(`${import.meta.env.VITE_API_URL}events?name=${events[index].name}`, {status: 0}).then(res => {
                getEvents();
            }).catch(error => {
                setError("Hubo un error al desactivar el evento");
                openSuccessAlert();
            });
        } else {
            axios.patch(`${import.meta.env.VITE_API_URL}events?name=${events[index].name}`, {status: 1}).then(res => {
                getEvents();
            }).catch(error => {
                setError("Hubo un error al activar el evento");
                openErrorAlert();
            });
        }
    }, [events]);

    const updateEvent = useCallback((e) => {
        e.preventDefault();
        axios.patch(`${import.meta.env.VITE_API_URL}events?name=${events[index].name}`, event).then(res => {
            getEvents();
            closeEditModal();
            resetEventState();
            setMessage("Evento actualizado correctamente");
            openSuccessAlert();
        }).catch(error => {
            setError("Hubo un error al actualizar el evento");
            openErrorAlert();
        })
    }, [event, events, index]);

    function getEvents() {
        axios.get(`${import.meta.env.VITE_API_URL}events`).then(res => {
            setEvents(res.data);
        }).catch(error => {
            return;
        });
    }

    const resetEventState = useCallback(() => {
        setEvent({
            name: "",
            message: "",
            cooldown: 5,
            queueMax: 0
        });
    }, []);
    const openEdit = useCallback((index) => {
        setIndex(index);
        setEvent({
            name: events[index].name,
            message: events[index].message,
            cooldown: events[index].cooldown,
            queueMax: events[index].queueMax
        });
        openEditModal();
    }, [events]);

    return(
        <>
            <Events events={events} openEdit={openEdit} changeStatus={changeStatus}/>
            {successAlert && <AlertSuccess message={message} closeAlert={closeSuccessAlert}/>}
            {errorAlert && <Alert error={error} closeAlert={closeErrorAlert}/>}
            {editModal && <EditModal event={event} setEvent={setEvent} closeEditModal={closeEditModal} resetEventState={resetEventState} updateEvent={updateEvent}/>}
        </>
    )
}

export default EventsContainer;