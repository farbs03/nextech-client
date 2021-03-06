import {React, useState, useEffect, useContext, PureComponent} from 'react'
import {CheckIcon} from "@chakra-ui/icons"
import {IconButton, Container, Heading, Button, useDisclosure, FormControl, FormLabel, Textarea, NumberInputField} from "@chakra-ui/react"
import {userData} from './MockData';
import SideNav from "./SideNav"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import MoodIcon from '@material-ui/icons/Mood';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Graphs from "./Graphs"
import HappinessGraph from "./HappinessGraph"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";


const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
  },
  input: {
    width: 42,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function valuetext(value) {
  return `${value}`;
}

const Insights = () => {
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')))
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const date = new Date()
  const [dateString, setDateString] = useState(date.toISOString().split("T")[0]);
  const [dateStringForm, setDateStringForm] = useState(date.toISOString().split("T")[0]);
  const classes = useStyles();
  const [happiness, setHappiness] = useState(5);
  var [count, setCount] = useState(user.stats.days.length);

  useEffect(() => {
    const formDate = new Date(dateStringForm)
    if (formDate) {
        setDateString(formDate.toISOString().split("T")[0])
    }
  }, [dateStringForm])

  useEffect(() => {

    localStorage.setItem('userData', JSON.stringify(user))
    return () => {
        localStorage.setItem('userData', JSON.stringify(user))
    }
  }, [user])

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
      Happiness: formattedHappiness,
    }
    for(const i in user.workTasks) {
      newData[user.workTasks[i]["tag"]]++;
    }

    const newArr = user.stats
    const days = user.days

    var isUnique = true
    for(const i in days) {
      if(newData["Date"] == days[i]["date"]) {
        newArr.days[i] = newData
        isUnique = false
      }
    }
    if(isUnique) {
      newArr.days.push(newData)
      console.log("HI")
    }
    setCount(newArr.days.length)
    setUser({...user, stats: newArr})
    console.log(user.stats.days)
    setResult("")
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
      setTimeout(() => setLoading(false), 200)
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
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {result == "" ? null :
          <div style={{width: "80%", marginRight: "auto", marginLeft: "auto"}}>
            <div style={{textAlign: "center"}}>
              <h2 style={{fontSize: "20px"}}>{result}</h2>
            </div>
            <br></br>
            <h2 style={{fontWeight: "bold", textAlign: "center"}}>Analytics:</h2>
            <br></br>
            <br></br>
            <div style={{width: "45%", display: "inline-block", marginRight: "20px"}}>
              <Graphs data={user.stats.days}/>
            </div>
            <div style={{width: "45%", display: "inline-block", marginLeft: "20px"}}>
              <HappinessGraph data={user.stats.days}/>
            </div>
          </div>
        }
    </div>

  );
}

export default Insights;
