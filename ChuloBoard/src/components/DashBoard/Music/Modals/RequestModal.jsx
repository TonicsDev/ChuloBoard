import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
function RequestModal({url, setUrl, closeRequestModal, resetURL, addSong}) {
    const control = useAnimation();
    function handleChange(event) {
        setUrl(event.target.value.trim());
    }
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
            resetURL();
            closeRequestModal();
        }
    }
    return(
        <div className="modal">
            <motion.form className="modal-container" variants={variants} animate={control} onAnimationComplete={anim => closeModal(anim)} onSubmit={addSong}>
                <div className="modal-header">
                    <h3 className="modal-title">
                        Agregar canción
                    </h3>
                    <div className="close" onClick={closeAnimation}>
                      <AiOutlineClose/>  
                    </div>
                </div>
                <div className="modal-body">
                    <div className="modal-form">
                        <div className="input-group">
                            <label htmlFor="url" className="input-label">URL</label>
                            <div className="input-container">
                                <input type="text" className="text-input" onChange={handleChange} value={url} placeholder="https://www.youtube.com/watch?v=FEdayncie-w"/>
                                <span className="description-input">
                                    Pega la url de un video o playlist de youtube
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="button-group">
                        <button className="button-input">
                            Agregar
                        </button>
                    </div>
                </div>
            </motion.form>
        </div>
    )
}

export default RequestModal;