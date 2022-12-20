import { useLocation } from "react-router-dom"
//import axios from "axios"
import axios, * as others from 'axios';
import { Button, Container, Grid, Box, ratingClasses } from "@mui/material"
import { useEffect, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale,LinearScale,PointElement,LineElement, BarElement } from "chart.js"
import { Pie, Line, Bar } from "react-chartjs-2"
import { styled } from '@mui/material/styles'; 
import Paper from '@mui/material/Paper';
import spinner from './loadjs.gif';
//import faker from 'faker';
import { postData } from "./utility";


//const Axios = require("axios");

let name = "sad_panda"

ChartJS.register(ArcElement, Tooltip, Legend)
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement, BarElement,Title,Tooltip,Legend)

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  elevation : 8,
  color: theme.palette.text.secondary,
}));



function Profile(props) {

    
    const location = useLocation()

        const [pieChartData, setPieChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Verdict Percentages",
                data: [],
                backgroundColor: [
                    "rgba(0, 128, 0, 1)",
                    "rgba(255, 0, 0, 1)",
                    "rgba(0, 0, 255, 1)",
                    "rgba(160, 32, 240, 1)",
                    "rgba(255,255,0, 1)",
                    "rgba(0, 255, 255, 1)",
                    "rgba(211,211,211, 1)"
                ],
                borderWidth: 1,
            },
        ],
    })

    const [purl, setpurl] = useState("")
    const [pname, setpname] = useState("")
    const [prating, setprating] = useState("")
    const [ratingcolor, setratingcolor] = useState("")
    const [lineChartLabels, setLineChartLabels] = useState([]);
    const [isError, setError] = useState(false);
    const [notLoading, setnotLoading] = useState(false);
    const labels = []
    const blabels = []
    const [lineChartData, setlineChartData] = useState({
        lineChartLabels,
        datasets: [
        
        {
            label: 'Contest Rating History',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
    })
    const [barChartLabels, setBarChartLabels] = useState([]);
    const [barChartData, setBarChartData] = useState({
        barChartLabels,
        datasets: [
            {
            label: 'Problem Rating',
            data: [],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    })
    //const username = location.pathname.split("/").at(-1)

    //const [name, setname] = useState("")

    
      
    
    useEffect(() => {

        //setnotLoading(false);
        

    axios.post(`http://localhost:3000/getCFHandle`, {}).
      then((res) => {
        //setname(res.data.uname);
        name = res.data.cf_handle;
        console.log("Name", name);
        ///setUserOutput(res.data.uname);
      }).then(() => {
        //setLoading(false);



    //})




        async function getUserVerdictCount() {
            let config = {
              method: "POST",
              url: 'http://localhost:3000/cf_user_verdict_count',
              headers: {
                'Content-Type': 'application/json'
              },
              data: {
                name: name,
              }
            };


              await axios(config)
                .then((response) => { 
                  //console.log("THE RESPONSE FROM BACKEND IS : ", response.data);
                  console.log("THE VERDICT CHART IS", response.data)

                  if (response.data == '') setError(true);
                              if (response.data[0] > 0) {setPieChartData({
                labels: ["AC", "WA", "TLE", "MLE", "RE", "CE", "OTHERS"],
                datasets: [
                    {
                        label: "Verdict Count",
                        data: response.data,
                        backgroundColor: [
                            "rgba(0, 128, 0, 1)",
                            "rgba(255, 0, 0, 1)",
                            "rgba(0, 0, 255, 1)",
                            "rgba(160, 32, 240, 1)",
                            "rgba(255,255,0, 1)",
                            "rgba(0, 255, 255, 1)",
                            "rgba(211,211,211, 1)"
                        ],
                        borderWidth: 1,
                    },
                ],
            })}
            else {
                //setError(true);
            }

            }).catch((e) => console.log("ERROR MESSAGE: ", e.message));



        }

        getUserVerdictCount()

       
        
        function fcolor(rat) {
            const rating = parseInt(rat);
            //console.log("RATING IS", typeof(rating), rating)
            let col = "black";
            if (rating >= 2400) {
                col = "red"
            } else if (rating >= 2300) {
                col = "orange"
            } else if (rating >= 2100) {
                col = "yellow"
            } else if (rating >= 1900) {
                col = "purple"
            } else if (rating >= 1600) {
                col = "blue"
            } else if (rating >= 1400) {
                col = "cyan"
            } else if (rating >= 1200) {
                col = "green"
            }
            return col;
        }


       

                async function getRatingHistory() {
            let config = {
                method: "POST",
                url: 'http://localhost:3000/cf_user_rating_history',
                headers: {
                    'Content-Type': 'application/json'
                },
              data: {
                name: name,
              }
            };
         await axios(config)
                .then((response) => { 
                  console.log("THE RESPONSE FROM BACKEND IS : ", response.data[0]);
                    let ar = [];
                    for (let i = 0; i < response.data.length; ++i) {
                        ar.push("fd");
                    }
                    // console.log("helo", response.data.length)
                    while(labels.length < response.data.length) {
                        labels.push(" ")
                    }
                    if (response.data[0] > 0) setLineChartLabels(ar);
                  if (response.data[0] > 0) setlineChartData({
                        labels,
                        datasets: [
                            {
                                label: 'Contest Rating History',
                                data: response.data,
                                borderColor: 'rgb(255, 99, 132)',
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            },
                        ],
                  })
                  
                    console.log(lineChartData)          

            }).catch((e) => console.log("ERROR MESSAGE: ", e.message));
        }

        getRatingHistory()


        
            async function getProfileInfo() {
            let config = {
                method: "POST",
                url: 'http://localhost:3000/cf_user_profile_info',
                headers: {
                    'Content-Type': 'application/json'
                },
              data: {
                name: name,
              }
            };
         await axios(config)
                .then((response) => { 
                  console.log("THE RESPONSE FROM PICTUREEEEEE IS : ", response.data);
                  if (response.data === '') {
                    setError(true);
                  }
                  setpurl(response.data.titlePhoto);
                  setpname(response.data.handle);
                  setprating(response.data.rating);
                  setratingcolor(fcolor(response.data.rating));

                  console.log("THE COLOR IS", ratingcolor);
                              

            }).catch((e) => console.log("ERROR MESSAGE: ", e.message));
        }


        getProfileInfo()

       

                async function getProbRating() {
            let config = {
                method: "POST",
                url: 'http://localhost:3000/cf_prob_rating',
                headers: {
                    'Content-Type': 'application/json'
                },
              data: {
                name: name,
              }
            };
         await axios(config)
                .then((response) => { 
                  console.log("THE RESPONSE FROM BACKEND REGARDING PROBLEM RATING IS : ", response.data);
                    setBarChartLabels(response.data);
                  setBarChartData({
                        labels : [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 3000, 3100, 3200, 3300, 3400, 3500, 3600],
                        datasets: [
                            {
                                label: 'No. of solves',
                                data: response.data,
                                //borderColor: 'rgb(255, 99, 132)',
                                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                            },
                        ],
                  })
                  
                    console.log("BAR CHART", barChartData)          

            }).catch((e) => console.log("ERROR MESSAGE: ", e.message));
        }

        getProbRating()

       

    }).then(() => {
        console.log("ALLL DONEEEEEE ?")
        setnotLoading(true);
    })

        }, [])


    return (
        <div>
        {!isError ? (
        //<Container component="main" alignItems="center">
            //<div>
            <Box> 
            <Grid container spacing={2} columns={16}>
                <Grid item xs={5}>
                     <Item><img src={purl} alt="Profile Image"/>
                        <h3>Username: <span style={{color:ratingcolor}}><b>{pname}</b></span></h3></Item>
                </Grid>
                <Grid item xs={11}>
                    <Item><Line
                        data={lineChartData}
                        width={345}
                        height={345}
                        options={{ maintainAspectRatio: false}}   
                    />
                    </Item>
                    <br></br>
                    <Item><Pie
                        data={pieChartData}
                        width={345}
                        height={345}
                        options={{ maintainAspectRatio: false}}   
                    />
                    </Item>
                    <br></br>
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
         //</div>
        ) : (
            <div>
			<p>Error! Make sure the CF handle entered is a valid one!</p>
			</div>
        )
        //</Container>
        }
    </div>
    )
}

export default Profile