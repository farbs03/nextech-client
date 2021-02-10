import React, {useState, useEffect, useContext} from 'react'

import userData from '../mockUserData.json';

import { IconButton, Container, Input, Heading, Button } from "@chakra-ui/react"
import {ArrowRightOutlined, ArrowLeftOutlined, DeleteOutlined, CaretRightOutlined} from '@ant-design/icons'
const titleStyle = {marginLeft:"10px", marginTop:"30px", fontSize:"24px"}
const buttonStyle = (c) => {return {border:"1px solid " + c, color: c, borderRadius:"19px", padding:"10px", width:"38px", height:"38px", justifyContent:"center", display:"flex", alignItems:"center", cursor:"pointer"}}



const Tasks = () => {

    const currDate = new Date()
    const [user, setUser] = useState(userData)
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

    
    return (
        <div id="zen-body">

            <Heading size="xl" style={{marginBottom:"30px", color: "#805AD5", opacity:".8"}}>Task Boys</Heading>

            {/* Change Status */}
            <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                {TaskTypes.map(item => (
                    <div style={{minHeight:"60px", width:"calc(50% - 5px)"}}>
                        <div style={titleStyle}>{item.title}</div>
                        <>{user.days[0].workTasks.map((task, index) => {
                            var taskData = user.workTasks.find(item => item.id == task.id)
                            if (task.status == item.data) {
                                return (
                                    <Container hoverable style={{borderRadius:"20px", maxWidth:"none", margin:"10px 0", padding: "15px 20px", border: "1px solid lightgray", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                                        <div style={{display:"flex", alignItems:"center"}}>
                                            <div>
                                                <div style={{fontWeight:"700"}}>{taskData.name}&nbsp; - &nbsp;{taskData.duration} min.</div>
                                                <div>{taskData.description? taskData.description : ""}</div>
                                            </div>
                                        </div>
                                        <div style={{display:"flex", alignItems:"center", width:"75px", justifyContent:"space-between"}}>
                                            {item.buttonicon(index)}
                                            <div style={{color: "#ff5555", fontSize:"20px", transform:"scale(1.2, 1)", margin:"0 20px 0 0", cursor:"pointer"}}
                                                onClick={() => {
                                                    const newArr = user.days
                                                    newArr[0].workTasks.splice(index, 1)
                                                    setUser({...user,
                                                        days: newArr
                                                    })
                                                }}
                                            >X</div>
                                        </div>
                                    </Container>
                                )
                            }
                        })}</>
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
                                        <Button colorScheme="purple" variant="ghost"
                                            style={{border:"1px solid rgb(128, 90, 213, .8)", color:"rgb(128, 90, 213, .8)", height:"80px", width:"200px", borderRadius:"20px", margin: index<2? "10px 0" : ""}}
                                            onClick={() => {
                                                setUser({...user, workTasks: [...user.workTasks, {
                                                    "id": user.workTasks.length,
                                                    "name": "Name",
                                                    "duration": 30,
                                                    "description": "Due at 11:59pm"
                                                }]})
                                            }}
                                        >
                                            Add Task
                                        </Button>
                                    :
                                        <Container hoverable style={{borderRadius:"20px", maxWidth:"none", margin:"10px 0", padding: "15px 20px", border: "1px solid lightgray", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                                            
                                            <div style={{display:"flex", alignItems:"center"}}>
                                                <div style={buttonStyle("#3182ce")}
                                                    onClick={() => {
                                                        const newArr = user.days
                                                        newArr[0].workTasks.push({id: task.id, status: -1})
                                                        setUser({...user, days: newArr})
                                                    }}
                                                ><CaretRightOutlined style={{fontSize:"20px", marginLeft:"3px"}}/></div> &nbsp; &nbsp;&nbsp;
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
                                                    <div>{task.description? task.description : ""}</div>
                                                </div>
                                            </div>
                                            <DeleteOutlined 
                                                style={buttonStyle("#ff5555")}
                                                onClick={() => {
                                                    setUser({...user, 
                                                        workTasks: user.workTasks.filter((item, ind) => ind != index),
                                                        days: user.days.map(day => { return {...day, workTasks: day.workTasks.filter(x => x.id != task.id)}})
                                                    })
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
