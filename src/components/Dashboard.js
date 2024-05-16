import { Container, Grid, Link as MuiLink, Paper } from '@mui/material';
import { Link, Route, Routes } from "react-router-dom"

import React from 'react';
import TaskForm from './Tasks/TaskForm';
import TaskList from './Tasks/TaskList';

const Dashboard = () => {
  return (
    <Container>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <Paper>
            {/* <TaskForm /> */}
            {/* <Link to = "/dashboard/taskForm">TaskForm</Link> */}
            <MuiLink component={Link} to="/dashboard/taskForm">TaskForm</MuiLink>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            {/* <TaskList /> */}
            <Link to = "/dashboard/taskList">TaskList</Link>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )}
  <Routes>
     <Route path="taskForm" element={<TaskForm userRole="teamlead" />} />
      <Route path="taskList" element={<TaskList />} />
  </Routes>


export default Dashboard;
