import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { useEffect } from 'react'

import SideNav from './Components/SideNav'
import Home from './Components/Home'
import ZenMode from './Components/ZenMode'
import Tasks from './Components/Tasks'
import Calendar from './Components/Calendar'
import Insights from './Components/Insights'

import {Box, Text, ChakraProvider, Flex, Button} from "@chakra-ui/react"
import './App.css'

import userData from './mockUserData.json';
import userDataJs from './Components/MockData.js';

const App = () => {
  if(!localStorage.getItem('userData')){
    localStorage.setItem('userData', JSON.stringify(userDataJs))
  }



  return (
    <ChakraProvider>
      <Flex background="#F7F8FA" height="100vh" className="App">
        <BrowserRouter>
          
          <SideNav/>
          

          <Switch>
            <Route exact path="/tasks" component={Tasks}/>
            <Route exact path="/study" component={ZenMode}/>
            <Route exact path="/calendar" component={Calendar}/>
            <Route exact path="/insights" component={Insights}/>
            <Route exact path="/" component={Tasks}/>
          </Switch>
              
        </BrowserRouter>
      </Flex>
      
    </ChakraProvider>
  );
}

export default App;
