import { useCallback, useEffect, useState } from "react";
import Widgets from "./Widgets";
import { useAlert } from "../../../hooks/useAlert";
import { Alert } from "../../Utils/Alert";
import {useUser} from "../../../hooks/useUser";
import { AlertSuccess } from "../../Utils/AlertSuccess";
import axios from "axios";

function WidgetsContainer() {
    const [widgets, setWidgets] = useState([]);
    const [errorAlert, openErrorAlert, closeErrorAlert] = useAlert(false);
    const [successAlert, openSuccessAlert, closeSuccessAlert] = useAlert(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const user = useUser();
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        axios.get(`${import.meta.env.VITE_API_URL}widgets`, {signal}).then(res => {
            setWidgets(res.data);
        }).catch(error => {
            return;
        });

        return () => controller.abort();
    }, []);

    const getWidgets = useCallback(() => {
        axios.get(`${import.meta.env.VITE_API_URL}widgets`).then(res => {
            setWidgets(res.data);
        }).catch(error => {
            return;
        });
    });
    return(
        <>
            <Widgets widgets={widgets} openSuccessAlert={openSuccessAlert} getWidgets={getWidgets} setMessage={setMessage} openErrorAlert={openErrorAlert} setError={setError}/>
            {errorAlert && <Alert error={error} closeAlert={closeErrorAlert}/>}
            {successAlert && <AlertSuccess message={message} closeAlert={closeSuccessAlert}/>}
        </>
    )
}

export default WidgetsContainer;