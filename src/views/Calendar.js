import {Box, Text, ChakraProvider, Flex, Button} from "@chakra-ui/react"
import {CheckIcon} from "@chakra-ui/icons"

import SideNav from "../Components/SideNav"

function Calendar() {



  return (
    <ChakraProvider>

      <Flex background="#F7F8FA" height="100vh">

        <SideNav/>
        <Box flexGrow={1} />
        

      </Flex>


      {/* <Center height="100vh" flexDirection="column" bg="#F7F8FA">
        <CheckCircleIcon h={50} w={50} color="#303C6C" />
        <Text fontSize="xl" >Incentiva</Text>
      </Center> */}
    </ChakraProvider>

  );
}

export default Calendar;
