import { useEffect, useCallback} from "react";
import {AiOutlineClose} from "react-icons/ai";
import { motion, useAnimation } from "framer-motion";
import {Configure} from "react-instantsearch-core";
import {AutoComplete} from "../../../Utils/AutoComplete";
import useAutoComplete from "../../../../hooks/useAutoComplete";
import useField from "../../../../hooks/useField";
import useFieldTrim from "../../../../hooks/useFieldTrim";
import useFieldNumber from "../../../../hooks/useFieldNumber";
export default function EditModal({event, setEvent, updateEvent, closeEditModal, resetEventState}) {
    const control = useAnimation();
    const eventMessage = useField({type: 'text', key: 'message'}, setEvent, event);
    const eventCooldown = useFieldNumber({type: 'range', key: 'cooldown', min: 5, max: 300}, setEvent, event);
    const eventQueueMax = useFieldNumber({type: 'number', key: 'queueMax', min: 0, max: 500}, setEvent, event);
    const [messageRef, openAutoComplete, handleInput, handleSelection] = useAutoComplete(useCallback((variableHandle) => {
        setEvent({
            ...event,
            message: variableHandle
        })
    }, [event]))
    //Animaciones
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
            resetEventState();
            closeEditModal();
        }
    }

    return(
        <div className="modal">
            <Configure facets={["*"]} facetFilters={[[`category:Events`, `category:${event.name}`, `category:${event.event}`]]}/>
            <motion.form className="modal-container" animate={control} onSubmit={updateEvent} variants={variants} onAnimationComplete={anim => closeModal(anim)}>
                <div className="modal-header">
                    <h3 className="modal-title">Editar Evento: {event?.name}</h3>
                    <div className="close" onClick={closeAnimation}>
                        <AiOutlineClose/>
                    </div>
                </div>
                <div className="modal-body">
                    <div className="modal-form">
                        <div className="input-group">
                            <label htmlFor="message" className="input-label">Mensaje</label>
                            <div className="input-container">
                                <textarea name="message" id="message" className="text-area" ref={messageRef} onChange={eventMessage.onChange} onKeyUp={handleInput} value={event?.message} maxLength={400}></textarea>
                                <span className="description-input">
                                   Este es el mensaje que enviara el bot al desencadenarse este evento.
                                </span>
                                <AutoComplete autocomplete={openAutoComplete} handleSelection={handleSelection}/>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="cooldown" className="input-label">Cooldown</label>
                            <div className="input-container">
                                <input className="range-input" name="cooldown" id="cooldown" min={5} max={300} step={1} {...eventCooldown} value={event?.cooldown}/>
                                <div className="view-value">
                                    {event.cooldown} segundos
                                </div>
                                <span className="description-input">
                                   Tiempo de espera antes de que el bot pueda volver a enviar el mensaje.
                                </span>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="queueMax" className="input-label">Limite</label>
                            <div className="input-container">
                               <input name="queueMax" id="queueMax" className="number-input" {...eventQueueMax} max={500} min={0} value={event?.queueMax}/>
                               <span className="description-input">
                                    Es el limite de eventos que pueden estar en cola (Si el límite es 0 significa que el límite está desactivado).
                               </span>
                            </div>
                        </div>            
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="button-group">
                        <button className="button-input" type="submit">
                            Guardar evento
                        </button>
                    </div>
                </div>
            </motion.form>
        </div>
    )
}