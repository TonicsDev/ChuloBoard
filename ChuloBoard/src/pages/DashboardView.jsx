import { useMediaQuery } from "@mui/material"
import { useCallback, useState } from "react";
import SideMenuView from "../components/DashboardView/SideMenuView";
import { Routes, Route, Navigate } from "react-router-dom";
import CommandsContainer from "../components/DashboardView/Commands/CommandsContainer";
import Header from "../components/DashBoard/Header";
import MusicContainer from "../components/DashboardView/Music/MusicContainer";
import NotFound from "./NotFound";

function DashBoardView() {
    const match = useMediaQuery('(max-width: 950px)');
    const [collapse, setCollapse] = useState(false);
    const toggleCollapse = useCallback(() => {
        setCollapse(!collapse);
    }, [collapse]);
    const closeMenu = useCallback(() =>{
        if(match) setCollapse(true);
    }, [match]);
    return(
        <div className={`dashboard ${collapse ? "collapse-sidemenu" : ""}`}>
            <SideMenuView collapse={collapse} closeMenu={closeMenu}/>
            <div className="view-subpage">
                <Header collapse={collapse} toggleCollapse={toggleCollapse}/>
                <Routes>
                    <Route path="commands" element={<CommandsContainer/>}/>
                    <Route path="music" element={<MusicContainer/>}/>
                    <Route path='*' element={<Navigate to={"/404"}/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default DashBoardView;