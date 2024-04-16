import { Tooltip } from "@mui/material";
import { useState } from "react";
import {FaChevronUp} from "react-icons/fa6";
function DropDownLink({collapse, titleDrop, children, icon}) {

    const [submenu, setSubmenu] = useState(false);

    function toggleSubmenu(e) {
        e.preventDefault();
        setSubmenu(!submenu);
    }
    return (
        <div className="dropdown-link">
            <Tooltip title={titleDrop} placement="right">
                <a href="#" className={`side-link ${collapse && "collapse-link"} ${submenu && "dropdown-drop"}`} onClick={toggleSubmenu}>
                    <div className={`icon ${collapse && "collapse-icon"}`}>
                        {icon}
                    </div>
                    <span className={`link-text ${collapse && "collapse-text"}`}>
                        {titleDrop}
                    </span>
                    <div className={`drop-icon ${collapse && "collapse-drop-icon"}`}>
                        <FaChevronUp className={`chevron-icon ${submenu && "icon-dropdowned"}`}/>
                    </div>
                </a>
            </Tooltip>
            <div className={`submenu ${submenu && "drop"}`}>
                <div className="sub-content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DropDownLink