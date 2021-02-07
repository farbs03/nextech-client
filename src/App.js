<<<<<<< HEAD
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './Components/Home'
import Tasks from './Components/Tasks'
import Calendar from './Components/Calendar'
import Insights from './Components/Insights'

=======
import './App.css';

import {Box, Text, ChakraProvider, Flex, Button} from "@chakra-ui/react"
import {CheckIcon} from "@chakra-ui/icons"

import SideNav from './Components/SideNav'
import ZenMode from './Components/ZenMode'
>>>>>>> 814606b9c195a05c5a9b4f71747375062166aa97

function App() {

  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Switch>
        <Route to="/home" component={Home}/>
        <Route to="/tasks" component={Tasks}/>
        <Route to="/calendar" component={Calendar}/>
        <Route to="/insights" component={Insights}/>
        <Route to="/" component={Home}/>
      </Switch>
    </BrowserRouter>
=======
    <ChakraProvider>

      <Flex background="#F7F8FA" height="100vh">

        <SideNav/>
        {/* <Box flexGrow={1} /> */}
        <ZenMode/>

      </Flex>


      {/* <Center height="100vh" flexDirection="column" bg="#F7F8FA">
        <CheckCircleIcon h={50} w={50} color="#303C6C" />
        <Text fontSize="xl" >Incentiva</Text>
      </Center> */}
      
    </ChakraProvider>
>>>>>>> 814606b9c195a05c5a9b4f71747375062166aa97

  );
}

export default App;
