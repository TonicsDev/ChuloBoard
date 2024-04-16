import { useState, useEffect } from "react";
import {BsCheckLg} from "react-icons/bs";
import {IoClose} from "react-icons/io5";
import { motion, useAnimation } from "framer-motion";

function AlertSuccess({message, closeAlert}) {
    const control = useAnimation();
    const variants = {
        openAnim: {
            opacity: [0, 1],
            x: [100, 0],
            transition: {duration: 0.3}
        },

        closeAnim: {
            opacity: [1, 0],
            x: [0, 100],
            transition: {duration: 0.3}
        }
    }
    useEffect(() => {
        control.start("openAnim");
    }, []);

    useEffect(() => {
       const timeOut = setTimeout(() => {
            closeAnimation();
        }, 4000);

        return () => clearTimeout(timeOut);
    }, [])
    function closeAnimation() {
        control.start("closeAnim");
    }

    function close(definition) {
        if(definition == "closeAnim") {
            closeAlert();
        }
    }
    return(
        <motion.div className="alert-box alert-success" animate={control} variants={variants} onAnimationComplete={definition => close(definition)}>
            <div className="alert-header">
                <div className="title-alert">
                    <div className="icon">
                        <BsCheckLg/>
                    </div>
                    <span className="alert-text">
                        Exito
                    </span>
                </div>
                <div className="close" onClick={closeAnimation}>
                    <IoClose/>
                </div>
            </div>
            <div className="alert-body">
                {message}
            </div>
        </motion.div>
    )
}

export {AlertSuccess}