import React, { useState } from "react";
import "./RegisterPage.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { registerUser } from "../../api/Index";
import { REGISTER_USER } from "../../api/constants";
import { useDispatch, useSelector } from "react-redux";
import { setSessionToken } from "../../redux/sessionToken";
import { useNavigate } from "react-router-dom";
import { ApiManager } from "../../api/Index";
import { useEffect } from "react";
// setRegisterError({ ...registerError, [prop]: null });

const RegisterPage = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");
    if (sessionToken) {
      console.log("Session Token Found at Register sending to home");
      navigate("/", { replace: true });
    } else {
      console.log("Session Token not found at Register");
    }
  }, [navigate]);

  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const changeHandler = (prop) => {
    return (event) => {
      setRegisterInfo({ ...registerInfo, [prop]: event.target.value });
    };
  };

  const clickHandler = () => {
    if (validateEmail(registerInfo.email) && registerInfo.password !== "") {
      const apiManager = new ApiManager();
      apiManager.registerUser(registerInfo).then((res) => {
        localStorage.setItem("sessionToken", res);
        navigate("/");
      });
    } else {
      alert("Incorrect Email");
    }
  };
  return (
    <Box className="registerpage-wrapper">
      <Box className="registerpage-body">
        <Box className="registerpage-header">
          <Typography>Register</Typography>
        </Box>
        <Box className="registerpage-form">
          {/* <form method="POST"> */}
          <Box className="registerpage-form-body">
            <TextField
              margin="5px"
              required
              id="outlined-required"
              label="Name"
              // placeholder="Name"
              // defaultValue="Name"
              onChange={changeHandler("name")}
            />

            <TextField
              required
              id="outlined-required"
              label="Email"
              // placeholder="Email Id"
              // defaultValue="Email Id"
              onChange={changeHandler("email")}
            />
            <TextField
              required
              id="outlined-required"
              label="Password"
              type="password"
              // placeholder="Name"
              // defaultValue="Password"
              onChange={changeHandler("password")}
            />
            <Button id="register-botton" type="submit" variant="contained" onClick={clickHandler}>
              Register
            </Button>
          </Box>
          {/* </form> */}
        </Box>
      </Box>
    </Box>
  );
};

export { RegisterPage };
