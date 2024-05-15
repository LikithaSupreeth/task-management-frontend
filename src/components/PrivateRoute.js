import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const { user } = useAuth()
    console.log(user);

    if(!user && localStorage.getItem('token')){
        return <p>loading...</p>
    }

    if (!user) {
        return <Navigate to="/login" />
    }
    else {
        return children
    }
}