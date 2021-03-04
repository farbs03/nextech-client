import React, {useState, useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'

import {Box, Flex, Button, Image, IconButton, Avatar, Text, Spacer, Center, useTimeout} from "@chakra-ui/react"
import {  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react"
import {LinkOverlay, LinkBox} from "@chakra-ui/react"
import {CheckIcon, CalendarIcon, SettingsIcon, ViewIcon, StarIcon, Icon, TimeIcon, ArrowRightIcon, MoonIcon} from "@chakra-ui/icons"
import {PaperClipOutlined, LogoutOutlined } from "@ant-design/icons"
import useMedia from '../hooks/useMedia'

import logo from "../logo2.png"




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
        ></IconButton>
    )
}

const Nav = ({toggleDark}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const onSelectedChange = (key) => {
        setSelected(key.link);
        onClose()
    }
    
    const [data, SetData] = useState(JSON.parse(localStorage.getItem('userData')))
    
    
        useEffect(() => {
    
            localStorage.setItem('userData', JSON.stringify(data))
            return () => {
                localStorage.setItem('userData', JSON.stringify(data))
            }
        }, [data])
        
    
    let NavKeys =[]    

    if(data.name != "Not Logged In"){
        NavKeys = [
            {name: "Tasks Manager", icon: CheckIcon, link: "/tasks"},
            {name: "Study Mode", icon: TimeIcon, link: "/study"},
            {name: "Notes", icon: PaperClipOutlined, link: "/notes"},
            {name: "Insights", icon: StarIcon, link: "/insights"}
            // {name: "Settings", icon: SettingsIcon}
        ]
    } else {
        NavKeys = [
            {name: "Login", icon: CheckIcon, link: "/login"},
        ]
    }

    useEffect(() => {
        if(data.name != "Not Logged In"){
            NavKeys = [
                {name: "Tasks Manager", icon: CheckIcon, link: "/tasks"},
                {name: "Study Mode", icon: TimeIcon, link: "/study"},
                {name: "Notes", icon: PaperClipOutlined, link: "/notes"},
                {name: "Insights", icon: StarIcon, link: "/insights"}
                // {name: "Settings", icon: SettingsIcon}
            ]
        } else {
            NavKeys = [
                {name: "Login", icon: CheckIcon, link: "/login"},
            ]
        }
        

    })

    const path = useLocation().pathname
    useEffect(() => {
        setSelected(JSON.parse(localStorage.getItem('userData')).name == "Not Logged In" ? "/login" : path)
    }, [JSON.parse(localStorage.getItem('userData')).name])

    

    const defaultPath = path === "/" ? NavKeys[0].link : path
    const [selected,setSelected] = useState(defaultPath)
    
    const studyMode = path == '/study' ? true : false
    const mobile = useMedia(['(min-width: 750px)', '(max-width: 750px)'], [false, true])
    
    if(!mobile && !studyMode){
        
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
                    <LinkBox m="10px" w="100px">
                        <LinkOverlay href="/">
                            <Image 
                                src={logo}
                            />
                        </LinkOverlay>
                    </LinkBox>

                    <Box 
                    w='100%'
                    mt="16"
                    >
                    
                        {selected && NavKeys.map((key) =>
                            <NavButton 
                                Icon={key.icon}
                                onClick={() => setSelected(key.link)} 
                                name={key.name} 
                                selected={key.link == selected}
                                link={key.link}
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
                        <Text fontWeight="500">{data.name}</Text>
                    </Flex>


                    <Box>
                        <span onClick={() => {
                            SetData({...data, name:"Not Logged In"})
                            window.location.reload()
                            }}>
                            <NavIconButton Icon={<LogoutOutlined />}/>
                            
                        </span>
                        <span onClick={() => toggleDark()}>
                            <NavIconButton Icon={<MoonIcon/>}/>
                        </span>
                    </Box>
                    

                </Flex>
                {/* <Image src={Logo} h={20} w={20}/> */}

        

            </Flex>

        )

    }else if (studyMode || mobile){
        return(
            <>
                

                <Button style={{position: "absolute"}} onClick={onOpen} mt="2%" ml="2%">
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
                                    
                                    
                                    <LinkBox m="10px "w="100px" >
                                        
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
                                        <Text fontWeight="500">{data.name}</Text>
                                    </Flex>

                                    
                                    <Box>
                                    <span onClick={() => {
                                            SetData({...data, name:"Not Logged In"})
                                            window.location.reload()
                                            
                                        }}>
                                        <NavIconButton Icon={<LogoutOutlined />}/>
                                    </span>
                                        <span onClick={() => toggleDark()}>
                                            <NavIconButton Icon={<MoonIcon/>}/>
                                        </span>
                                    </Box>
                

                                </Flex>
            


                            </DrawerContent>
                        </DrawerContent>
                    </DrawerOverlay>


                </Drawer>

            </>

        )
    }
}

export default Nav

