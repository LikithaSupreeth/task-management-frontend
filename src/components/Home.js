import { useAuth } from "../context/AuthContext"

export default function Home() {
    const { user } = useAuth()
    return (
        <div>
            <h2>Home</h2>
            {user && <p>Welcome {user.firstName}</p>}
        </div>
    )
}