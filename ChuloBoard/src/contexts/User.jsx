import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
export const userContext = createContext();
axios.defaults.withCredentials = true;

export function UserProvider({children}) {
    const [user, setUser] = useState({
        id: "",
        username: ""
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
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
            setIsAuthenticated(true);
            setLoading(false);
        }).catch((error) => {
           if(error.response) {
                setUser({
                    id: "",
                    username: ""
                });
                setIsAuthenticated(false);
                setLoading(false);
                if(path.pathname.includes("dashboard") || !/\w{0,20}/g.test(path.pathname)) navigate("/login");
           }
        });
        return () => controller.abort();
    }, []);

    const login = useCallback((event) => {
        event.preventDefault();
        axios.post(`${import.meta.env.VITE_API_URL}auth`, {username: event.target.username.value, password: event.target.password.value}).then(res => {
            return navigate("/dashboard/customs");
        }).catch(error => {
            return console.error(error);
        });
        setLoading(true);
    }, []);

    const logout = useCallback(() => {
        axios.delete(`${import.meta.env.VITE_API_URL}auth/logout`).then(res => {
            navigate("/");
        }).catch(error => {
            setError("Hubo un error al cerrar sesión");
            openErrorAlert();
        });
        setLoading(true);
    }, []);
    return(
        <userContext.Provider value={{user, isAuthenticated, logout, login, loading}}>
            {children}
        </userContext.Provider>
    )
}