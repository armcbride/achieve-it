import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Visibility } from "@material-ui/icons";
import Axios from "axios";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    justifyContent: "center",
  },
  card: {
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontweight: "bold",
    fontsyle: "italic",
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

export default function Signup() {
  const classes = useStyles();
  const { register } = useForm();
  const [signupUsername, setsignupUsername] = useState("");
  const [signupPassword, setsignupPassword] = useState("");
  const [signedIn, setSignedin] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const signup = () => {
    Axios({
      method: "POST",
      data: {
        username: signupUsername,
        password: signupPassword,
      },
      withCredentials: true,
      url: "/signup",
    }).then((res) => setSignedin(true));
  };

  return (
    <Card className={classes.root}>
      {signedIn ? <Redirect to={{ pathname: "/" }} /> : null}
      <CardContent className={classes.card}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Signup
        </Typography>
        <form>
          <Typography variant="h5" component="h2">
            <FormControl variant="outlined">
              <InputLabel htmlFor="component-outlined">Username</InputLabel>
              <OutlinedInput
                name="username"
                id="component-outlined"
                // ref={register({ required: "This is required." })}
                onChange={(e) => setsignupUsername(e.target.value)}
                label="username"
              />
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="component-outlined">Password</InputLabel>
              <OutlinedInput
                name="password"
                id="component-outlined"
                type={passwordShown ? "text" : "password"}
                onChange={(e) => setsignupPassword(e.target.value)}
                label="password"
                // ref={register({ required: "This is required." })}
              />
            </FormControl>
            <Visibility
              className="togglePassword"
              onClick={togglePasswordVisiblity}
            />
            <Button className={classes.btns} onClick={signup}>
              Submit{" "}
            </Button>
          </Typography>
        </form>
      </CardContent>
    </Card>
  );
}
