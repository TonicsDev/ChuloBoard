import { Tooltip } from "@mui/material";
import {IoMdPower} from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import StatusSVG from "../../Utils/StatusSVG";

function Defaults({defaults, openEdit, changeStatus}) {
    return(
        <div className="subpage-container">
            <div className="subpage-box">
                <div className="box-header">
                    <h3 className="box-title">
                        Comandos Predeterminados
                    </h3>
                </div>
                <div className="table-container">
                    <table className="table-list">
                        <thead>
                            <tr>
                                <th className="table-header">
                                    <span className="header-title">
                                        Estado
                                    </span>
                                </th>
                                <th className="table-header">
                                    Comando
                                </th>
                                <th className="table-header">
                                    <span className="header-title">
                                        Acciones
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                defaults?.length <= 0 &&
                                <tr className="row-table">
                                    <td className="ceil-table empty" colSpan={3}>
                                        <span>No hay resultados</span>
                                    </td>
                                </tr>
                            }
                            {defaults?.map((command, index) => 
                                <tr className="row-table" key={index}>
                                    <td className="ceil-table status-ceil">
                                        <div className="center-box">
                                            <span className="badge">
                                                <StatusSVG backgroundColor={command.status ? "#00ff09" : "#F44336"}/>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="ceil-table">
                                        <div className="column-box">
                                            <h3 className="ceil-title">
                                                {command.name}
                                            </h3>
                                            <span className="ceil-text">
                                                {command.description}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="ceil-table">
                                        <div className="center-box">
                                            <Tooltip title={command.status ? "Desactivar" : "Activar"} placement="top">
                                                <button className="button-input" onClick={() => changeStatus(index)}>
                                                    <IoMdPower/>
                                                </button>
                                            </Tooltip>
                                            <Tooltip title="Editar" placement="top" onClick={() => openEdit(index)}>
                                                <button className="button-input">
                                                    <MdEdit/>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Defaults;