import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import SideMenu from "../components/DashBoard/SideMenu";
import CustomContainer from "../components/DashBoard/Customs/CustomsContainer";
import DefaultsContainer from "../components/DashBoard/defaults/DefaultsContainer";
import {useUser} from "../hooks/useUser";
import { useMediaQuery } from "@mui/material";
import Header from "../components/DashBoard/Header";
import { useCallback, useEffect, useState } from "react";
import EventsContainer from "../components/DashBoard/Events/EventsContainer";
import MusicContainer from "../components/DashBoard/Music/MusicContainer";
import { socket } from "../client/WebSocket";
import WidgetsContainer from "../components/DashBoard/Widgets/WidgetsContainer";
import NotFound from "./NotFound";
import axios from "axios";
import { useAlert } from "../hooks/useAlert";
import { Alert } from "../components/Utils/Alert";
function Dashboard() {
    const {user} = useUser();
    const match = useMediaQuery('(max-width: 950px)');
    const navigate = useNavigate();
    const [collapse, setCollapse] = useState(false);
    const [error, setError] = useState("");
    const [errorAlert, openErrorAlert, closeErrorAlert] = useAlert(false);
    const toggleCollapse = useCallback(() => {
        setCollapse(!collapse);
    }, [collapse]);

    const closeMenu = useCallback(() => {
        if(match) {
            setCollapse(true);
        }
    }, [match]);

    useEffect(() => {
        socket.emit('join-channel', import.meta.env.VITE_CHANNEL);
    }, []);
    return(
        <div className={`dashboard ${collapse ? "collapse-sidemenu" : ""}`}>
            <SideMenu collapse={collapse} closeMenu={closeMenu}/>
            <div className="view-subpage">
                <Header collapse={collapse} toggleCollapse={toggleCollapse}/>
                <Routes>
                    <Route path="customs" element={<CustomContainer/>}/>
                    <Route path="defaults" element={<DefaultsContainer/>}/>
                    <Route path="events" element={<EventsContainer/>}/>
                    <Route path="music" element={<MusicContainer/>}/>
                    <Route path="widgets" element={<WidgetsContainer/>}/>
                    <Route path="*" element={<Navigate to={"/404"}/>}/>
                </Routes>
                {errorAlert && <Alert error={error} closeAlert={closeErrorAlert}/>}
            </div>
        </div>
    )
}
export default Dashboard;