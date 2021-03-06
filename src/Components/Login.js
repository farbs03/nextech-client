import React, {useState, useEffect, useContext} from 'react'
import {Route} from 'react-router-dom'
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, NumberInput, HStack, VStack} from "@chakra-ui/react"
import {IconButton, Container, Input, Heading, Button, useDisclosure, FormControl, FormLabel, Textarea, NumberInputField, Stack} from "@chakra-ui/react"
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  CloseButton} from "@chakra-ui/react"


const Login = () => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [visibility, setVisibility] = useState("hidden")

    const [data, setData] = useState(JSON.parse(localStorage.getItem('userData')))

    useEffect(() => {

        localStorage.setItem('userData', JSON.stringify(data))
        return () => {
            localStorage.setItem('userData', JSON.stringify(data))
        }
    }, [data])

    return (
        <div id="zen-body">
            <Heading size="xl" style={{marginBottom:"15px", justify:"left"}}>Login </Heading>
            <div style={{textAlign: "center", margin: "auto"}}>

                <Stack spacing={3} style={{visibility:visibility}}>
                <Alert status="error" mt="15px">
                    <AlertIcon />
                    Incorrect Username/Password!
                </Alert>
                </Stack>

                <FormControl mt="10px">

                    <Stack w="80%" ml="10%">
                        <FormLabel fontSize="2xl" >Username</FormLabel>
                        <Input onChange={(e) => {{
                            setUsername(e.target.value)
                        }}}  placeholder="Username" value={username}/>

                        <Stack mt="50px">
                            <FormLabel mt="50px" fontSize="2xl" >Password</FormLabel>
                            <Input onChange={(e) => {{
                                setPassword(e.target.value)        
                            }}} type="password" placeholder="Password" value={password}/>
                        </Stack>
                            

                        <Stack>
                            <Button style={{margin: "auto", marginTop:"30px", background:"#805AD5"}}  w="25%"  colorScheme="blue" onClick={() =>{
                                if (username == "User" && password == "password"){
                                    setData({...data, name:"Demo User"})
                                    window.location.reload()
                                    
                                }else{
                                    setVisibility("visible")
                                    setTimeout(() => {setVisibility("hidden")}, 10000)
                                }

                            }}>Log In</Button>
                        </Stack>
                    </Stack>
                </FormControl>



            </div>
        </div>
    )
}

export default Login
