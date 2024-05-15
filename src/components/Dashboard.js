import { Container, Grid, Paper } from '@mui/material';

import React from 'react';
import TaskForm from './Tasks/TaskForm';
import TaskList from './Tasks/TaskList';

const Dashboard = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <TaskForm />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <TaskList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
