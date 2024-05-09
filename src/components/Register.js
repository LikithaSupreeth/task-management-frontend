import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import registrationValidations from '../validations/RegisterValidations';

// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';









// import FormHelperText from '@mui/material/FormHelperText';



function Register() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: ''
    });

    const[errors,setErrors] = useState({})
    const [touched,setTouched] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTouched(true)
        try{
            await registrationValidations.validate(form,{abortEarly:false})
            console.log('Validation Success:',form)
            setErrors({})
        } catch(err){
            const formErrors = err.inner.reduce((acc,curr) => {
               return {...acc,[curr.path]:curr.message}
            },{})
            setErrors(formErrors)
            console.log('validation errors:',formErrors)
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
                                    error ={touched && !!errors.email}
                                    helperText = {(touched && errors.email) || '*This field is required'}
                                    FormHelperTextProps={{ style: { color: 'red' } }}
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
                                    error ={touched && !!errors.email}
                                    helperText = {(touched && errors.email) || '*This field is required'}
                                    FormHelperTextProps={{ style: { color: 'red' } }}
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
                                    error ={touched && !!errors.email}
                                    helperText = {(touched && errors.email) || '*This field is required'}
                                    FormHelperTextProps={{ style: { color: 'red' } }}
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
                                    error ={touched && !!errors.email}
                                    helperText = {(touched && errors.email) || '*This field is required'}
                                    FormHelperTextProps={{ style: { color: 'red' } }}
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
                                        error ={touched && !!errors.email}
                                        helperText = {(touched && errors.email) || '*This field is required'}
                                        FormHelperTextProps={{ style: { color: 'red' } }}
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
                                <Link href="#" variant="body2">
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
