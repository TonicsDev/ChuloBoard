import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { motion, useAnimation } from "framer-motion";

export default function ClearModal({clearList, closeClearModal}) {
    const control = useAnimation();

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

    useEffect(() => {
        control.start("openAnim");

        return () => control.stop();
    }, []);

    function closeAnimation() {
        control.start("closeAnim");
    }

    function closeModal(anim) {
        if(anim === "closeAnim") {
            closeClearModal();
        }
    }
    return(
        <div className="modal notice-modal">
            <motion.div className="modal-container notice-container" variants={variants} animate={control} onAnimationComplete={anim => closeModal(anim)}>
                <div className="modal-header">
                    <h3 className="modal-title">
                        ¿Estás seguro?
                    </h3>
                    <div className="close" onClick={closeAnimation}>
                        <AiOutlineClose/>
                    </div>
                </div>
                <div className="modal-body">
                    <span className="modal-text">
                        ¿Estas seguro de limpiar la lista de reproducción?
                    </span>
                </div>
                <div className="modal-footer">
                    <div className="button-group notice">
                        <button className="button-input" onClick={closeAnimation}>
                            Cancelar
                        </button>
                        <button className="button-input delete" onClick={clearList}>
                            Eliminar
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}