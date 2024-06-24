import * as React from 'react';
import employees from './Employees.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { VscSettings } from "react-icons/vsc";

function createData(id, employee, role, dept, date, status, checkIn, checkOut, workHours) {
  return { id, employee, role, dept, date, status, checkIn, checkOut, workHours };
}

const rows = [
  createData(2341421, 'Ahmed Rashdan', 'Help Desk Executive', 'IT Department', '12/02/23', 'Work from Office', '09:00', '18:00', '10h 2m'),
  createData(2341512, 'Ali Alhamdan', 'Senior executive.', 'Marketing', '18/02/23', 'Absent', '00:00', '00:00', '0m'),
  createData(2341128, 'Mona ALghafar', 'Senior Manager', 'Design', '04/01/23', 'Late Arrival', '10:30', '18:00', '8h 2m'),
  createData(2343214, 'Mustafa Adel', 'Director', 'Sales', '05/03/23', 'Work from Home', '09:00', '18:00', '10h 5m'),
  createData(2341524, 'John Neleson', 'Director', 'Development', '24/12/23', 'Work from Office', '09:00', '18:00', '10h 2m'),
  createData(2342135, 'Kadi Manela', 'System Manager.', 'IT Department', '13/02/23', 'Work from Office', '09:00', '18:00', '10h 12m'),
];

export default function Attendance() {
  return (
    <div className={employees.__leaveReq_Table}>
      <TableContainer component={Paper}>
        <div className={employees.__leaveReq_Table_header}>
          <h3 className={employees.__leaveReq_Table_PrimaryText}>Attendance Overview</h3>
          <>
            <button type="button" className={employees.__leaveReq_Table_Button}><VscSettings className={employees.__leaveReq_Table_ButtonICON} /> View Attendance</button>
          </>
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ fontWeight: '500' }}>
              <TableCell>ID</TableCell>
              <TableCell align="center">Employee</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Department</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Check-In</TableCell>
              <TableCell align="center">Check-Out</TableCell>
              <TableCell align="center">Work Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell align="center">{row.employee}</TableCell>
                <TableCell align="center">{row.role}</TableCell>
                <TableCell align="center">{row.dept}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">
                  <span className={row.status.split(" ").join("_")}>{row.status}</span>
                </TableCell>
                <TableCell align="center">
                  <span className={`${row.status.split(" ").join("_")}Text`}>{row.checkIn}</span>
                </TableCell>
                <TableCell align="center">
                  <span className={`${row.status.split(" ").join("_")}Text`}>
                    {row.checkOut}
                  </span>
                </TableCell>
                <TableCell align="center">{row.workHours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
