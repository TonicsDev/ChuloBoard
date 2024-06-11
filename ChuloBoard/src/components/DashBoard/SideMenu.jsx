import {Tooltip} from "@mui/material";
import DropDownLink from "../SideMenu/DropDownLink";
import { FaMagic } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { VscSettings } from "react-icons/vsc";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { MdWidgets, MdLogout } from "react-icons/md";
import { SlDocs } from "react-icons/sl";

function SideMenu({collapse, closeMenu, logout}) {
    return(
        <div className={`sidemenu ${collapse ? "sidemenu-collapse" : ""}`}>
            <div className="sidemenu-header">
                <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/224950e5-3a79-4243-88ea-716474aa7e2f-profile_image-300x300.png" alt="logo-chuloboard" className="logo-image" />
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
                <Tooltip title="Documentación" placement="right">
                    <NavLink to={"/docs/commands"} className={`link ${collapse ? "collapse-link" : ""}`} onClick={closeMenu}>
                        <div className="icon">
                            <SlDocs/>
                        </div>
                        <span className={`link-text ${collapse ? "collapse-text" : ""}`}>
                            Documentación
                        </span>
                    </NavLink>
                </Tooltip>
                <Tooltip title="cerrar sesión" placement="right">
                    <div className={`link ${collapse ? "collapse-link" : ""}`} onClick={logout}>
                        <div className="icon">
                            <MdLogout/>
                        </div>
                        <span className={`link-text ${collapse ? "collapse-text" : ""}`}>
                            Cerrar sesión
                        </span>
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}

export default SideMenu;