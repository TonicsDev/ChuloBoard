import {Tooltip} from "@mui/material";
import DropDownLink from "../SideMenu/DropDownLink";
import { FaMagic } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { VscSettings } from "react-icons/vsc";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { MdWidgets } from "react-icons/md";

function SideMenu({collapse, closeMenu}) {
    return(
        <div className={`sidemenu ${collapse ? "sidemenu-collapse" : ""}`}>
            <div className="sidemenu-header">
                <img src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_35575bb4ba354b69a9b750ce9b2f0963/static/light/3.0" alt="logo-chuloboard" className="logo-image" />
                <h3 className={`sidemenu-title ${collapse ? "collapse-text" : ""}`}>
                    ChuloBoard
                </h3>
            </div>
            <div className="sidemenu-body">
                <DropDownLink titleDrop={"Comandos"} icon={<FaMagic/>} collapse={collapse}>
                    <Tooltip title="Personalizados" placement="right">
                        <NavLink to={"customs"} className={`sub-link ${collapse ? "collapse-link" : ""}`} onClick={closeMenu}>
                            <div className="icon">
                                <VscSettings/>
                            </div>
                            <span className={`link-text ${collapse ? "collapse-text" : ""}`}>
                                Personalizados
                            </span>
                        </NavLink>
                    </Tooltip>
                    <Tooltip title="Defaults" placement="right">
                        <NavLink to={"defaults"} className={`sub-link ${collapse ? "collapse-link" : ""}`} onClick={closeMenu}>
                            <div className="icon">
                                <HiSquare3Stack3D/>
                            </div>
                            <span className={`link-text ${collapse ? "collapse-text" : ""}`}>
                                Defaults
                            </span>
                        </NavLink>
                    </Tooltip>
                </DropDownLink>
                <Tooltip title="Eventos" placement="right">
                    <NavLink to={"events"} className={`link ${collapse ? "collapse-link" : ""}`} onClick={closeMenu}>
                        <div className="icon">
                            <AiFillThunderbolt/>
                        </div>
                        <span className={`link-text ${collapse ? "collapse-text" : ""}`}>
                            Eventos
                        </span>
                    </NavLink>
                </Tooltip>
                <Tooltip title="Musica" placement="right">
                    <NavLink to={"music"} className={`link ${collapse ? "collapse-link" : ""}`} onClick={closeMenu}>
                        <div className="icon">
                            <BsMusicNoteBeamed/>
                        </div>
                        <span className={`link-text ${collapse ? "collapse-text" : ""}`}>
                            Musica
                        </span>
                    </NavLink>
                </Tooltip>
                <Tooltip title="widgets" placement="right">
                    <NavLink to={"widgets"} className={`link ${collapse ? "collapse-link" : ""}`} onClick={closeMenu}>
                        <div className="icon">
                            <MdWidgets/>
                        </div>
                        <span className={`link-text ${collapse ? "collapse-text" : ""}`}>
                            Widgets
                        </span>
                    </NavLink>
                </Tooltip>
            </div>
        </div>
    )
}

export default SideMenu;