import React, { useState } from "react";
import Axios from "axios";

function App() {
  const [pdffile, setpdffile] = useState(null);
  const [infile, setinfile] = useState(null);
  const [outfile, setoutfile] = useState(null);
  const [ptag, setptag] = useState({name :"",});

  const onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photo', pdffile);
    formData.append('photo', infile);
    formData.append('photo', outfile);
    formData.append("name", JSON.stringify(ptag));
    //formData.append("company", );
    let config = {
      method: "POST",
      Headers : {
        Accept: "application/json",
        'content-type' : 'multipart/form-data',
      },
    };

      const url = 'http://localhost:3000/uploadPDF';

   Axios.post(url, formData, config).then((response) => {
    console.log("IMAGE UPLOAD SUCCESS")
   }). catch((err) => {
    console.log("ERROR IS", err.response.data);
   });
  };





  const onPDFChange = (e) => {
    setpdffile(e.target.files[0]);
  };

  const onInputChange = (e) => {
    setinfile(e.target.files[0]);
  };

  const onOutputChange = (e) => {
    setoutfile(e.target.files[0]);
  };

  const onTagChange = (e) => {
    console.log("GIVEN TAG IS : ", e.target.value);
    setptag({name : e.target.value});
  };


  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <h1>PDF of the problem statement</h1>
        <input type = "file" name = "photo" onChange={onPDFChange} />
        <br></br>
        <h1>Input text file</h1>
        <input type = "file" name = "photo" onChange={onInputChange} />
        <br></br>
        <h1>Output text file</h1>
        <input type = "file" name = "photo" onChange={onOutputChange} />
        <br></br>
        <input type = "text" onChange={onTagChange} />
        <br></br>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default App
