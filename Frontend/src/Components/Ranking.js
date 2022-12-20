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
  align : 'center',
  color: theme.palette.text.secondary,
}));


function Ranking() {

      const [cfdata, setcfData] = useState([]);

      

       useEffect(() => {
                async function getRanks() {
                  let config = {
                      method: "POST",
                      url: 'http://localhost:3000/get_ranks',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                };
                await axios(config)
                  .then((response) => { 
                    //console.log("THE RESPONSE FROM upcoming contests IS : ", response.data);
                    console.log("RANK THINGS", response.data)

                    setcfData(response.data)
                  
                    //console.log(response)          

            }).catch((e) => console.log("ERROR MESSAGE: ", e.message));
        }

        getRanks()

       

    }, [])

      return (
        <Box>
          <Item>
            <TableContainer >
              <Table align="center" sx={{ minWidth: 650 }} size="small" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style = {{textAlign : "center"}}>#</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Handle</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Solve Count</StyledTableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cfdata.map((data) => (
                    <StyledTableRow key={data.id}>
                      <StyledTableCell style = {{textAlign : "left"}}> {data.cur}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.k}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.v}</StyledTableCell>
                      
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
          

        </Box>
    );
}

export default Ranking