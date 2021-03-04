import {React, useState, useEffect, useContext} from 'react'
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, NumberInput} from "@chakra-ui/react"
import {Menu, MenuButton, MenuList, MenuItem} from "@chakra-ui/react"
import {ChevronDownIcon} from "@chakra-ui/icons"
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

const useStyles = makeStyles({
  root: {
    width: 300,
  },
  input: {
    width: 42,
  },
});

const Insights = () => {
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')))
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const date = new Date()
  const [dateString, setDateString] = useState(date.toISOString().split("T")[0]);
  const [dateStringForm, setDateStringForm] = useState(date.toISOString().split("T")[0]);
  const classes = useStyles();
  const [value, setValue] = useState(5);

  function valuetext(value) {
    return `${value}°C`;
  }

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 10) {
      setValue(10);
    }
  };

  const handlePredictClick = (event) => {
    const formData = this.user;
    fetch('http://127.0.0.1:5000/prediction/', 
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
        setResult(response.result)
        setLoading(false);
      });
  }

  const handleCancelClick = (event) => {
    this.setState(
      { result: "" }
    );
  }

  return (
    <div id="zen-body">
      <div style={{alignItems:"center", justifyContent:"space-between", margin:"auto"}}>

        <Heading size="xl" style={{marginBottom:"30px", color: ""}}>Insights</Heading>
        <Button colorScheme="purple" style={{marginBottom: "30px"}}>
            Generate Insights
        </Button>
        <br></br>
        <Input type="date" value={dateStringForm} style={{width:"200px", marginBottom: "30px"}} onChange = {e => setDateStringForm(e.target.value)}/>
        <br></br>
        <div className={classes.root}>
          <Typography id="discrete-slider" gutterBottom>
            Indicate your happiness level below:
          </Typography>
          <Slider
            defaultValue={5}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={10}
          />
        </div>
        <div style={{width: "350px", justifyContent: "space-between"}}>
          <SentimentVeryDissatisfiedIcon style={{marginRight: "70px"}}/>
          <SentimentDissatisfiedIcon style={{marginRight: "65px"}}/>
          <SentimentSatisfiedIcon style={{marginRight: "70px"}}/>
          <MoodIcon/>
        </div>
      </div>
    </div>

  );
}

export default Insights;
