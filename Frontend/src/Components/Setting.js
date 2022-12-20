import React, { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import "./Register.css"
//import { useHistory } from 'react-router'

const Setting = () => {
  const [name, setName] = useState("");
  const [validName, setvalidName] = useState('');
  const [email, setEmail] = useState("");
  const [validMail, setvalidMail] = useState('');
  const [password, setPassword] = useState("");
  const [validPass, setvalidPass] = useState('');
  const [confPassword, setConfPassword] = useState("");
  const [cfhandle, setcfhandle] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const addUser = (e) => {
    e.preventDefault();
    console.log("MARAAA");
    try {
      console.log("LMAAAAOOOOO");
      axios({
        method: 'post',
        url: "http://localhost:3000/update_user_info",
        data: {
          email: email,
          password: password,
          confPassword: confPassword,
          cf: cfhandle,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      console.log("SUCCESSSSS");
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      console.log("FAIL");
      setvalidName('Username already exists!');
    }
  };

  const checkUsername = (e) =>{
    setName(e.target.value);
    if(name.length===0) {
      setvalidName('Please enter a username')
    } else {
      setvalidName('');
      return true;
    }
  }

  const regex = /\S+@\S+\.\S+/;
  const checkEmail = (e) =>{
    setEmail(e.target.value);
    if(regex.test(email)===false) {
      setvalidMail('Please enter valid Email')
    } else {
      setvalidMail('');
      return true;
    }
  }


  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const checkPass = (e) =>{
    e.preventDefault();
    setPassword(e.target.value);
    if(e.target.value === confPassword){
      setMsg("");
    } else{
      setMsg('Passwords do not match!');
    }
    //if(passRegex.test(password)){
      //setvalidPass('Please enter a valid password!');
    //} else{
    setvalidPass('');
    return true;
    //}
  }

  const checkConfirmPass = (e) => {
    setConfPassword(e.target.value);
    if(e.target.value===password) {
      setMsg('');
    } else {
      setMsg('');
      return true;
    }
  }

    const checkcfhandle = (e) => {
      setcfhandle(e.target.value);
      setMsg('')
  }



  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={addUser} className="box">

                <div className="field mt-5">
                  <label className="label">Email</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="New Email.."
                      value={email}
                      autoComplete="off"
                      onChange={checkEmail}
                    />
                  </div>
                  <p class="help is-danger">{validMail}</p>
                </div>
                <div className="field mt-5">
                  <label className="label">Codeforces Handle</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="New Codeforces Handle.."
                      value={cfhandle}
                      onChange={checkcfhandle}
                    />
                  </div>
                  <p class="help is-danger">{msg}</p>
                </div>
                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="New Password.."
                      autoComplete="off"
                      value={password}
                      onChange={checkPass}
                    />
                  </div>
                  <p class="help is-danger">{validPass}</p>
                </div>
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Setting;