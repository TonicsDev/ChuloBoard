import { useState } from "react";

export function useAlert(initialValue = false) {
    const [isOpen, setIsOpen] = useState(initialValue);

    const openAlert = () => {
        setIsOpen(true);
    }

    const closeAlert = () => {
        setIsOpen(false);
    }

    return [isOpen, openAlert, closeAlert];
}