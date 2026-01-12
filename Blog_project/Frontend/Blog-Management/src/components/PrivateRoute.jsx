// PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth.js";

const PrivateRoute = ({ children }) => {
    const auth = isLoggedIn(); // synchronous check
    return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
