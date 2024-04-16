import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
export const userContext = createContext();
axios.defaults.withCredentials = true;

export function UserProvider({children}) {
    const [user, setUser] = useState({
        id: "",
        username: ""
    });
    const navigate = useNavigate();
    const path = useLocation();
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        axios.get(`${import.meta.env.VITE_API_URL}auth/session`, {signal}).then(res => {
            setUser({
                id: res.data.session.id,
                username: res.data.session.username
            });
        }).catch((error) => {
           if(error.response) {
                setUser({
                    id: "",
                    username: ""
                });
                if(path.pathname.includes("dashboard") || !/\w{0,20}/g.test(path.pathname)) navigate("/login");
           }
        });
        return () => controller.abort();
    }, []);
    return(
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    )
}