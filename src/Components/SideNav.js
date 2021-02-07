import React, {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'

import {Box, Flex, Button, Image, IconButton, Avatar, Text, Spacer, Center} from "@chakra-ui/react"
import {  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react"
import {LinkOverlay, LinkBox} from "@chakra-ui/react"
import {CheckIcon, CalendarIcon, SettingsIcon, ViewIcon, StarIcon, Icon, TimeIcon, ArrowRightIcon} from "@chakra-ui/icons"
import {BsFillHouseDoorFill} from "react-icons/bs"

import logo from "../logo2.png"

const NavKeys = [
    {name: "Home", icon: BsFillHouseDoorFill, link: "/home"},
    {name: "Study Mode", icon: TimeIcon, link: "/study"},
    {name: "Tasks Manager", icon: CheckIcon, link: "/tasks"},
    {name: "Calendar", icon: CalendarIcon, link: "/calendar"},
    {name: "Insights", icon: StarIcon, link: "/insights"}
    // {name: "Settings", icon: SettingsIcon}
]


const NavButton = ({name, selected, onClick, Icon, link}) => {

    return(
        <Link to={link}>
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
            bg={selected && "purple.50"}
            >
                {name}

            </Button>
        </Link>
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

    

    const [selected,setSelected] = useState(useLocation().pathname)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const onSelectedChange = (key) => {
        setSelected(key.link);
        onClose()
    }
    

    return(
        <>
            <Button onClick={onOpen} mt="0.5%" ml="0.5%">
                <ArrowRightIcon/>
            </Button>

            <Drawer
                isOpen = {isOpen}
                placement = "left"
                onClose ={onClose}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerHeader>Basic drawer</DrawerHeader>
                        <DrawerContent>
                            <Flex
                                mt="5"
                                w="100%"
                                direction="column"
                                alignItems="center"
                                
                            >
                                <LinkBox m="10px "w="80px" >
                                    
                                    <LinkOverlay href="/">
                                        <Image 
                                            src={logo}
                                        />
                                    </LinkOverlay>
                                    
                                </LinkBox>
                                <Box 
                                    w='90%'
                                    mt="16"
                                >
                            
                                    {selected && NavKeys.map((key) =>
                                        <NavButton 
                                            Icon={key.icon}
                                            onClick={() => onSelectedChange(key)} 
                                            name={key.name} 
                                            selected={key.link == selected}
                                            link={key.link}
                                        />
                                    )}
                        
                                </Box>
                            </Flex>

                            <Spacer />

                            <Flex
                                w="90%"
                                alignItems="center"
                                justifyContent="space-between"
                                mb="5"
                                borderRadius="md"
                            >   
                                <Flex
                                    ml="5%"
                                >
                                    <Avatar bg="purple.500" size="xs" mr="2" ml="2"/>
                                    <Text fontWeight="500">Preston</Text>
                                </Flex>


                                <Box>
                                    <NavIconButton Icon={<SettingsIcon/>}/>
                                    <NavIconButton Icon={<ViewIcon/>}/>
                                </Box>
            

                            </Flex>
        


                        </DrawerContent>
                    </DrawerContent>
                </DrawerOverlay>


            </Drawer>

        </>

    )

}

export default Nav

