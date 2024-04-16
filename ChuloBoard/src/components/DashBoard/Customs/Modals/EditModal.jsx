import { useEffect, useCallback} from "react";
import {AiOutlineClose} from "react-icons/ai";
import { motion, useAnimation } from "framer-motion";
import {Configure} from "react-instantsearch-core";
import {AutoComplete} from "../../../Utils/AutoComplete";
import useAutoComplete from "../../../../hooks/useAutoComplete";
import useField from "../../../../hooks/useField";
import useFieldTrim from "../../../../hooks/useFieldTrim";
import useFieldNumber from "../../../../hooks/useFieldNumber";
export default function EditModal({command, setCommand, updateCommand, closeEditModal, resetCommandState}) {
    const control = useAnimation();
    const [messageRef, openAutoComplete, handleInput, handleSelection] = useAutoComplete(useCallback((variableHandle) => {
        setCommand({
            ...command,
            message: variableHandle
        });
    }, [command]));
    const commandName = useFieldTrim({type: 'text', key: 'name'}, setCommand, command);
    const commandMessage = useField({type: 'text', key: 'message'}, setCommand, command);
    const commandUserlevel = useField({type: 'text', key: 'userlevel'}, setCommand, command);
    const commandCooldown = useFieldNumber({type: 'range', key: 'cooldown', max: 300, min: 5}, setCommand, command);
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
            resetCommandState();
            closeEditModal();
        }
    }

    return(
        <div className="modal">
            <Configure facetFilters={["category:commands"]}/>
            <motion.form className="modal-container" animate={control} onSubmit={updateCommand} variants={variants} onAnimationComplete={anim => closeModal(anim)}>
                <div className="modal-header">
                    <h3 className="modal-title">Editar comando: {command.name}</h3>
                    <div className="close" onClick={closeAnimation}>
                        <AiOutlineClose/>
                    </div>
                </div>
                <div className="modal-body">
                    <div className="modal-form">
                        <div className="input-group">
                            <label htmlFor="name" className="input-label">Comando</label>
                            <div className="input-container">
                                <input className="text-input" name="name" id="name" maxLength={20} {...commandName} value={command?.name}/>
                                <span className="description-input">
                                    Es el nombre que se usará para llamar al comando.
                                </span>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="message" className="input-label">Mensaje</label>
                            <div className="input-container">
                                <textarea name="message" id="message" ref={messageRef} maxLength={400} onKeyUp={handleInput} className="text-area" {...commandMessage} value={command?.message}></textarea>
                                <AutoComplete autocomplete={openAutoComplete} handleSelection={handleSelection}/>
                                <span className="description-input">
                                   Este es el Mensaje de respuesta que dara el bot.
                                </span>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="userlevel" className="input-label">Nivel de usuario</label>
                            <div className="input-container">
                                <select name="userlevel" id="userlevel" className="select-input" onChange={commandUserlevel.onChange} value={command?.userlevel}>
                                    <option value="Propietario">Propietario</option>
                                    <option value="Moderador">Moderador</option>
                                    <option value="Subscriptor">Subscriptor</option>
                                    <option value="VIP">VIP</option>
                                    <option value="Cualquiera">Cualquiera</option>
                                </select>
                                <span className="description-input">
                                    Este es el nivel de usuario requerido para ejecutar este comando.
                                </span>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="cooldown" className="input-label">Cooldown</label>
                            <div className="input-container">
                                <input className="range-input" name="cooldown" id="cooldown" min={5} max={300} step={1} {...commandCooldown} value={command?.cooldown}/>
                                <div className="view-value">
                                    {command.cooldown} segundos
                                </div>
                                <span className="description-input">
                                   Tiempo de espera antes de poder ejecutar de nuevo este comando.
                                </span>
                            </div>
                        </div>                 
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="button-group">
                        <button className="button-input" type="submit">
                            Guardar comando
                        </button>
                    </div>
                </div>
            </motion.form>
        </div>
    )
}