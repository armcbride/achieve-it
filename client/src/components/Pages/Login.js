import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Link, Redirect } from "react-router-dom";
import { Visibility } from "@material-ui/icons";
import Axios from "axios";
import "./login.css";
import { useForm } from "react-hook-form";
// import Signup from '../Signup';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    textAlign: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    padding: 30,
  },
  btns: {
    background: "linear-gradient(45deg, #3f51b5 30%, #32408f 90%)",
    color: "black",
    height: 35,
    fontSize: 20,
  },
  images: {
    flexDirection: "column",
  },
  body: {
    paddingTop: 20,
  },
  form: {
    padding: 20,
    paddingRight: 0,
  },
});

function Login() {
  const classes = useStyles();
  const { register } = useForm();
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      // withCredentials: true,
      url: "/login",
    }).then((res) => setLoggedin(true));
  };

  return (
    <Card className={classes.root}>
      {loggedin ? <Redirect to={{ pathname: "/dashboard/" }} /> : null}
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          Welcome back to Achieve 2 Believe!!! Login to check in on your goals!
        </Typography>

        <form className={classes.form}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="component-outlined">username</InputLabel>
            <OutlinedInput
              name="username"
              type="text"
              label="username"
              // ref={register({ required: "This is required." })}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel htmlFor="component-outlined">password</InputLabel>
            <OutlinedInput
              name="password"
              type={passwordShown ? "text" : "password"}
              label="password"
              onChange={(e) => setLoginPassword(e.target.value)}
              // ref={register({ required: "This is required." })}
            ></OutlinedInput>
          </FormControl>

          <Visibility
            className="togglePassword"
            onClick={togglePasswordVisiblity}
          />
        </form>

        <Button className={classes.btns} onClick={login}>
          Submit{" "}
        </Button>

        <div className={classes.body}>
          Not already a member?{" "}
          <Link style={{ textDecoration: "none" }} to="/Signup">
            <Button className={classes.btns}>Sign Up</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default Login;
