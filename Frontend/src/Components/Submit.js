import { useState, useEffect } from 'react';
import { useLocation, useParams } from "react-router-dom"
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
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
import { fontSize } from "@mui/system";
import Editor from "@monaco-editor/react";
import Select from 'react-select';
import spinner from './loadjs.gif';
import './CuInv.css';

const App = () => {

  const { p_id } = useParams()

  //const p_id = 1004;


  const [loading, setLoading] = useState(false);

  const [ogname, setogname] = useState("")

	const [userCode, setUserCode] = useState(``);
  const [isJudged, setisJudged] = useState(0);
	const [pageNumber, setPageNumber] = useState(1);
  const [pname, setPname] = useState("");
  const [verdict, setVerdict] = useState("");
  const [tl, setTl] = useState("");
  const [ml, setMl] = useState("");

  const languages = [
		{ value: "c", label: "C" },
		{ value: "cpp", label: "C++" },
		{ value: "python", label: "Python" },
		{ value: "java", label: "Java" },
	];

  const [userLang, setUserLang] = useState("c++");

  function col(vd) {
    if (vd == "ACCEPTED") {
      return "Green";
    } else {
      return "RED";
    }
  } 

    axios.post(`http://localhost:3000/getOGname`, {}).
      then((res) => {
        setogname(res.data.uname);
        console.log(ogname);
        ///setUserOutput(res.data.uname);
      }).then(() => {
        //setLoading(false);
    })

	function submitCode() {
    setLoading(true);
    if (userCode === ``) {
      return
    }


    // Post request to compile endpoint
    axios.post(`http://localhost:3000/judgeSolution`, {
      code: userCode,
      id : p_id,
      name : ogname,
      language: userLang,
    }).
        then((res) => {
          setVerdict("VERDICT : " + res.data.verdict);
          setTl("TIME : " + res.data.Time + " ms");
          setMl("MEMORY : " + res.data.Memory + " KB");
          //setUserOutput(res.data.output);
        }).then(() => {
          setLoading(false);
      })
    }


	return (
    
    <Grid container spacing={2} columns={14} >
        <Grid item xs={8}>
		<Editor
			height="calc(100vh - 200px)"
			width="100%"
			defaultLanguage="python"
			defaultValue=""
      onChange={(value) => { setUserCode(value) }}
			
		/>

    <br></br>
    
    <Select options={languages} value={userLang}
		onChange={(e) => setUserLang(e.value)}
		placeholder={userLang} />
    <button onClick={() => submitCode()}>Submit</button>
        </Grid>
    <Grid item xs={6}>

    {
      loading ? (
        <div className="spinner-box">
        <img src={spinner} alt="Loading..." />
        </div>
      ) : (
        <div>
        <p>{verdict}</p>
        <br></br>
        <p>{tl}</p>
        <br></br>
        <p>{ml}</p>
        </div>
      )
    }


    </Grid>
    </Grid>

	);
};

export default App;