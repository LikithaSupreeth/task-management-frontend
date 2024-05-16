import 'react-toastify/dist/ReactToastify.css';

import { Avatar, Box, Button, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer, Zoom, toast } from 'react-toastify';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { taskValidations } from '../../validations/TaskValidations'
import { useNavigate } from 'react-router-dom';

const TaskForm = ({ userRole }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: '',
    status: '',
    dueDate: '',
    assignedUserId: '',
    userId: '',
  });

  const [clientErrors, setClientErrors] = useState({});
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const toastStyle = {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Zoom,
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setTouched(true);

    try {
      await taskValidations.validate(form, { abortEarly: false });

      if (userRole !== 'teamlead') {
        toast.error('Only team leads can create tasks.', toastStyle);
        return;
      }

      const response = await axios.post('http://localhost:3456/task/create', form);
      console.log(response.data);
      toast.success('Task created successfully!', toastStyle);
      navigate('/dashboard/taskList');
    } catch (err) {
      const frontendErrors = err.inner ? err.inner.reduce((acc, cv) => {
        acc[cv.path] = cv.message;
        return acc;
      }, {}) : {};
      console.log('frontend', frontendErrors);
      setClientErrors(frontendErrors);

      if (err.response && err.response.data && err.response.data.errors && err.response.data.errors.length > 0) {
        err.response.data.errors.forEach((error) => {
          toast.error(error.msg, toastStyle);
        });
      } else {
        toast.error('Please fill up all the details', toastStyle);
      }
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
            Add Task
          </Typography>
          <Box component="form" noValidate onSubmit={handleCreate} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                  value={form.title}
                  onChange={handleChange}
                  error={touched && !!clientErrors.title}
                  helperText={touched && clientErrors.title ? clientErrors.title : '*This field is required'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  multiline
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                  error={touched && !!clientErrors.description}
                  helperText={touched && clientErrors.description ? clientErrors.description : '*This field is required'}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required error={touched && !!clientErrors.priority}>
                  <InputLabel id="priority-label">Priority</InputLabel>
                  <Select
                    labelId="priority-label"
                    id="priority"
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                  {touched && clientErrors.priority && (
                    <p style={{ color: 'red' }}>{clientErrors.priority}</p>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required error={touched && !!clientErrors.status}>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <MenuItem value="Pending">Not Started</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                  {touched && clientErrors.status && (
                    <p style={{ color: 'red' }}>{clientErrors.status}</p>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="dueDate"
                  required
                  fullWidth
                  id="dueDate"
                  label="Due Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={form.dueDate}
                  onChange={handleChange}
                  error={touched && !!clientErrors.dueDate}
                  helperText={touched && clientErrors.dueDate ? clientErrors.dueDate : '*This field is required'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="assignedUserId"
                  required
                  fullWidth
                  id="assignedUserId"
                  label="Assigned User ID"
                  value={form.assignedUserId}
                  onChange={handleChange}
                  error={touched && !!clientErrors.assignedUserId}
                  helperText={touched && clientErrors.assignedUserId ? clientErrors.assignedUserId : '*This field is required'}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
              Create Task
            </Button>
          </Box>
        </Box>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
};

export default TaskForm;