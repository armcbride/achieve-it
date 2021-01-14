import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Redirect } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  nav: {
    background: "linear-gradient(45deg, #3f51b5 10%, #32408f 90%)",
  },
  title: {
    flexGrow: 1,
  },
  btns: {
    background: "linear-gradient(45deg, #3f51b5 10%, #32408f 90%)",
    color: "black",
    height: 35,
    fontSize: 20,
  },
  btn1: {
    background: "linear-gradient(45deg, #32408f 10%,  #3f51b5 90%)",
    color: "black",
    height: 35,
    fontSize: 20,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  const [loggedOut, setLoggedOut] = useState(false);

  const logout = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "/logout",
    }).then((res) => {
      setLoggedOut(true);
    });
  };

  return (
    <div className={classes.root}>
      {loggedOut ? <Redirect to={{ pathname: "/" }} /> : null}
      <AppBar className={classes.nav} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link style={{ textDecoration: "none" }} to={"/dashboard"}>
              <Button className={classes.btn1}>Achieve 2 Believe</Button>
            </Link>
          </Typography>
          <Link style={{ textDecoration: "none" }} to="/">
            <Button className={classes.btns}>Log In</Button>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/logout">
            <Button className={classes.btns} onClick={logout}>
              Log Out
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
