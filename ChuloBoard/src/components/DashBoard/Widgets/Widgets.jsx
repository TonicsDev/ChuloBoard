import { useRef } from "react";
import chuloIcon from "../../../assets/shiba.gif";
import axios from "axios";
import useCopyField from "../../../hooks/useCopyField";



function Widgets({widgets, setMessage, openSuccessAlert, setError, openErrorAlert, getWidgets}) {
    const [guauRef, copyGuauURL] = useCopyField(setMessage, openSuccessAlert);

    function changeUrl(event) {
        const widgetName = event.currentTarget.id;
        axios.patch(`${import.meta.env.VITE_API_URL}widgets?name=${widgetName}`).then(res => {
            setMessage("URL actualizada");
            openSuccessAlert();
            getWidgets();
        }).catch(error => {
            setError("Hubo un error al cambiar la URL");
            openErrorAlert();
        });
    }
    return(
        <div className="widgets">
            <div className="widgets-container">
                <div className="widget-card">
                    <div className="image-box">
                        <img src={chuloIcon} alt="widget-icon" className="icon" />
                    </div>
                    <div className="info">
                        <h3 className="widget-title">
                            Guau
                        </h3>
                        <span className="widget-description">
                            Coloca la url en tu OBS para que al ejecutar el comando !guau se reproduzca el sonido.
                        </span>
                        <div className="input-group">
                            <input type="text" ref={guauRef} name="url" id="url" className="input-text" readOnly value={`${import.meta.env.VITE_URL}/guau/${widgets[0]?.widget_id}`}/>
                            <div className="button-container">
                                <button className="button-input copy" onClick={copyGuauURL}>
                                    Copiar
                                </button>
                                <button className="button-input reset" id="guau_widget" onClick={changeUrl}>
                                    Cambiar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Widgets;