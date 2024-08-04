import { useUser } from "../../hooks/useUser";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute({children}) {
    const {user, isAuthenticated, loading} = useUser();
    if(loading) return <Outlet/>;

    if(!isAuthenticated) {
        return <Navigate to={"/login"}/>;
    } else {
        return <Outlet/>;
    }

}

export default ProtectedRoute;