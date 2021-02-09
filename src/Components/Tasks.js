import React, {useState, useEffect, useContext} from 'react'

import userData from '../mockUserData.json';

import { CircularProgress, CircularProgressLabel, IconButton, Container, Input, Heading } from "@chakra-ui/react"
import {ArrowRightOutlined, ArrowLeftOutlined} from '@ant-design/icons'



const Tasks = () => {

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
            <ArrowRightOutlined style={{color: "#52c41a"}} onClick={() => {
                updateStatus(index, 1)}
            }/>
        )
    },{
        title: "Completed",
        data: 1,
        buttonicon: (index) => (
            <ArrowLeftOutlined style={{color: "red", opacity:".6"}} onClick={() => {
                updateStatus(index, -1)
            }}/>
        )
    }]



    return (
        <div id="zen-body">

            <Heading size="2xl" style={{marginBottom:"50px", color: "#805AD5", opacity:".8"}}>Task Boys</Heading>


            {/* Change Status */}
            <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                {TaskTypes.map(item => (
                    <div style={{minHeight:"60px", width:"45%"}}>
                        <div style={{marginLeft:"10px", marginTop:"30px", fontSize:"24px"}}>{item.title}</div>
                        <>{user.days[0].workTasks.map((task, index) => {
                            var taskData = user.workTasks.find(item => item.id == task.id)
                            if (task.status == item.data) {
                                return (
                                    <Container hoverable style={{borderRadius:"20px", maxWidth:"none", margin:"10px 0", padding: "15px 25px", border: "1px solid lightgray"}}>
                                        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                                            <div>
                                                <div style={{fontWeight:"700"}}>{taskData.name}</div>
                                                <div>{taskData.description? taskData.description : ""}</div>
                                            </div>
                                            <div style={{display:"flex", alignItems:"center"}}>
                                                {item.buttonicon(index)}
                                            </div>
                                        </div>
                                    </Container>
                                )
                            }
                        })}</>
                    </div>
                ))}
            </div>
            
            
        </div>
    )
}

export default Tasks;
