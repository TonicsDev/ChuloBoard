import {Tooltip} from "@mui/material";
import DropDownLink from "../SideMenu/DropDownLink";
import { FaMagic } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { VscSettings } from "react-icons/vsc";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { MdWidgets, MdLogout } from "react-icons/md";

function SideMenuDocs({collapse, closeMenu}) {
    return(
        <div className={`sidemenu ${collapse ? "sidemenu-collapse" : ""}`}>
            <div className="sidemenu-header">
                <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/224950e5-3a79-4243-88ea-716474aa7e2f-profile_image-300x300.png" alt="logo-chuloboard" className="logo-image" />
                <h3 className={`sidemenu-title ${collapse ? "collapse-text" : ""}`}>
                    Documentación
                </h3>
            </div>
            <div className="sidemenu-body">
                <Tooltip title="Comandos" placement="right">
                        <NavLink to={"commands"} className={`link ${collapse ? "collapse-link" : ""}`} onClick={closeMenu}>
                            <div className="icon">
                                <FaMagic/>
                            </div>
                            <span className={`link-text ${collapse ? "collapse-text" : ""}`}>
                                !Comandos
                            </span>
                        </NavLink>
                </Tooltip>
                <Tooltip title="Musica" placement="right">
                    <NavLink to={"music"} className={`link ${collapse ? "collapse-link" : ""}`} onClick={closeMenu}>
                        <div className="icon">
                            <BsMusicNoteBeamed/>
                        </div>
                        <span className={`link-text ${collapse ? "collapse-text" : ""}`}>
                            !Musica
                        </span>
                    </NavLink>
                </Tooltip>
            </div>
        </div>
    )
}

export default SideMenuDocs;