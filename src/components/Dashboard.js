import * as React from 'react';
import { useAuth } from '../context/AuthContext';
import { Typography, Box, Paper, Button, Table, TableBody, TableCell, TableHead, TableRow, Stack } from '@mui/material';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];


export default function Dashboard() {

  const { user } = useAuth()

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
          <Typography align="center" component="h2" variant="h5" sx={{ mt: 3, ml: 2 }}>All Task</Typography>
          <Stack>
            <Table size="large">
              <TableHead>
                <TableRow>
                  <TableCell>Task</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Finish Date</TableCell>
                  <TableCell>Assigned By</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.shipTo}</TableCell>
                    <TableCell>{row.paymentMethod}</TableCell>
                    <TableCell align="right">{`$${row.amount}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {user.role === "TeamLead" ? (
              <Button
                type="submit"
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