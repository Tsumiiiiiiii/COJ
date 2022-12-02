import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Help, Home, Log, Navbar, Run, SignIn, SignUp, UpContests, UserProfile, CustomInvocation, ProblemSet, Solvers, ViewProblem, AddProblem, Submit, Loginfo, Reginfo } from "./Components";


function App() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          {/* <Route path="/Help" element={<Help />} />
          <Route path="/Run" element={<Run />} />
          <Route path="/Log" element={<Log />} /> */}
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/UpContests" element={<UpContests />} />
          <Route path="/CustomInvocation" element={<CustomInvocation />} />
          <Route path="/ProblemSet" element={<ProblemSet />} />
          <Route path="/Loginfo" element={<Loginfo />} />
          <Route path="/Reginfo" element={<Reginfo />} />
          {/* <Route path="solvers" element={solvers}> */}
            <Route path="/solvers/:p_id" element={<Solvers />}/> // dynamic route

            <Route path="/ViewProblem/:p_id" element={<ViewProblem />}/> // dynamic route

          <Route path="/AddProblem" element={<AddProblem />} />
          <Route path="/Submit/:p_id" element={<Submit />} />
          {/* </Route> */}
          {/* <Route path="*" element={<div align="center" ><img src={require('./Components/404.jpg')} alt="404 Not Found"/></div>} /> */}
        </Routes>
       </BrowserRouter>
        
    );
}

export default App