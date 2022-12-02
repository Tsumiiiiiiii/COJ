import React, { useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import "./login.css"

const Login = () => {
  const [usernameORemail, setusernameORemail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    await axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      data: {
        usernameORemail: usernameORemail,
        password: password,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      const status = response.data.vd
      console.log("SUCCESS", response.data, response.data.vd)
      if (status === 1) {
          console.log("success LOGIN", );
          navigate("/");
      } else {
        setMsg('Invalid username or password!');
      }
    })
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={Auth} className="box">
                <p className="has-text-centered help is-danger">{msg}</p>
                <div className="field mt-5">
                  <label className="label">Email or Username</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Username"
                      value={usernameORemail}
                      onChange={(e) => setusernameORemail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <p>Don't have an account?</p>
                  <a href="http://localhost:3001/Reginfo">Sign Up</a>
                </div>
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">
                    Login
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

export default Login;