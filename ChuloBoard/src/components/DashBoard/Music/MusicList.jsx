import { Tooltip } from "@mui/material";
import { FaArrowUp } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
function MusicList({songs, deleteSong, promoteSong}) {
    return(
        <div className="music-list">
            <div className="table-container">
                <table className="table-list">
                    <thead>
                        <tr>
                            <th className="table-header">
                                <span className="header-title">
                                    #
                                </span>
                            </th>
                            <th className="table-header">
                                <span className="header-title">
                                    Titulo
                                </span>
                            </th>
                            <th className="table-header">
                                <span className="header-title">
                                    Duración
                                </span>
                            </th>
                            <th className="table-header disposable-section">
                                <span className="header-title">
                                    Artista
                                </span>
                            </th>
                            <th className="table-header disposable-section">
                                <span className="header-title">
                                    Usuario
                                </span>
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
                            songs?.map((song, index) => 
                                index > 0 &&
                                <tr className="row-table" key={index}>
                                    <td className="ceil-table">
                                        <div className="center-box">
                                            {song?.position -1}
                                        </div>
                                    </td>
                                    <td className="ceil-table">
                                        {song?.title}
                                    </td>
                                    <td className="ceil-table">
                                        <div className="center-box">
                                            {song?.duration}
                                        </div>
                                    </td>
                                    <td className="ceil-table disposable-section">
                                        <div className="center-box">
                                            {song?.artist}
                                        </div>
                                    </td>
                                    <td className="ceil-table disposable-section">
                                        <div className="center-box">
                                            {song?.user}
                                        </div>
                                    </td>
                                    <td className="ceil-table">
                                        <div className="center-box">
                                            <Tooltip placement="top" title="Subir" onClick={() => promoteSong(song?.position)}>
                                                <button className="button-input">
                                                    <FaArrowUp/>
                                                </button>
                                            </Tooltip>
                                            <Tooltip placement="top" title="Eliminar" onClick={() => deleteSong(song?.position)}>
                                                <button className="button-input">
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
        </div>
    )
}

export default MusicList;