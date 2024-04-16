import { CiSearch } from "react-icons/ci";
import { Tooltip} from "@mui/material";
import {Pagination} from "../../Utils/Pagination";
import { MdEdit } from "react-icons/md";
import { IoMdTrash, IoMdPower,IoMdAdd} from "react-icons/io";
import { useState, useEffect } from "react";
import StatusSVG from "../../Utils/StatusSVG";
function Customs({commands, changeStatus, openCreateModal, openEdit, openDelete}) {
    const [search, setSearch] = useState("");
    const [forPage, setForPage] = useState(10);
    const [page, setPage] = useState(0);
    const[maxPages, setMaxPages] = useState(1);

    function handleSearch(e) {
        const {value} = e.target;
        setSearch(value);
    }
    function showEntries(e) {
        const value = Number.parseInt(e.target.value);

        setForPage(value);
    }
    useEffect(() => {
        const max = commands.filter(cmd => cmd.name.includes(search) || cmd.message.includes(search)).length / forPage;
        
        if(page + 1 > max) {
            setPage(Math.ceil(max) -1);
        }
        if(max > 0) {
            setMaxPages(max);
        } else {
            setMaxPages(1);
            setPage(0);
        }
    }, [search, forPage, page]);

    return(
        <div className="subpage-container">
            <div className="subpage-header">
                <div className="input-container">
                    <div className="icon">
                        <CiSearch/>
                    </div>
                    <input type="search" name="seach" id="search" className="search-input" placeholder="Buscar..." value={search} onChange={handleSearch}/>
                </div>
                <div className="entries-box">
                    <label htmlFor="entries" className="entries-label">
                        Mostrar:
                    </label>
                    <select name="entries" id="entries" className="select-input" value={forPage} onChange={showEntries}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
            <div className="subpage-box">
                <div className="box-header">
                    <h3 className="box-title">
                        Comandos Personalizados
                    </h3>
                    <div className="button-container">
                        <button className="button-input" onClick={openCreateModal}>
                            <div className="icon">
                                <IoMdAdd/>
                            </div>
                            <span className="button-text">
                                Crear Comando
                            </span>
                        </button>
                    </div>
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
                                    Mensaje
                                </th>
                                <th className="table-header disposable-section">
                                    Nivel de usuario
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
                              commands
                              ?.filter(command => command.name.includes(search) || command.message.includes(search))
                              .slice(page * forPage, page * forPage + forPage)
                              .filter(command => command.name.includes(search) || command.message.includes(search)).map((command, index) => 
                                <tr key={index} className="row-table">
                                    <td className="ceil-table status-ceil">
                                        <div className="center-box">
                                            <div className={`badge ${command.status ? "enabled" : "disabled"}`}>
                                                <StatusSVG backgroundColor={command.status ? "#00ff09" : "#F44336"}/>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="ceil-table">
                                        {command.name}
                                    </td>
                                    <td className="ceil-table">
                                        {command.message}
                                    </td>
                                    <td className="ceil-table disposable-section">
                                        {command.userlevel}
                                    </td>
                                    <td className="ceil-table">
                                        <div className="center-box">
                                            <Tooltip title={command.status ? "Desactivar" : "Activar"} placement="top">
                                                <button className="button-input" id={index} onClick={() => changeStatus(index)}>
                                                    <IoMdPower/>
                                                </button>
                                            </Tooltip>
                                            <Tooltip title="Editar" placement="top">
                                                <button className="button-input" onClick={() => openEdit(index)}>
                                                    <MdEdit/>
                                                </button>
                                            </Tooltip>
                                            <Tooltip title="Eliminar" placement="top">
                                                <button className="button-input" onClick={() => openDelete(index)}>
                                                    <IoMdTrash/>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                              )  
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination max={maxPages} page={page} setPage={setPage}/>
            </div>
        </div>
    )
}
export default Customs;