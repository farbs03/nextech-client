import React, { useState, useEffect } from 'react'
import { Divider, Center, Stack, HStack, VStack, Box, Container, Heading, Text, Button, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"



const Notes = () => {

    const [data, SetData] = useState(JSON.parse(localStorage.getItem('userData')))
    const [selectedIndex, setSelectedIndex] = useState(data.selectedNote)


    useEffect(() => {

        localStorage.setItem('userData', JSON.stringify(data))
        return () => {
            localStorage.setItem('userData', JSON.stringify(data))
        }
    }, [data])

    useEffect(() => {
        SetData({...data, selectedNote: selectedIndex})
    }, [selectedIndex])


    const updateName = (value) => {
        const newNotes = data.notes
        newNotes[selectedIndex].name=value
        SetData({...data, notes:newNotes})
    }
    const updateContent = (value) => {
        const newNotes = data.notes
        newNotes[selectedIndex].content=value
        SetData({...data, notes:newNotes})
    }

    const createNote = () => {
        const defaultNote = {
            "name": "Untitled",
            "content": "Write your notes here!"
        }
        const newNotes = data.notes
        newNotes.push(defaultNote)
        SetData({...data, notes:newNotes})
        setSelectedIndex(data.notes.length - 1)
    }

    const deleteNote = () => {
        const newNotes = data.notes
        newNotes.splice(selectedIndex, selectedIndex)
        SetData({...data, notes:newNotes})
        setSelectedIndex(0)

    }

    return (
        <div id="zen-body">
        
            <Heading size="xl" style={{marginBottom:"15px", justify:"left"}}>Notes </Heading>
            <Button
                colorScheme="purple" variant="ghost"
                style={{border:"1px solid #6B46C1", color:"#6B46C1", borderRadius:"30px"}}
                h="40px"
                w="40px"
                mr="10px"
                onClick={() => {createNote()}}
            >
                <AddIcon />
            </Button>
            <Button
                colorScheme="purple" variant="ghost"
                style={{border:"1px solid #ff5c5c", color:"#ff5c5c", borderRadius:"30px"}}
                h="40px"
                w="40px"
                onClick={() => {deleteNote()}}
            >
                <DeleteIcon />
            </Button>
        

            
            <HStack spacing="10%">
                <Box w="25%">
                    <VStack>
                    
                    {data.notes.map((note, index) => 

                        <Container backgroundColor={selectedIndex == index && "#c8c8c8"} style={{borderRadius:"20px", maxWidth:"none", margin:"10px 0", padding: "15px 20px", border: "1px solid #E2E8F0", display:"flex", alignItems:"center", justifyContent:"space-between"}} onClick={() => setSelectedIndex(index)} h="75px">
                            <Text fontWeight="550">{note.name}</Text>
                        </Container>
                    )}


                    </VStack>
                </Box>

                <Box w="75%">
                    <VStack spacing="5%">
                        <Input onChange={(e) => {{
                            updateName(e.target.value)
                        }}} isRequired={true} placeholder="Task Name" value={data.notes[selectedIndex].name}/>
                        <Textarea h="400px" onChange={(e) => {{
                            updateContent(e.target.value)
                        }}} placeholder="Task Description" value ={data.notes[selectedIndex].content}/>
                    </VStack>
                </Box>

            </HStack>

        </div>
    )
}

export default Notes
