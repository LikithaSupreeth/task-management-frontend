import { Container, Grid, Paper } from '@mui/material';
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
            <Link to = "/taskForm">TaskForm</Link>
          </Paper>
        </Grid>
        <Grid item xs={30}>
          <Paper>
            {/* <TaskList /> */}
            <Link to = "/taskList">TaskList</Link>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )}
  <Routes>
    <Route path='/taskList'element={<TaskList/>} />
    <Route path='/taskForm'element={<TaskForm/>} />
  </Routes>


export default Dashboard;
