import { useRef } from "react";

function useCopyField(setMessage, openSuccessAlert) {
    const inputRef = useRef(null);
    function copy() {
        inputRef.current.select();
        navigator.permissions.query({ name: "clipboard-write" })
        .then((resultado) => {
            if (resultado.state == "granted" || resultado.state == "prompt") {
                navigator.clipboard.writeText(inputRef.current.value);
                setMessage("Copiado al portapapeles");
                openSuccessAlert();
            }
        });
        inputRef.current.blur();
    }

    return [inputRef, copy];
}

export default useCopyField;