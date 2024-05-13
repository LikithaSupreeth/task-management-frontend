import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ThemeProvider, createTheme, Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import loginValidations from '../validations/LoginValidations';
import { toast, Zoom } from 'react-toastify';


const defaultTheme = createTheme();

export default function Login() {

    const navigate = useNavigate()
    const { handleLogin } = useAuth()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [clientErrors, setClientErrors] = useState({})
    const [touched, setTouched] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const toastStyle = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTouched(true)
        try {
            await loginValidations.validate(form, { abortEarly: false })
            setClientErrors({})

            const response = await axios.post('http://localhost:3456/users/login', form)
            localStorage.setItem("token", response.data.token)

            const userResponse = await axios.get('http://localhost:3456/users/account', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            handleLogin(userResponse.data)
            navigate("/")

        } catch (err) {

            const frontendErrors = err.inner ? err.inner.reduce((acc, cv) => {
                acc[cv.path] = cv.message
                return acc
            }, {}) : {}
            setClientErrors(frontendErrors)

            //backend Errors
            if (err.response && err.response.data && err.response.data.errors && err.response.data.errors.length > 0) {
                const errorMessage = err.response.data.errors
                toast.error(errorMessage, toastStyle)
            } else {
                toast.error('Please fill-up all the details', toastStyle);
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={form.email}
                            onChange={handleChange}
                            error={touched && !!clientErrors.email}
                            helperText={(touched && clientErrors.email) || 'This field is required'}
                        // FormHelperTextProps={{ style: { color: 'red' } }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={form.password}
                            onChange={handleChange}
                            error={touched && !!clientErrors.password}
                            helperText={(touched && clientErrors.password) || '*This field is required'}
                        // FormHelperTextProps={{ style: { color: 'red' } }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
