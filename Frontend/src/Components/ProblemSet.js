import { useEffect, useState } from "react"
import axios, * as others from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses }from '@mui/material/TableCell';
import { Button, Container, Grid, Box, ratingClasses } from "@mui/material"
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  elevation : 8,
  color: theme.palette.text.secondary,
}));

function getLink(p_id) {
  let ret = "http://localhost:3001/solvers/" + p_id;
  return ret;
}

function getPDFlink(p_id) {
  let ret = "http://localhost:3001/ViewProblem/" + p_id;
  return ret;
}

function ProblemSet() {

       const [probData, setProbData] = useState([]);

       useEffect(() => {
                async function getUpcomingContests() {
                  let config = {
                      method: "POST",
                      url: 'http://localhost:3000/get_problem_set',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                };
                await axios(config)
                  .then((response) => { 
                    //console.log("THE RESPONSE FROM upcoming contests IS : ", response.data);
                    console.log("PROBLEMSET THINGS", response.data)
                    setProbData(response.data)
                    //console.log(response)          

            }).catch((e) => console.log("ERROR MESSAGE: ", e.message));
        }

        getUpcomingContests()

       

    }, [])

    return (
      <Box>
            <Item>
            <TableContainer >
              <Table align="center" sx={{ minWidth: 650 }} size="small" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style = {{textAlign : "center"}}>#</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Name</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Tag(s)</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Solve Count</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {probData.map((data) => (
                    <StyledTableRow key={data.id}>
                      <StyledTableCell style = {{textAlign : "center"}}> {data.code}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}> <a href = {getPDFlink(data.code)}><u>{data.name}</u></a></StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.tag}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}> <a href = {getLink(data.code)}><u>{data.solve_count}</u></a></StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
      </Box>
    )
}

export default ProblemSet