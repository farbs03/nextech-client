import './App.css';

import {Center, Text, ChakraProvider} from "@chakra-ui/react"
import {CheckCircleIcon} from "@chakra-ui/icons"

function App() {



  return (
    <ChakraProvider>
      <Center height="100vh" flexDirection="column">
        <CheckCircleIcon h={50} w={50} color="#303C6C" />
        <Text fontSize="xl" >Incentiva</Text>
      </Center>
    </ChakraProvider>

  );
}

export default App;
