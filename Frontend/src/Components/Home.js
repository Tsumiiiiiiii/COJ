import { Box } from '@mui/material';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        CRIMSON OJ
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//function for conditional rendering of signin and signup



function Home() {
  const navigate = useNavigate();
  return(
    <Box> 
    
    <React.Fragment>
    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel"  >
    <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="3000">
      <img src={require('./Images/Contest_1.jpg')} class="d-block w-100" alt="..." />
    </div>
    <div class="carousel-item" data-bs-interval="3000">
      <img src={require('./Images/Contest_2.jpg')} class="d-block w-100" alt="..." />
    </div>
    <div class="carousel-item" data-bs-interval="3000">
      <img src={require('./Images/Contest_3.jpg')} class="d-block w-100" alt="..." />
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </React.Fragment>
    <React.Fragment >
    <div style={{margin: "20px", padding: "20px  ", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <div class="container" >
    <div class="row">
    <div class="col-sm">
    <div class="card" style={{width: "18rem"}}>
    <img src={require('./Images/Data_structure.jpg')} class="card-img-top" alt="..." />
    <div class="card-body">
    <h5 class="card-title">Data Structure for Competitive Programming</h5>
    <p class="card-text">Anybody can code, even you! But using the codes to solve problems is not something that you can expect anyone to come up with.</p>
    <a href="#" class="btn btn-primary">Read More</a>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div class="container" >
    <div class="row">
    <div class="col-sm">
    <div class="card" style={{width: "18rem"}}>
    <img src={require('./Images/algorithm-1.png')} class="card-img-top" alt="..." />
    <div class="card-body">
    <h5 class="card-title">Why Algorithms are important?</h5>
    <p class="card-text">Anybody can code, even you! But using the codes to solve problems is not something that you can expect anyone to come up with.</p>
    <a href="#" class="btn btn-primary">Read More</a>
    </div>
    </div>
    </div>
    </div>
    </div>

    <div class="container" >
    <div class="row">
    <div class="col-sm">
    <div class="card" style={{width: "18rem"}}>
    <img src={require('./Images/a.jpg')} class="card-img-top" alt="..." />
    <div class="card-body">
    <h5 class="card-title">Problem solving and Green Computing</h5>
    <p class="card-text">Anybody can code, even you! But using the codes to solve problems is not something that you can expect anyone to come up with.</p>
    <a href="#" class="btn btn-primary">Read More</a>
    </div>
    </div>
    </div>
    </div>
    </div>

    </div>
  </React.Fragment>

    <Copyright sx={{ mt: 8, mb: 4 }} />
    </Box>
  );
}
export default Home;
