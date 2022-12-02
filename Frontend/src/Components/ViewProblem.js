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

const App = () => {

  const { p_id } = useParams()

  const [pdfData, setpdfData] = useState([]);

  async function getPDF() {
    let config = {
        method: "POST",
        url: 'http://localhost:3000/get_problem_pdf',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            p_id: p_id,
          }
      };
    await axios(config)
    .then((response) => { 
      //console.log("THE RESPONSE FROM upcoming contests IS : ", response.data);
      console.log("PDF THINGS", response.data)
      setpdfData("/problems/" + response.data + ".pdf")
      console.log("PDF THINGS", pdfData)
      //console.log(response)          

      }).catch((e) => console.log("ERROR MESSAGE: ", e.message));
    }

  getPDF()

      

	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

	const goToPrevPage = () =>
		setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

	const goToNextPage = () =>
		setPageNumber(
			pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
		);

	return (
    <Box sx={{ height: 900}} 
    display="flex"    
  justifyContent="center"
  alignItems="center" >

    
      <Box height="90%">
        <nav>
          <button onClick={goToPrevPage}>Prev</button>
          <button onClick={goToNextPage}>Next</button>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </nav>
        
        <Document
          file={pdfData}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </Box>
    </Box>
	);
};

export default App;