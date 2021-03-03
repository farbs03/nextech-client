import {React, useState, useEffect, useContext} from 'react'
import {Box, Text, ChakraProvider, Flex, Button, Heading, Center} from "@chakra-ui/react"
import {CheckIcon} from "@chakra-ui/icons"

import SideNav from "./SideNav"

const Insights = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')))
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handlePredictClick = (event) => {
    const formData = user;
    setIsLoading(true);
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
        setIsLoading(false);
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
        <Heading size="xl" style={{marginBottom:"30px", color: "#6B46C1"}}>Insights</Heading>
        <Button colorScheme="purple" 
          >
            Generate Insights
        </Button>
      </div>
    </div>

  );
}

export default Insights;
