import { useMediaQuery } from "@mui/material"
import { useCallback, useState } from "react";
import SideMenuView from "../components/DashboardView/SideMenuView";
import { Routes, Route } from "react-router-dom";
import CommandsContainer from "../components/DashboardView/Commands/CommandsContainer";
import Header from "../components/DashBoard/Header";
import MusicContainer from "../components/DashboardView/Music/MusicContainer";

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
                </Routes>
            </div>
        </div>
    )
}

export default DashBoardView;