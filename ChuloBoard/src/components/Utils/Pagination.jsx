import { useState, useEffect } from "react";
import {VscArrowSmallLeft, VscArrowSmallRight} from "react-icons/vsc";
function Pagination({page, setPage, max}) {

    function nextPage() {
        if(page +1 >= Math.ceil(max)) return
        setPage(page + 1);
    }

    function returnPage() {
        if(page <= 0) return
        setPage(page -1);
    }
    return(
        <div className="pagination-container">
            <div className="pagination">
                <button className="pagination-button" onClick={returnPage}>
                    <VscArrowSmallLeft/>
                </button>
                <span className="text-pagination">
                    {page + 1} de {Math.ceil(max)}
                </span>
                <button className="pagination-button" onClick={nextPage}>
                    <VscArrowSmallRight/>
                </button>
            </div>
        </div>
    )
}

export {Pagination}