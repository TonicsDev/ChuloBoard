import { Link } from "react-router-dom";
import Image404 from "../assets/404.png";
import { AiFillHome } from "react-icons/ai";
function NotFound() {
    return(
        <div className="not-found">
            <img src={Image404} alt="404-image" className="image-404" />
            <h1 className="title">
                404
            </h1>
            <h2 className="subtitle">
                Página no encontrada
            </h2>
            <Link to={"/"} className="return-link">
                Volver a inicio
            </Link>
        </div>
    )
}

export default NotFound;