import { Route, Routes, Navigate } from "react-router-dom";
import Commands from "../components/Docs/Commands";
import SideMenuDocs from "../components/Docs/SideMenuDocs";
import { useState, useCallback } from "react";
import { useMediaQuery } from "@mui/material";
import Header from "../components/DashBoard/Header";
import Music from "../components/Docs/Music";

function Docs() {
    const [collapse, setCollapse] = useState(false);
    const match = useMediaQuery('(max-width: 950px)');
    const toggleCollapse = useCallback(() => {
        setCollapse(!collapse);
    }, [collapse]);

    const closeMenu = useCallback(() => {
        if(match) {
            setCollapse(true);
        }
    }, [match]);
    return(
        <div className={`documentation ${collapse ? 'collapse-sidemenu' : ''}`}>
            <SideMenuDocs collapse={collapse} closeMenu={closeMenu}/>
            <div className="view-subpage">
                <Header collapse={collapse} toggleCollapse={toggleCollapse}/>
                <Routes>
                    <Route path="commands" element={<Commands/>}/>
                    <Route path="music" element={<Music/>}/>
                    <Route path='*' element={<Navigate to={"/404"}/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Docs;