import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { useState } from 'react'

import SideNav from './Components/SideNav'
import Home from './Components/Home'
import ZenMode from './Components/ZenMode'
import Tasks from './Components/Tasks'
import Calendar from './Components/Calendar'
import Notes from './Components/Notes'
import Insights from './Components/Insights'
import Login from './Components/Login'

import {Box, Text, ChakraProvider, Flex, Button} from "@chakra-ui/react"
import './App.css'

import {userData} from './Components/MockData.js';


const App = () => {
  if(!JSON.parse(localStorage.getItem('userData'))){
    localStorage.setItem('userData', JSON.stringify(userData))
  }
  const [isDark, setDark] = useState(false)
  
  

  return (
    <ChakraProvider>
      <Flex background="#F7F8FA" height="100vh" className="App" style={{filter: isDark? "invert(100%) hue-rotate(100deg)" : "invert(0%)"}}>
        <BrowserRouter>
          
          <SideNav toggleDark={() => setDark(!isDark)}/>
          


          <Switch>
            <Route exact path="/tasks" component={JSON.parse(localStorage.getItem('userData')).name == "Not Logged In" ? Login : Tasks}/>
            <Route exact path="/study" component={JSON.parse(localStorage.getItem('userData')).name == "Not Logged In" ? Login : ZenMode}/>
            <Route exact path="/notes" component={JSON.parse(localStorage.getItem('userData')).name == "Not Logged In" ? Login : Notes}/>
            <Route exact path="/insights" component={JSON.parse(localStorage.getItem('userData')).name == "Not Logged In" ? Login : Insights}/>
            <Route exact path="/login" component={JSON.parse(localStorage.getItem('userData')).name == "Not Logged In" ? Login : Tasks}/>
            <Route exact path="/" component={JSON.parse(localStorage.getItem('userData')).name == "Not Logged In" ? Login : Tasks}/>
          </Switch>
          
        </BrowserRouter>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
