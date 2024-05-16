import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Typography, Box, Paper, Button, Table, TableBody, TableCell, TableHead, TableRow, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

// Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

// const rows = [
//   createData(
//     0,
//     '16 Mar, 2019',
//     'Elvis Presley',
//     'Tupelo, MS',
//     'VISA ⠀•••• 3719',
//     312.44,
//   ),
//   createData(
//     1,
//     '16 Mar, 2019',
//     'Paul McCartney',
//     'London, UK',
//     'VISA ⠀•••• 2574',
//     866.99,
//   ),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(
//     3,
//     '16 Mar, 2019',
//     'Michael Jackson',
//     'Gary, IN',
//     'AMEX ⠀•••• 2000',
//     654.39,
//   ),
//   createData(
//     4,
//     '15 Mar, 2019',
//     'Bruce Springsteen',
//     'Long Branch, NJ',
//     'VISA ⠀•••• 5919',
//     212.79,
//   ),
// ];


export default function Dashboard() {

  const { user } = useAuth()
  const [task, setTask] = useState([])

  useEffect(() => {
    (async () => {
      const response = await axios.get('http://localhost:3456/tasks', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      setTask(response.data)

    })()
  }, [])

  console.log(task)

  return (
    <>
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        m: 'auto',
      }}>
        <Paper elevation={5}>
          <Stack>
            <Typography align="center" component="h2" variant="h5" sx={{ mt: 3 }}>All Task</Typography>
            <Table size="large">
              <TableHead>
                <TableRow>
                  <TableCell>Task</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Finish Date</TableCell>
                  <TableCell>Assigned By</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {task.map((ele) => (
                  <TableRow key={ele._id}>
                    <TableCell>{ele.title}</TableCell>
                    <TableCell>{ele.description}</TableCell>
                    <TableCell>{ele.dueDate}</TableCell>
                    <TableCell>todo name fetching</TableCell>
                    <TableCell>{ele.priority}</TableCell>
                    <TableCell align="right">{ele.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {user.role === "TeamLead" ? (
              <Button
                component={Link}
                to='/taskForm'
                variant="contained"
                width='50%'
                sx={{ mx: 'auto', my: 2 }}
              >
                Create Task
              </Button>
            ) : null}

          </Stack>

        </Paper>
      </Box>
    </>
  );
}