import React, {useState, useEffect, useContext} from 'react'

import {userData} from './MockData';

import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, NumberInput} from "@chakra-ui/react"
import {Menu, MenuButton, MenuList, MenuItem} from "@chakra-ui/react"
import {ChevronDownIcon} from "@chakra-ui/icons"
import {IconButton, Container, Input, Heading, Button, useDisclosure, FormControl, FormLabel, Textarea, NumberInputField} from "@chakra-ui/react"
import {ArrowRightOutlined, ArrowLeftOutlined, DeleteOutlined, CaretRightOutlined, RightOutlined, LeftOutlined, DoubleLeftOutlined, DoubleRightOutlined} from '@ant-design/icons'

const titleStyle = {marginLeft:"10px", marginTop:"30px", fontSize:"24px"}
const containerStyle = {borderRadius:"20px", maxWidth:"none", margin:"10px 0", padding: "15px 20px", border: "1px solid #E2E8F0", display:"flex", alignItems:"center", justifyContent:"space-between"}


const Tasks = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')))

    const date = new Date()
    const [dateString, setDateString] = useState(date.toISOString().split("T")[0]);
    const [dateStringForm, setDateStringForm] = useState(date.toISOString().split("T")[0]);

    const [newTask, setNewTask] = useState({})
    const {isOpen, onOpen, onClose} = useDisclosure()

    
    
    useEffect(() => {
        const formDate = new Date(dateStringForm)
        if (formDate) {
            setDateString(formDate.toISOString().split("T")[0])
        }
    }, [dateStringForm])
    useEffect(() => {
        if (!user.days.find(x => x.date == dateString)) {
            setUser({...user, days: [...user.days, {date: dateStringForm, workTasks: [], lifeTasks: []}]})
        }
    }, [dateString])

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(user))
        return () => {
            localStorage.setItem('userData', JSON.stringify(user))
        }
    }, [user])



    const updateDateString = (inc) => {
        const newDate = new Date(dateString)
        newDate.setDate(newDate.getDate() + inc)
        setDateStringForm(newDate.toISOString().split("T")[0])
    }
    const updateInventoryTask = (e, property, index) => {
        const newArr = user.workTasks
        newArr[index][property] = e
        setUser({...user, workTasks: newArr})
    }
    const updateDateTask = (e, property, index) => {
        const newArr = user.days
        newArr.find(x => x.date == dateString).workTasks[index][property] = e
        setUser({...user, days: newArr})
    }


    const TaskTypes = [{
        title: "On Deck",
        data: -1,
        buttonicon: (index) => (
            <ArrowRightOutlined style={{color: "#6B46C1", marginRight:"10px"}} onClick={() => updateDateTask(1, "status", index)}/>
        )
    },{
        title: "Completed",
        data: 1,
        buttonicon: (index) => (
            <ArrowLeftOutlined style={{color: "#6B46C1", marginRight:"10px"}} onClick={() => updateDateTask(-1, "status", index)}/>
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
                        <FormLabel  mt={4} >Tag</FormLabel>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                {newTask.tag ? newTask.tag : "Choose a Tag"}
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => {setNewTask({...newTask, tag: "Work"})}}>Work</MenuItem>
                                <MenuItem onClick={() => {setNewTask({...newTask, tag: "School"})}}>School</MenuItem>
                                <MenuItem onClick={() => {setNewTask({...newTask, tag: "Life"})}}>Life</MenuItem>
                                <MenuItem onClick={() => {setNewTask({...newTask, tag: "Exercise"})}}>Exercise</MenuItem>
                            </MenuList>
                        </Menu>
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
                            "tag": !newTask.tag ? "None" : newTask.tag,
                            "due": newTask.due
                        }]})
                        
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


            <Heading size="xl" style={{marginBottom:"30px", color: "#6B46C1"}}>{`Welcome ${user.name}! (app only for those named McRib)`}</Heading>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <DoubleLeftOutlined style={{border:"1px solid #E2E8F0", borderRadius:"5px", padding:"10px"}} onClick={() => updateDateString(-7)}/>
                <LeftOutlined style={{border:"1px solid #E2E8F0", borderRadius:"5px", padding:"10px"}} onClick={() => updateDateString(-1)}/>
                <Input type="date" value={dateStringForm} style={{width:"calc(100% - 200px)"}} onChange = {e => setDateStringForm(e.target.value)}/>
                <RightOutlined style={{border:"1px solid #E2E8F0", borderRadius:"5px", padding:"10px"}} onClick={() => updateDateString(1)}/>
                <DoubleRightOutlined style={{border:"1px solid #E2E8F0", borderRadius:"5px", padding:"10px"}} onClick={() => updateDateString(7)}/>
            </div>



            {/* Change Status */}
            <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                {TaskTypes.map(item =>
                    <div style={{minHeight:"100px", width:"calc(50% - 5px)"}}>
                        <div style={titleStyle}>{item.title}</div>
                        {user.days.find(x => x.date == dateString)?.workTasks.filter(task => task.status == item.data).length == 0?
                            <Container style={containerStyle}>
                                None
                            </Container>
                        :
                            <>
                                {user.days.find(x => x.date == dateString)?.workTasks.map((task, index) => task.status == item.data &&
                                    <Container style={containerStyle}>
                                        <div>
                                            <div style={{fontWeight:"700"}}>
                                                <Input variant="unstyled" value={task.name} style={{fontWeight:"700", width: task.name.length*11 + "px", height:"24px", maxWidth:"60%"}}
                                                    onChange={e => updateDateTask(e.target.value, "name", index)}
                                                />
                                                &nbsp; - &nbsp;
                                                <Input variant="unstyled" value={task.duration} style={{fontWeight:"700", width:"30px", height:"24px"}}
                                                    onChange={e => {
                                                        if (!isNaN(e.target.value)) {updateDateTask(e.target.value, "duration", index)}
                                                    }}
                                                />
                                                min.
                                            </div>
                                            <Input variant="unstyled" value={task.description}
                                                onChange={e => updateDateTask(e.target.value, "description", index)}
                                            />
                                            <div style={{display:"flex", fontWeight:"700"}}>
                                                Due:&nbsp;
                                                <Input variant="unstyled" value={task.due} style={{fontWeight:"700"}}
                                                    onChange={e => updateDateTask(e.target.value, "due", index)}
                                                />
                                            </div>
                                        </div>

                                        <div style={{display:"flex", alignItems:"center", width:"75px", justifyContent:"space-between"}}>
                                            {item.buttonicon(index)}
                                            <div style={{color: "#6B46C1", fontSize:"20px", transform:"scale(1.2, 1)", margin:"0 20px 0 0", cursor:"pointer"}}
                                                onClick={() => {
                                                    const newArr = user.days
                                                    newArr.find(x => x.date == dateString).workTasks.splice(index, 1)
                                                    setUser({...user, days: newArr})
                                                }}
                                            >X</div>
                                        </div>
                                    </Container>
                                )}
                            </>
                        }
                    </div>
                )}
            </div>

            <Button colorScheme="purple" variant="ghost"
                style={{border:"1px solid #6B46C1", color:"#6B46C1", borderRadius:"15px"}}
                onClick={() => {
                    const newArr = user.days
                    const oldDayIndex = newArr.findIndex(x => x.date == dateString)

                    const onDeckTasks = newArr[oldDayIndex].workTasks.filter(item => item.status == -1)
                    newArr[oldDayIndex].workTasks = newArr[oldDayIndex].workTasks.filter(item => item.status != -1)

                    const newDate = new Date(dateString)
                    newDate.setDate(newDate.getDate() + 1)
                    const nextDayStr = newDate.toISOString().split("T")[0]
                    var newDayIndex = newArr.findIndex(x => x.date == nextDayStr)

                    if (!newDayIndex || newDayIndex == -1) {
                        newArr.push({date: nextDayStr, lifeTasks: [], workTasks: [[]]})
                        newDayIndex = newArr.findIndex(x => x.date == nextDayStr)
                    }
                    newArr[newDayIndex].workTasks = [...newArr[newDayIndex].workTasks, ...onDeckTasks]

                    setUser({...user, days: newArr})

                    setTimeout(() => updateDateString(1), 500)
                }}
            >Push to Tomorrow</Button>



            {/* Task Inventory */}
            <div style={titleStyle}>Task Inventory</div>
            <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                {[0, 1].map(evenOdd =>
                    <div style={{width:"calc(50% - 5px)"}}>
                        {[...user.workTasks, {name: "Add Task"}].map((task, index) =>
                            index%2 == evenOdd &&
                                <>
                                    {task.name == "Add Task"?
                                        <>
                                            <Button colorScheme="purple" variant="ghost"
                                                style={{border:"1px solid #6B46C1", color:"#6B46C1", height:"104px", width:"200px", borderRadius:"20px", margin: index<2? "10px 0" : ""}}
                                                onClick={() => {onOpen()}}
                                            >Add Task</Button>
                                            {AddTaskModal()}
                                        </>
                                    :
                                        <Container style={containerStyle}>
                                            <div>
                                                <div style={{fontWeight:"700"}}>
                                                    <Input variant="unstyled" value={task.name} style={{fontWeight:"700", width: task.name.length*11 + "px", height:"24px", maxWidth:"60%"}}
                                                        onChange={e => updateInventoryTask(e.target.value, "name", index)}
                                                    />
                                                    &nbsp; - &nbsp;
                                                    <Input variant="unstyled" value={task.duration} style={{fontWeight:"700", width:"30px", height:"24px"}}
                                                        onChange={e => {
                                                            if (!isNaN(e.target.value)) {updateInventoryTask(e.target.value, "duration", index)}
                                                        }}
                                                    />
                                                    min.
                                                </div>
                                                <Input variant="unstyled" value={task.description}
                                                    onChange={e => updateInventoryTask(e.target.value, "description", index)}
                                                />
                                                <div style={{display:"flex", fontWeight:"700"}}>
                                                    Due:&nbsp;
                                                    <Input variant="unstyled" value={task.due} style={{fontWeight:"700"}}
                                                        onChange={e => updateInventoryTask(e.target.value, "due", index)}
                                                    />
                                                </div>
                                                <div style={{display:"flex", fontWeight:"700"}}>
                                                    {task.tag ? `Tag: ${task.tag}` : ""}
                                                </div>
                                            </div>
                                            <div style={{display:"flex", alignItems:"center", width:"79px", justifyContent:"space-between"}}>
                                                <div style={{color: "#6B46C1", marginRight:"10px", cursor:"pointer"}}
                                                    onClick={() => {
                                                        const newArr = user.days
                                                        newArr.find(x => x.date == dateString).workTasks.push({...task, status: -1})
                                                        setUser({...user, days: newArr})
                                                    }}
                                                >
                                                    <CaretRightOutlined style={{fontSize:"22px", paddingBottom:"4px"}}/>
                                                </div>
                                                <DeleteOutlined style={{color: "#6B46C1", marginRight:"15px", fontSize:"20px", cursor:"pointer"}}
                                                    onClick={() => setUser({...user, workTasks: user.workTasks.filter((item, ind) => ind != index)})}
                                                />
                                            </div>
                                        </Container>
                                    }
                                </>
                        )}
                    </div>
                )}
            </div>
            
            
        </div>
    )
}

export default Tasks;
