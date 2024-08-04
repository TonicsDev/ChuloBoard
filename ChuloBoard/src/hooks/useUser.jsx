import { useContext } from "react";
import { userContext } from "../contexts/User";
function useUser() {
    const context = useContext(userContext);
    if(!context) {
        console.error("useUser must be used within a UserProvider");
    }
    return context;
}
export {useUser}