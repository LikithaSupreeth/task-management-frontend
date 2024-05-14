import { useAuth } from "../context/AuthContext"

export default function Account(){
    const {user} = useAuth()
    return (
        <div>
            <h1>Account</h1>
            {user &&
            <>
            <p>First name - {user.firstName}</p>
            <p>Last name - {user.lastName}</p>
            </>
            }
        </div>
    )
}