import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useFieldNumber from "../../../../hooks/useFieldNumber";
import useField from "../../../../hooks/useField";
function ConfigModal({config, setConfig, closeConfigModal, getConfig, updateConfig}) {
    const control = useAnimation();
    const queueLimitHandler = useFieldNumber({type: "number", key: "queue_limit", min: 1, max: 50}, setConfig, config);
    const userLimitHandler = useFieldNumber({type: "number", key: "user_limit", min: 1, max: 50}, setConfig, config);
    const minLkesHandler = useFieldNumber({type: "number", key: "min_likes", min: 0, max: 100000}, setConfig, config);
    const userlevelHandler = useField({type: "text", key: "userlevel"}, setConfig, config);
    const exceptLevelHandler = useField({type: "text", key: "except_level"}, setConfig, config);

    const variants = {
        openAnim: {
            opacity: [0, 1],
            y: [-100, 0],
            transition: {
                duration: 0.3
            }
        },

        closeAnim: {
            opacity: [1, 0],
            y: [0, -100],
            transition: {
                duration: 0.2
            }
        }
    }
    //Ejecutar animación al montar el componente
    useEffect(() => {
        control.start("openAnim");

        return () => control.stop();
    }, []);

    //activar la animación de cierre
    function closeAnimation() {
        control.start("closeAnim");
    }

    //Cerrar el modal al terminar la animación
    function closeModal(anim) {
        if(anim === "closeAnim") {
            getConfig();
            closeConfigModal();
        }
    }
    return(
        <div className="modal">
            <motion.form className="modal-container" variants={variants} animate={control} onAnimationComplete={anim => closeModal(anim)} onSubmit={updateConfig}>
                <div className="modal-header">
                    <h3 className="modal-title">
                        Configuración
                    </h3>
                    <div className="close" onClick={closeAnimation}>
                      <AiOutlineClose/>  
                    </div>
                </div>
                <div className="modal-body">
                    <div className="modal-form">
                        <div className="input-group">
                            <label htmlFor="queue_limit" className="input-label">Limite de canciones</label>
                            <div className="input-container">
                                <input className="text-input" id="queue_limit" {...queueLimitHandler} value={config.queue_limit}/>
                                <span className="description-input">
                                    Limite de canciones que puede haber en la lista de reproducción
                                </span>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="user_limit" className="input-label">Canciones por usuario</label>
                            <div className="input-container">
                                <input className="text-input" id="user_limit" {...userLimitHandler} value={config.user_limit}/>
                                <span className="description-input">
                                    Limite de canciones que puede pedir un mismo usuario
                                </span>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="user_limit" className="input-label">Nivel de usuario</label>
                            <div className="input-container">
                                <select className="select-input" id="user_limit" onChange={userlevelHandler.onChange} value={config.userlevel}>
                                    <option value="Propietario">Propietario</option>
                                    <option value="Moderador">Moderador</option>
                                    <option value="Subscriptor">Subscriptor</option>
                                    <option value="VIP">VIP</option>
                                    <option value="Cualquiera">Cualquiera</option>
                                </select>
                                <span className="description-input">
                                    Nivel de usuario requerido para agregar canciones a la lista de reproducción
                                </span>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="except_level" className="input-label">Excepción</label>
                            <div className="input-container">
                                <select className="select-input" id="except_level" onChange={exceptLevelHandler.onChange} value={config.except_level}>
                                    <option value="Propietario">Propietario</option>
                                    <option value="Moderador">Moderador</option>
                                    <option value="Subscriptor">Subscriptor</option>
                                    <option value="VIP">VIP</option>
                                    <option value="Cualquiera">Cualquiera</option>
                                </select>
                                <span className="description-input">
                                    Nivel de usuario que puede saltarse las reglas del reproductor
                                </span>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="user_limit" className="input-label">Minimo de likes</label>
                            <div className="input-container">
                                <input className="text-input" id="user_limit" {...minLkesHandler} value={config.min_likes}/>
                                <span className="description-input">
                                    Minimo de likes que requiere una canción para ser agregada a la lista de reproducción
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="button-group">
                        <button className="button-input">
                            Guardar
                        </button>
                    </div>
                </div>
            </motion.form>
        </div>
    )
}

export default ConfigModal;