import { useAuth } from "../context/AuthContext"
import Dashboard from "./Dashboard"

export default function Home() {
    const { user } = useAuth()
    return (
        <div>
            {user && <h2>Welcome {user.firstName}</h2>}
            {user && <Dashboard />}
        </div>
    )
}