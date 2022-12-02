import { useEffect, useState } from "react"
import axios, * as others from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale,LinearScale,PointElement,LineElement, BarElement } from "chart.js"
import { Pie, Line, Bar } from "react-chartjs-2"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses }from '@mui/material/TableCell';
import { Button, Container, Grid, Box, ratingClasses } from "@mui/material"
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation, useParams } from "react-router-dom"
import { fontSize } from "@mui/system";

ChartJS.register(ArcElement, Tooltip, Legend)
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement, BarElement,Title,Tooltip,Legend)


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

function Solvers() {
  const { p_id } = useParams()

  const [solverData, setsolverData] = useState([]);

  const [barChartLabels, setBarChartLabels] = useState([]);
  const [barChartData, setBarChartData] = useState({
        barChartLabels,
        datasets: [
            {
            label: 'Verdict',
            data: [],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    })

  useEffect(() => {
          async function getSolvers() {
            let config = {
                method: "POST",
                url: 'http://localhost:3000/get_problem_solvers',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                  p_id: p_id,
              }
          };
          await axios(config)
            .then((response) => { 
              console.log("SOLVER THINGS AC IS", response.data)
              setsolverData(response.data)        

      }).catch((e) => console.log("ERROR MESSAGE: ", e.message));
  }

  getSolvers()

}, [])

    useEffect(() => {
          async function getProblemVerdicts() {
            let config = {
                method: "POST",
                url: 'http://localhost:3000/get_problem_verdicts',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                  p_id: p_id,
              }
          };
          await axios(config)
            .then((response) => { 
              console.log("SOLVER THINGS", response.data.ac)
              setBarChartData({
                    labels : ['AC', 'WA', 'TLE', 'MLE', 'RTE', 'CLE'],
                    datasets: [
                        {
                            label: 'No. of verdicts',
                            data: [response.data.ac, response.data.wa, response.data.tle, response.data.mle, response.data.rte, response.data.cle],
                            //borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(0, 129, 129, 1)',
                        },
                    ],
              })     

      }).catch((e) => console.log("ERROR MESSAGE: ", e.message));
  }

  getProblemVerdicts()
  
}, [])



  return (
    <Box>
              <Grid container spacing={2} columns={16}>
                
                <Grid item xs={10} style = {{textAlign : "center", fontSize : 30, color : "teal"}}>
                  <b>Accepted solutions for {p_id}</b></Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={10}>
                     <Item>
                    <TableContainer >
              <Table align="center" sx={{ minWidth: 650 }} size="small" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style = {{textAlign : "center"}}>Handle</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Time</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Memory</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {solverData.map((data) => (
                    <StyledTableRow key={data.id}>
                      <StyledTableCell style = {{textAlign : "center"}}> {data.uname}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.tl}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.ml}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
                        </Item>
                </Grid>
                <Grid item xs={1}></Grid>

                <Grid item xs={5}>
                    <Item><Bar
                        data={barChartData}
                        width={345}
                        height={345}
                        options={{ maintainAspectRatio: false}}   
                    />
                  </Item>
                  </Grid>
                </Grid>
    </Box>
  )
}

export default Solvers