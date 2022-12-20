import { AppBar, Box, Button, Toolbar } from '@mui/material';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ConditionalRender(props) {
  const navigate = useNavigate();
  let isSignIn = props.isSignIn;
  if (props.isSignIn===false) {
    return (
      <div>
        <Button color="inherit" onClick={() => navigate('Loginfo')}>Sign In</Button>
        {/* <Divider orientation="vertical"  variant="middle" flexItem /> */}
        <Button color="inherit" onClick={() => navigate('Reginfo')}>Sign Up</Button>
    </div>     
    );
  }
  return (
    <Button color="inherit" onClick={() => navigate('UserProfile')}>User Profile</Button>
  );
}

function Navbar () {
  const navigate = useNavigate();
  return (
    <AppBar position="sticky" style={{backgroundColor: "white", color: "black"}}>
      <Toolbar>
      <Box 
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start">
          <Link to="./">
              <img src={require('./Crimson OJ.png')} alt="logo" width="100" height="40" />  
          </Link>
        
        </Box>
        <Box 
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end">
        
        {/* <ConditionalRender isSignIn={false} /> */}
        <Button color="inherit" onClick={() => navigate('Loginfo')}>Sign In</Button>
        <Button color="inherit" onClick={() => navigate('Reginfo')}>Sign Up</Button>
        <Button color="inherit" onClick={() => navigate('UserProfile')}>User-Stats</Button>
        <Button color="inherit" onClick={() => navigate('ProblemSet')}>ProblemSet</Button>
        {/* <Button color="inherit" onClick={() => navigate('Submit')}>Submit</Button> */}
        <Button color="inherit" onClick={() => navigate('CustomInvocation')}>Custom Invocation</Button>
        <Button color="inherit" onClick={() => navigate('UpContests')}>Upcoming-Contests</Button>
        <Button color="inherit" onClick={() => navigate('Help')}>Help</Button>
        <Button color="inherit" onClick={() => navigate('Setting')}>Settings</Button>
        <Button color="inherit" onClick={() => navigate('Ranking')}>Ranking</Button>
        
        {/* <Button color="inherit" onClick={() => navigate('LogOut')}>Log Out</Button> */}
        </Box>
      </Toolbar>
</AppBar>
  ); 
}

export default Navbar;

