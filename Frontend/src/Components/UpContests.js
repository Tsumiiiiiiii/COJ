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


function UpContests() {

      const [cfdata, setcfData] = useState([]);
      const [ccdata, setccData] = useState([]);
      const [acdata, setacData] = useState([]);
      const [spdata, setspData] = useState([]);
      const [hedata, setheData] = useState([]);
      const [lodata, setloData] = useState([]);
      const [todata, settoData] = useState([]);
      const [otdata, setotData] = useState([]);

      

       useEffect(() => {
                async function getUpcomingContests() {
                  let config = {
                      method: "POST",
                      url: 'http://localhost:3000/get_upcoming_contests',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                };
                await axios(config)
                  .then((response) => { 
                    //console.log("THE RESPONSE FROM upcoming contests IS : ", response.data);
                    console.log("CF THINGS", response.data["cf"])

                    setcfData(response.data["cf"])
                    setccData(response.data["cc"])
                    setacData(response.data["ac"])
                    setspData(response.data["sp"])
                    setheData(response.data["he"])
                    setloData(response.data["lo"])
                    settoData(response.data["to"])
                    setotData(response.data["ot"])
                  
                    //console.log(response)          

            }).catch((e) => console.log("ERROR MESSAGE: ", e.message));
        }

        getUpcomingContests()

       

    }, [])

      return (
        <Box>
          <Item>
            <img src="https://codeforces.org/s/29321/images/codeforces-sponsored-by-ton.png" alt="CodeForces" height="200" width="160" />
            <TableContainer >
              <Table align="center" sx={{ minWidth: 650 }} size="small" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style = {{textAlign : "center"}}>Contest</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Start Time</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>End Time</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Duration</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cfdata.map((data) => (
                    <StyledTableRow key={data.id}>
                      <StyledTableCell style = {{textAlign : "left"}}> <a href = {data.link} target = "_blank"> <u>{data.name}</u></a></StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.st}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.ed}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.du}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
          <br></br>
          <Item>
            <img src="https://cdn.codechef.com/images/cc-logo.svg" alt="CodeChef" height="200" width="160"/>
            <TableContainer >
              <Table align="center" sx={{ minWidth: 650 }} size="small" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style = {{textAlign : "center"}}>Contest</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Start Time</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>End Time</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Duration</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ccdata.map((data) => (
                    <StyledTableRow key={data.id}>
                      <StyledTableCell style = {{textAlign : "left"}}> <a href = {data.link} target = "_blank"> <u>{data.name}</u></a></StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.st}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.ed}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.du}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
          <br></br>
          <Item>
            <img src="https://img.atcoder.jp/assets/atcoder.png" alt="AtCoder" height="200" width="160"/>
            <TableContainer >
              <Table align="center" sx={{ minWidth: 650 }} size="small" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style = {{textAlign : "center"}}>Contest</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Start Time</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>End Time</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Duration</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {acdata.map((data) => (
                    <StyledTableRow key={data.id}>
                      <StyledTableCell style = {{textAlign : "left"}}> <a href = {data.link} target = "_blank"> <u>{data.name}</u></a></StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.st}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.ed}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.du}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
     
          <br></br>
          <Item>
            <img src="https://stx1.spoj.com/gfx/2015e.png" alt="SPOJ" height="200" width="160"/>
            <TableContainer >
              <Table align="center" sx={{ minWidth: 650 }} size="small" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style = {{textAlign : "center"}}>Contest</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Start Time</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>End Time</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Duration</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {spdata.map((data) => (
                    <StyledTableRow key={data.id}>
                      <StyledTableCell style = {{textAlign : "left"}}> <a href = {data.link} target = "_blank"> <u>{data.name}</u></a></StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.st}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.ed}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.du}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
     
          <br></br>
          <Item>
            <img src="https://static-fastly.hackerearth.com/newton/static/images/he-header-logo.svg" alt="HackerEarth" height="200" width="160"/>
            <TableContainer >
              <Table align="center" sx={{ minWidth: 650 }} size="small" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style = {{textAlign : "center"}}>Contest</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Start Time</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>End Time</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Duration</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hedata.map((data) => (
                    <StyledTableRow key={data.id}>
                      <StyledTableCell style = {{textAlign : "left"}}> <a href = {data.link} target = "_blank"> <u>{data.name}</u></a></StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.st}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.ed}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.du}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
    
          <br></br>
          <Item>
            <img src="https://lightoj.com/loj-og-image.png" alt="LightOJ" height="200" width="160"/>
            <TableContainer >
              <Table align="center" sx={{ minWidth: 650 }} size="small" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style = {{textAlign : "center"}}>Contest</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Start Time</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>End Time</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Duration</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lodata.map((data) => (
                    <StyledTableRow key={data.id}>
                      <StyledTableCell style = {{textAlign : "left"}}> <a href = {data.link} target = "_blank"> <u>{data.name}</u></a></StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.st}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.ed}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.du}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>

          <br></br>
          <Item>
            <img src="https://static.toph.co/images/logo.png?_=f76bdcf12c6acbf239a6e1b395ce7729b71e6c25" alt="Toph" height="200" width="160"/>
            <TableContainer >
              <Table align="center" sx={{ minWidth: 650 }} size="small" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style = {{textAlign : "center"}}>Contest</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Start Time</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>End Time</StyledTableCell>
                    <StyledTableCell style = {{textAlign : "center"}}>Duration</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todata.map((data) => (
                    <StyledTableRow key={data.id}>
                      <StyledTableCell style = {{textAlign : "left"}}> <a href = {data.link} target = "_blank"> <u>{data.name}</u></a></StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.st}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.ed}</StyledTableCell>
                      <StyledTableCell style = {{textAlign : "center"}}>{data.du}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>     

        </Box>
    );
}

export default UpContests