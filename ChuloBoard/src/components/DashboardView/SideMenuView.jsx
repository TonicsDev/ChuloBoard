import { FaMagic } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import { BsMusicNoteBeamed } from "react-icons/bs";
function SideMenuView({collapse, closeMenu}) {
    return(
        <div className={`sidemenu ${collapse ? 'sidemenu-collapse' : ''}`}>
            <div className="sidemenu-header">
                <img src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_35575bb4ba354b69a9b750ce9b2f0963/static/light/3.0" alt="logo-chuloboard" className="logo-image" />
                <h3 className={`sidemenu-title ${collapse ? "collapse-text" : ""}`}>
                    ChuloBoard
                </h3>
            </div>
            <div className="sidemenu-body">
                <Tooltip title="Personalizados" placement="right">
                    <NavLink to={"commands"} className={`link ${collapse ? "collapse-link" : ""}`} onClick={closeMenu}>
                        <div className="icon">
                            <FaMagic/>
                        </div>
                        <span className={`link-text ${collapse ? "collapse-text" : ""}`}>
                            Comandos
                        </span>
                    </NavLink>
                </Tooltip>
                <Tooltip title="Música" placement="right">
                    <NavLink to={"music"} className={`link ${collapse ? "collapse-link" : ""}`} onClick={closeMenu}>
                        <div className="icon">
                            <BsMusicNoteBeamed/>
                        </div>
                        <span className={`link-text ${collapse ? "collapse-text" : ""}`}>
                            Música
                        </span>
                    </NavLink>
                </Tooltip>
            </div>
        </div>
    )
}

export default SideMenuView;