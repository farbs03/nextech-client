import {BrowserRouter, Switch, Route} from 'react-router-dom'

import SideNav from './Components/SideNav'
import Home from './Components/Home'
import ZenMode from './Components/ZenMode'
import Tasks from './Components/Tasks'
import Calendar from './Components/Calendar'
import Insights from './Components/Insights'

import {Box, Text, ChakraProvider, Flex, Button} from "@chakra-ui/react"
import './App.css'



const App = () => {
  return (
    <ChakraProvider>
      <Flex background="#F7F8FA" height="100vh">
        <BrowserRouter>
          
          <SideNav/>
          {/* <Box flexGrow={1} /> */}

          <Switch>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/tasks" component={Tasks}/>
            <Route exact path="/study" component={ZenMode}/>
            <Route exact path="/calendar" component={Calendar}/>
            <Route exact path="/insights" component={Insights}/>
            <Route exact path="/" component={Home}/>
          </Switch>
              
        </BrowserRouter>
      </Flex>
      
    </ChakraProvider>
  );
}

export default App;
