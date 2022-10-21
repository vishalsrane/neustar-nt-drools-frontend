import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import SelectNewState from './select-new-state'
import EditButton from './edit-button';

import { getAllDn } from '../api/directory-number';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  dn: string,
  resourceState: string,
  currentOcn: string,
  userData: any,
//   protein: number,
) {
  return { dn, resourceState, currentOcn, userData };
}

const rows = [
  createData('9500100134', 'Available', '6010', {"DTText" : "prepaid", "customCode": "123"}),
  createData('9500100135', 'Hold For Loading', '6011', {"DTText" : "prepaid"}),
  createData('9500100136', 'Reserved', '6012', {"DTText" : "prepaid"}),
  createData('9500100137', 'Aging', '6010', {"DTText" : "prepaid"}),
  createData('9500100138', 'Active', '6012', {"DTText" : "prepaid"}),
];



export default function DnManagementTable() {

    const [directoryNumbers, setDirectoryNumbers] = useState([]);

    async function fetchDirNums() {
            const dirNums = await getAllDn();
            console.log(dirNums)
            dirNums.forEach(dn => {
                dn.userData.forEach(
                    ud => { delete ud.id;  delete ud.typeId}
                )
            });
            setDirectoryNumbers(dirNums);
    }
    
    useEffect(() => {
        fetchDirNums()
    }, []);


    
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>DN</StyledTableCell>
            <StyledTableCell align="center">Resource State</StyledTableCell>
            <StyledTableCell align="center">Current OCN</StyledTableCell>
            <StyledTableCell align="center">User Data</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {directoryNumbers && directoryNumbers.map((row) => (
            <StyledTableRow key={row.dn}>
              <StyledTableCell component="th" scope="row">
                {row.dn}
              </StyledTableCell>
              <StyledTableCell align="center">{row.resourceState}</StyledTableCell>
              <StyledTableCell align="center">{row.currentOcn}</StyledTableCell>
              <StyledTableCell align="center">{JSON.stringify(row.userData)}</StyledTableCell>
              <StyledTableCell align="center"><SelectNewState fetchDirNums={fetchDirNums} id={row.id}></SelectNewState></StyledTableCell>
              <StyledTableCell align="center"><EditButton></EditButton></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
