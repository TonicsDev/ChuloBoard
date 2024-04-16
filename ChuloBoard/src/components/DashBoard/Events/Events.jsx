import { Tooltip } from "@mui/material";
import StatusSVG from "../../Utils/StatusSVG";
import { IoMdPower } from "react-icons/io";
import { MdEdit } from "react-icons/md";

function Events({events, openEdit, changeStatus}) {
    return(
        <div className="subpage-container">
            <div className="subpage-box">
                <div className="box-header">
                    <h3 className="box-title">
                        Eventos
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
                                    Evento
                                </th>
                                <th className="table-header">
                                    <span className="header-title">
                                        Acciones
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {events?.map((event, index) => 
                                <tr className="row-table" key={index}>
                                    <td className="ceil-table">
                                        <div className="center-box">
                                            <div className="badge">
                                                <StatusSVG backgroundColor={event.status ? "#00ff09" : "#F44336"}/>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="ceil-table">
                                        <div className="column-box">
                                            <span className="ceil-title">
                                                {event.name}
                                            </span>
                                            <span className="ceil-text">
                                                {event.message}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="ceil-table">
                                        <div className="center-box">
                                            <Tooltip title={event.status ? "Desactivar" : "Activar"} placement="top">
                                                <button className="button-input" onClick={() => changeStatus(index)}>
                                                    <IoMdPower/>
                                                </button>
                                            </Tooltip>
                                            <Tooltip title="Editar" placement="top">
                                                <button className="button-input" onClick={() => openEdit(index)}>
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

export default Events;