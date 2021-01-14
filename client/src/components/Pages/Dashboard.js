import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Calendar from "../Calendar";
import { UserContext } from "../libs/UserContext";
import Goal from "../Goal";
import GoalCard from "../GoalCard";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    fontSize: 22,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const [goals, setGoals] = useState([]);

  const getGoals = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "/dashboard/goals",
    })
      .then((res) => {
        console.log(res.data);
        setGoals(res.data.goals);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(getGoals, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            Welcome To Achieve 2 Believe, an application to keep yourself
            accountable and organized in terms of your goals and dreams<hr></hr>
          </Paper>
        </Grid>
        <UserContext.Provider value={{}}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              {/* the magnificent calendar */}
              <Calendar />
            </Paper>
          </Grid>

          {/* Need to render the goal input inside the following grid item so it renders beside the calendar on the page */}
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>Your Goals</Paper>
            <Paper className={classes.paper}>
              <Goal getGoals={getGoals} />
            </Paper>
            {
              ///////Map goal card instead prop down into goal card  - props.goal and props.task; in side goal card opening tag,
            }
            {goals.map((goal) => (
              <GoalCard
                className={classes.paper}
                key={goal._id}
                title={goal.title}
                task={goal.task}
                start={goal.start}
              ></GoalCard>
            ))}
          </Grid>
        </UserContext.Provider>
      </Grid>
    </div>
  );
}
