import {Box, Text, ChakraProvider, Flex, Button, Container, Center, Image, Stack} from "@chakra-ui/react"
import {CheckIcon} from "@chakra-ui/icons"

import SideNav from "./SideNav"

import logo from "../logo2.png"


function Home() {


  return (
    <Flex 
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        w={1400}
      >
        <Stack direction="column">
          <Center mt="50px">
            <Text fontSize="30px" fontWeight="bold">Incentiva</Text>
            <br></br>
          </Center>
          <Image
                boxSize="130px"
                src={logo}
            />
        </Stack>
    </Flex>
  );
}

export default Home;
