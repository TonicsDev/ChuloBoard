import { useContext, useEffect } from "react";
import { userContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";
function useUser() {
    const context = useContext(userContext);
    const navigate = useNavigate();
    useEffect(() => {
        if(!context) {
            console.error("useUser must be used within a UserProvider");
        } else if(!context.username || !context.id) {
           navigate("/login");
        }
    }, []);

    return context;
}
export {useUser}