import {React, useState, useEffect, useContext} from 'react'
import {CheckIcon} from "@chakra-ui/icons"
import {IconButton, Container, Heading, Button, useDisclosure, FormControl, FormLabel, Textarea, NumberInputField} from "@chakra-ui/react"
import {userData} from './MockData';
import SideNav from "./SideNav"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Tooltip from '@material-ui/core/Tooltip';
import MoodIcon from '@material-ui/icons/Mood';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles({
  root: {
    width: 400,
  },
  input: {
    width: 42,
  },
});

function valuetext(value) {
  return `${value}`;
}

const progress = []

const Insights = () => {
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')))
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const date = new Date()
  const [dateString, setDateString] = useState(date.toISOString().split("T")[0]);
  const [dateStringForm, setDateStringForm] = useState(date.toISOString().split("T")[0]);
  const classes = useStyles();
  const [happiness, setHappiness] = useState(5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const formDate = new Date(dateStringForm)
    if (formDate) {
        setDateString(formDate.toISOString().split("T")[0])
    }
  }, [dateStringForm])
  
  const handleSliderChange = (e, newValue) => {
    setHappiness(newValue);
  }

  const updateHappinessScore = (e) => {
    const date = JSON.stringify({dateStringForm})
    const formattedDate = date.slice(19, 29)
    const happyScore = JSON.stringify({happiness})
    const formattedHappiness = parseInt(happyScore.slice(13, happyScore.length - 1))
    const newData = {
      Date: formattedDate,
      Work: 0,
      School: 0,
      Life: 0,
      Exercise: 0,
      Happiness: formattedHappiness
    }
    for(const i in user.workTasks) {
      newData[user.workTasks[i]["tag"]]++;
    }

    const newArr = user.stats

    var isUnique = true
    for(const i in newArr.days) {
      if(newData["Date"] === newArr.days[i]["Date"]) {
        newArr.days[i] = newData
        isUnique = false
      }
    }
    if(isUnique) {
      newArr.days.push(newData)
    }
    setCount(newArr.days.length)
    setUser({...user, stats: newArr})
    console.log(user.stats.days)
}

const handlePredictClick = () => {
  const formData = user.stats.days
  setLoading(true)
  fetch('https://incentiva-backend.herokuapp.com/', 
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(response => {
      setTimeout(() => setLoading(false), 500)
      setResult(response.result)
    });
}

  return (
    <div id="zen-body">
        <Heading size="xl" style={{marginBottom:"30px", color: ""}}>Insights</Heading>
        <Button colorScheme="purple" style={{marginBottom: "30px"}} onClick={handlePredictClick}>
            Generate Insights ({count})
        </Button>
        <br></br>
        <Typography id="discrete-slider" gutterBottom>
            Indicate your happiness level below for today:
        </Typography>
        <br></br>
        <Typography style={{fontWeight: "bold", textAlign: ""}}>
            Current happiness: {happiness}
        </Typography>
        <br></br>
        <div style={{margin: "0px auto", textAlign: "center"}}>
          <div className={classes.root} style={{display: "inline-block"}}>
            <Slider
              defaultValue={5}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={10}
              style={{display: "inline-block"}}
              onChange={handleSliderChange}
            />
            <div style={{width: "100%", justifyContent: "space-between"}}>
              <SentimentVeryDissatisfiedIcon style={{width: "25%"}}/>
              <SentimentDissatisfiedIcon style={{width: "25%"}}/>
              <SentimentSatisfiedIcon style={{width: "25%"}}/>
              <MoodIcon style={{width: "25%"}}/>
            </div>
          </div>
          <Button leftIcon={<CheckIcon/>}  onClick={(e) => updateHappinessScore()} variant="solid" style={{display: "inline-block", marginLeft: "50px", marginBottom: "70px"}}>
              Confirm
          </Button>
        </div>
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <div>
        {result === "" ? null :
            <h5>{result}</h5>
        }
        </div>
    </div>

  );
}

export default Insights;
