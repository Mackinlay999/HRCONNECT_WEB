import * as React from 'react';
import employees from './Employees.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
function createData(candidateName, id, role, leaveDate, attachment) {
  return { candidateName, id, role, leaveDate, attachment };
}

const rows = [
  createData('Charlie Kristin', 2341421, 'Sr. UX Designer', '12/02/23', 'Accept'),
  createData('Malaika Brown', 2341512, 'Growth Manager', '18/02/23', 'Reject'),
  createData('Simon Minister', 2341128, 'Financial Analyst', '04/01/23', 'Reject'),
  createData('Ashley Brookey', 2343214, 'Financial Analyst', '05/03/23', 'Accept'),
  createData('Nishant Talwar', 2341524, 'Sr. UX Designer', '24/12/23', 'Accept'),
  createData('Mark Jacobs', 2342135, 'Growth Manager', '13/02/23', 'Reject'),
];

export default function LeaveRequests() {
  return (
    <div className={employees.__leaveReq_Table}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>CANDIDATE NAME</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">ROLE</TableCell>
              <TableCell align="right">LEAVE DATE</TableCell>
              <TableCell align="right">ATTACHMENTS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{row.candidateName}</TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.role}</TableCell>
                <TableCell align="right">{row.leaveDate}</TableCell>
                <TableCell align="right">

                  <button className={employees.attachment__buttons} type="button">Reject <RxCross2 className={employees.attachmentButton_Icon}/></button>
                  
                  <button className={employees.attachment__buttons} type="button">Accept <IoMdCheckmark className={employees.attachmentButton_Icon}/></button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}