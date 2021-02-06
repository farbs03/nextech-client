import React, {useState} from 'react'

import {Box, Flex, Button, Image, IconButton, Avatar, Text} from "@chakra-ui/react"
import {CheckIcon, CalendarIcon, SettingsIcon, ViewIcon, StarIcon} from "@chakra-ui/icons"

import logo from "../logo2.png"

const NavKeys = [
    {name: "Tasks", icon: CheckIcon},
    {name: "Calendar", icon: CalendarIcon},
    {name: "Insights", icon: StarIcon}
    // {name: "Settings", icon: SettingsIcon}
]


const NavButton = ({name, selected, onClick,Icon}) => {



    return(
        <Button 
        leftIcon={<Icon marginRight="1.5"/>}
        m="5px 0px" // why is mt="md" not working??
        borderRadius="lg"
        colorScheme={selected ? "purple" : "gray"}
        variant="ghost"
        isFullWidth
        justifyContent="flex-start"
        alignItems="center"
        onClick={onClick}
        _focus=""
        fontWeight="500"
        bg={selected && "purple.50"}

    >
        {name}

    </Button>
    )
}

const NavIconButton = ({Icon, selected}) => {
    return(
        <IconButton 
        icon={Icon}
       
        ml="2px" // why is mt="md" not working??
        borderRadius="lg"
        colorScheme="gray"
        variant="ghost"
        _focus=""
        bg={selected && "purple.50"}
        _hover={{
            bg: "purple.50",
            color: "purple.500"
        }}
        

    >


    </IconButton>
    )
}

const Nav = () => {

    const [selected,setSelected] = useState("Tasks")




    return(
      <Flex 
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        w={275}
        background="white" 
        style={{boxShadow: "2px 0px 12px rgba(0,0,0,0.1)"}}
      > 

        <Flex
            mt="5"
            w="90%"
            direction="column"
            alignItems="center"
        >
            <Image 
                alignSelf="flex-start"
                src={logo}
                m="10px"
                w="60px" w="60px"
            />

            <Box 
            w='100%'
            mt="20"
            >
            
                {selected && NavKeys.map((key) => 
                    <NavButton 
                        Icon={key.icon}
                        onClick={() => setSelected(key.name)} 
                        name={key.name} 
                        selected={key.name == selected}
                    />
                )}
        
            </Box>
        </Flex>
      
        
        <Flex
         w="90%"
         alignItems="center"
         justifyContent="space-between"
         mb="5"
         borderRadius="md"
        >   
            <Flex>
                <Avatar bg="purple.500" size="xs" mr="2" ml="2"/>
                <Text fontWeight="500">Preston</Text>
            </Flex>


            <Box>
                <NavIconButton Icon={<SettingsIcon/>}/>
                <NavIconButton Icon={<ViewIcon/>}/>
            </Box>
            

        </Flex>
        {/* <Image src={Logo} h={20} w={20}/> */}

       

      </Flex>
    )

}

export default Nav

