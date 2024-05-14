import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Container, CssBaseline, FormControl, Grid, InputLabel, Link, MenuItem, Select, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import registrationValidations from '../validations/RegisterValidations';
import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Register() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: ''
    });
    const [clientErrors, setClientErrors] = useState({})
    const [touched, setTouched] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTouched(true)
        try {
            await registrationValidations.validate(form, { abortEarly: false })
            console.log('Validation Success:', form)
            setClientErrors({})

            const response = await axios.post('http://localhost:3456/users/register', form)
            console.log(response.data)
            navigate('/login')


        } catch (err) {

            const frontendErrors = err.inner ? err.inner.reduce((acc, cv) => {
                acc[cv.path] = cv.message
                return acc
            }, {}) : {}
            console.log("frontend", frontendErrors)
            setClientErrors(frontendErrors)

            //backend Errors
            if (err.response && err.response.data && err.response.data.errors && err.response.data.errors.length > 0) {
                err.response.data.errors.forEach(error => {
                    toast.error(error.msg, toastStyle)
                })
            } else {
                toast.error('Please fill-up all the details', toastStyle);
            }

            // const formErrors = err.inner.reduce((acc, curr) => {
            //     return { ...acc, [curr.path]: curr.message }
            // }, {})

            // setClientErrors(formErrors)
            // console.log('validation clientErrors:', formErrors)
        }
    };

    return (
        <ThemeProvider theme={createTheme()}>
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={form.firstName}
                                    onChange={handleChange}
                                    error={touched && !!clientErrors.firstName}
                                    helperText={(touched && clientErrors.firstName) || '*This field is required'}
                                // FormHelperTextProps={{ style: { color: 'red' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    error={touched && !!clientErrors.lastName}
                                    helperText={(touched && clientErrors.lastName) || '*This field is required'}
                                // FormHelperTextProps={{ style: { color: 'red' } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    error={touched && !!clientErrors.email}
                                    helperText={(touched && clientErrors.email) || '*This field is required'}
                                // FormHelperTextProps={{ style: { color: 'red' } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={form.password}
                                    onChange={handleChange}
                                    error={touched && !!clientErrors.password}
                                    helperText={(touched && clientErrors.password) || '*This field is required'}
                                // FormHelperTextProps={{ style: { color: 'red' } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                                    <Select
                                        required
                                        label="Role"
                                        name="role"
                                        labelId="demo-simple-select-helper-label"
                                        id="role"
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        value={form.role}
                                        onChange={handleChange}
                                        error={touched && !!clientErrors.role}
                                    // helperText={(touched && clientErrors.role) || '*This field is required'}
                                    // FormHelperTextProps={{ style: { color: 'red' } }}
                                    >
                                        <MenuItem value="">
                                            <em></em>
                                        </MenuItem>
                                        <MenuItem value="Employee">Employee</MenuItem>
                                        <MenuItem value="TeamLead">Team Lead</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Register;
