

import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});



export default function GoalCard(props) {
  const classes = useStyles();
const [goalData, setGoalData] = useState("")
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
       
        <Typography variant="h5" component="h2">
          Goal title here {props.goal}
        </Typography>
        
        <Typography variant="body2" component="p">
          Goal task here {props.task}
          <br />
      
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
         date and time to complete goal {props.date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">edit goal</Button>
        <Button size="small">complete goal</Button>
      </CardActions>
    </Card>
  );
}
