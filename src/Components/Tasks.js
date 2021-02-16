import React, {useState, useEffect, useContext} from 'react'

import {userData} from './MockData';

import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,  ModalBody, ModalCloseButton, NumberInput,} from "@chakra-ui/react"

import { IconButton, Container, Input, Heading, Button, useDisclosure, FormControl, FormLabel, Textarea, NumberInputField, NumberIncrementStepper, NumberDecrementStepper , NumberInputStepper} from "@chakra-ui/react"
import {ArrowRightOutlined, ArrowLeftOutlined, DeleteOutlined, CaretRightOutlined} from '@ant-design/icons'

const titleStyle = {marginLeft:"10px", marginTop:"30px", fontSize:"24px"}
const buttonStyle = (c) => {return {border:"1px solid " + c, color: c, borderRadius:"19px", padding:"10px", width:"38px", height:"38px", justifyContent:"center", display:"flex", alignItems:"center", cursor:"pointer"}}
const containerStyle = {borderRadius:"20px", maxWidth:"none", margin:"10px 0", padding: "15px 20px", border: "1px solid lightgray", display:"flex", alignItems:"center", justifyContent:"space-between"}


const Tasks = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')))

    const date = new Date()
    const [dateString, setDateString] = useState(`${date.getFullYear()}-${date.getMonth()>=9? (date.getMonth()+1): "0"+(date.getMonth()+1)}-${date.getDate()>=10? date.getDate(): "0"+date.getDate()}`);
    const [dateSringFrom, setDateStringForm] = useState(dateString)

    const [newTask, setNewTask] = useState({})
    const { isOpen, onOpen, onClose } = useDisclosure()

    

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(user))
        return () => {
            localStorage.setItem('userData', JSON.stringify(user))
        }
    }, [user])



    const updateStatus = (index, stat) => {
        const newArr = user.days
        newArr[0].workTasks[index].status = stat
        setUser({...user, days: newArr})
    }
    const TaskTypes = [{
        title: "On Deck",
        data: -1,
        buttonicon: (index) => (
            <ArrowRightOutlined style={{color: "#52c41a", marginRight:"10px"}} onClick={() => {
                updateStatus(index, 1)}
            }/>
        )
    },{
        title: "Completed",
        data: 1,
        buttonicon: (index) => (
            <ArrowLeftOutlined style={{color: "red", opacity:".6", marginRight:"10px"}} onClick={() => {
                updateStatus(index, -1)
            }}/>
        )
    }]

    const AddTaskModal = () => (
        <Modal
            isOpen={isOpen} 
            onClose={onClose}
            size = {"xl"}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Task name</FormLabel>
                        <Input onChange={(e) => {{
                            setNewTask({...newTask, name: e.target.value})
                        }}} isRequired={true} placeholder="Task Name" value={newTask.name}/>

                        <FormLabel mt={4}>Duration (Minutes)</FormLabel>
                        <NumberInput>
                            <NumberInputField onChange={(e) => {{
                                setNewTask({...newTask, duration: e.target.value})
                            }}} placeholder="Duration" value={parseInt(newTask.duration)}/>
                        </NumberInput>

                        <FormLabel mt={4}>Task Description</FormLabel>
                        <Textarea onChange={(e) => {{
                            setNewTask({...newTask, description: e.target.value})
                        }}} placeholder="Task Description" value ={newTask.description}/>

                        <FormLabel  mt={4} >Due Date</FormLabel>
                        <Input onChange={(e) => {{
                            setNewTask({...newTask, due: e.target.value})
                        }}} type="date" value={newTask.due}/>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={() => {
                        onClose();
                        setUser({...user, workTasks: [...user.workTasks, {
                            "id": user.workTasks.length,
                            "name": !newTask.name ? "Untitled" : newTask.name,
                            "description": !newTask.description ? "" : newTask.description,
                            "duration": !newTask.duration ? 0 : newTask.duration,
                            "due": newTask.due
                        }]})
                        console.log(newTask)
                        setNewTask({})
                    }}>
                        Add
                    </Button>
                    <Button onClick={() => {{
                        onClose();
                        setNewTask({})
                    }}} variant="ghost">Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
    

    return (
        <div id="zen-body">

            <Heading size="xl" style={{marginBottom:"30px", color: "#805AD5", opacity:".8"}}>{`Welcome ${user.name}! (app only for those named McRib)`}</Heading> 


            <Input type="date" defaultValue={dateSringFrom}
                onKeyPress = {e => {
                    if (e.key == 'Enter') {
                        if (!user.days.find(x => x.date == dateSringFrom)) {
                            setUser({...user, days: [...user.days, {date: dateSringFrom, workTasks: [], lifeTasks: []}]})
                        }
                        setDateString(dateSringFrom)
                    }
                }}
                onChange = {e => {
                    setDateStringForm(e.target.value)
                }}
            />
            

            {/* Change Status */}
            <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                {TaskTypes.map(item => (
                    <div style={{minHeight:"60px", width:"calc(50% - 5px)"}}>
                        <div style={titleStyle}>{item.title}</div>
                        {console.log(user.days.find(x => x.date == dateString)?.workTasks)}
                        <>{user.days.find(x => x.date == dateString)?.workTasks.map((task, index) => (
                            task.status == item.data &&
                                <Container hoverable style={containerStyle}>
                                    <div>
                                        <div style={{fontWeight:"700"}}>
                                            <Input variant="unstyled" value={task.name} style={{fontWeight:"700", width: task.name.length*11 + "px", height:"24px", maxWidth:"60%"}}
                                                onChange={e => {
                                                    const newArr = user.days
                                                    newArr.find(x => x.date == dateString).workTasks[index].name = e.target.value
                                                    setUser({...user, days: newArr})
                                                }}
                                            />
                                            &nbsp; - &nbsp;
                                            <Input variant="unstyled" value={task.duration} style={{fontWeight:"700", width:"30px", height:"24px"}}
                                                onChange={e => {
                                                    if (!isNaN(e.target.value)) {
                                                        const newArr = user.days
                                                        newArr.find(x => x.date == dateString).workTasks[index].duration = e.target.value
                                                        setUser({...user, days: newArr})
                                                    }
                                                }}
                                            />
                                            min.
                                        </div>
                                        <Input variant="unstyled" value={task.description}
                                            onChange={e => {
                                                const newArr = user.days
                                                newArr.find(x => x.date == dateString).workTasks[index].description = e.target.value
                                                setUser({...user, days: newArr})
                                            }}
                                        />
                                        <div style={{display:"flex", fontWeight:"700"}}>
                                            Due:&nbsp;
                                            <Input variant="unstyled" value={task.due} style={{fontWeight:"700"}}
                                                onChange={e => {
                                                    const newArr = user.days
                                                    newArr.find(x => x.date == dateString).workTasks[index].due = e.target.value
                                                    setUser({...user, days: newArr})
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{display:"flex", alignItems:"center", width:"75px", justifyContent:"space-between"}}>
                                        {item.buttonicon(index)}
                                        <div style={{color: "#ff5555", fontSize:"20px", transform:"scale(1.2, 1)", margin:"0 20px 0 0", cursor:"pointer"}}
                                            onClick={() => {
                                                const newArr = user.days
                                                newArr.find(x => x.date == dateString).workTasks.splice(index, 1)
                                                setUser({...user, days: newArr})
                                            }}
                                        >X</div>
                                    </div>
                                </Container>
                        ))}</>
                    </div>
                ))}
            </div>
            
            {/* {user.days[0].workTasks.findIndex(x => x.id == task.id) == -1 && */}
            <div style={titleStyle}>Edit Task Inventory</div>

            <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                {[0, 1].map(evenOdd =>
                    <div style={{width:"calc(50% - 5px)"}}>
                        {[...user.workTasks, {name: "Add Task"}].map((task, index) => (
                            index%2 == evenOdd &&
                                <>
                                    {task.name == "Add Task"?
                                        <>
                                            <Button colorScheme="purple" variant="ghost"
                                                style={{border:"1px solid rgb(128, 90, 213, .8)", color:"rgb(128, 90, 213, .8)", height:"104px", width:"200px", borderRadius:"20px", margin: index<2? "10px 0" : ""}}
                                                onClick={() => {onOpen()}}
                                            >Add Task</Button>
                                            {AddTaskModal()}
                                        </>
                                    :
                                        <Container hoverable style={containerStyle}>
                                            <div style={{display:"flex", alignItems:"center"}}>
                                                <div style={buttonStyle("#3182ce")}
                                                    onClick={() => {
                                                        const newArr = user.days
                                                        newArr.find(x => x.date == dateString).workTasks.push({...task, status: -1})
                                                        setUser({...user, days: newArr})
                                                    }}
                                                >
                                                    <CaretRightOutlined style={{fontSize:"20px", marginLeft:"3px"}}/>
                                                </div>
                                                &nbsp; &nbsp;&nbsp;
                                                <div>
                                                    <div style={{fontWeight:"700"}}>
                                                        <Input variant="unstyled" value={task.name} style={{fontWeight:"700", width: task.name.length*11 + "px", height:"24px", maxWidth:"60%"}}
                                                            onChange={e => {
                                                                const newArr = user.workTasks
                                                                newArr[index].name = e.target.value
                                                                setUser({...user, workTasks: newArr})
                                                            }}
                                                        />
                                                        &nbsp; - &nbsp;
                                                        <Input variant="unstyled" value={task.duration} style={{fontWeight:"700", width:"30px", height:"24px"}}
                                                            onChange={e => {
                                                                if (!isNaN(e.target.value)) {
                                                                    const newArr = user.workTasks
                                                                    newArr[index].duration = e.target.value
                                                                    setUser({...user, workTasks: newArr})
                                                                }
                                                            }}
                                                        />
                                                        min.
                                                    </div>
                                                    <Input variant="unstyled" value={task.description}
                                                        onChange={e => {
                                                            const newArr = user.workTasks
                                                            newArr[index].description = e.target.value
                                                            setUser({...user, workTasks: newArr})
                                                        }}
                                                    />
                                                    <div style={{display:"flex", fontWeight:"700"}}>
                                                        Due:&nbsp;
                                                        <Input variant="unstyled" value={task.due} style={{fontWeight:"700"}}
                                                            onChange={e => {
                                                                const newArr = user.workTasks
                                                                newArr[index].due = e.target.value
                                                                setUser({...user, workTasks: newArr})
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <DeleteOutlined 
                                                style={buttonStyle("#ff5555")}
                                                onClick={() => {
                                                    setUser({...user, workTasks: user.workTasks.filter((item, ind) => ind != index)})
                                                }}
                                            />
                                        </Container>
                                    }
                                </>
                        ))}
                    </div>
                )}
            </div>
            
            
            
        </div>
    )
}

export default Tasks;
