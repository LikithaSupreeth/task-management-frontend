import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Typography, Box, Paper, Button, Table, TableBody, TableCell, TableHead, TableRow, Stack } from '@mui/material';
// import { Assignment } from '@mui/icons-material';


export default function Dashboard() {

  const { user } = useAuth()
  const [task, setTask] = useState([])
  const [userDetails, setUserDetails] = useState({})

  useEffect(() => {
    const getTask = async () => {
      const response = await axios.get("http://localhost:3456/tasks", {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      setTask(response.data)

      let userIds
      if (user.role === "TeamLead") {
        userIds = response.data.map(ele => ele.assignedUserId)
      } if ((user.role === "Employee")) {
        userIds = response.data.map(ele => ele.userId)
      }


      const userModel = await Promise.all(userIds.map(async (ele) => {
        const response = await axios.get(`http://localhost:3456/users/${ele}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        return { [ele]: response.data }
      }))

      const userObject = userModel.reduce((acc, cv) => ({
        ...acc, ...cv
      }), {})
      setUserDetails(userObject)
    }
    getTask()

  }, [])
  
  console.log(userDetails)
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
                  <TableCell>{user.role === "TeamLead" ? ("Assigned To") : ("Assigned By")}</TableCell>
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
                    <TableCell>{user.role === "TeamLead" ? (userDetails[ele.assignedUserId]?.firstName) : (userDetails[ele.userId]?.firstName)}</TableCell>
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