import { useState } from "react"
export default function Register() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form)
    }
    return (
        <div>
            <h2>Register With Us</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='firstName'>Enter First Name</label> <br />
                <input type="text" id='firstName' name="firstName" value={form.firstName} onChange={handleChange} /> <br />
                <label htmlFor='lastName'>Enter Last Name</label> <br />
                <input type="text" id='lastName' name="lastName" value={form.lastName} onChange={handleChange} /> <br />
                <label htmlFor='email'>Enter Email</label> <br />
                <input type="text" id='email' name="email" value={form.email} onChange={handleChange} /> <br />
                <label htmlFor='password'>Enter Password</label> <br />
                <input type="password" id='password' name="password" value={form.password} onChange={handleChange} /> <br />
                <label htmlFor='role'>Select Role</label> <br />
                <select id="role" name="role" value={form.role} onChange={handleChange}>
                    <option value="">Select Role</option>
                    <option value="Employee">Employee</option>
                    <option value="TeamLead">Team Lead</option>
                </select> <br /> <br />
                <input type="submit" />
            </form>
        </div>
    )
}