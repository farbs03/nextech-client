import React, {useState, useEffect, useContext} from 'react'

import userData from '../mockUserData.json';

import { CircularProgress, CircularProgressLabel, IconButton, Container } from "@chakra-ui/react"
import {StepForwardOutlined, RetweetOutlined, CheckOutlined, PauseOutlined, CaretRightOutlined, ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons'


const ZenMode = () => {
    
    const currDate = new Date()
    
    const [user, setUser] = useState(userData)
    const [currInd, setCurrInd] = useState(
        user.days[0].workTasks.findIndex(item => item.status == 0)
    ) //index of current task in the day
    
    const [t, setT] = useState(100)
    const [paused, setPaused] = useState(false)
    const [active, setActive] = useState(true) //whether the buttons are active


    useEffect(() => {
        if (!paused) {
            if (t==0) {
                toNextTask()
            } else {
                setTimeout(() => {
                    setT(t-1)
                }, 1000)
            }
        }
    }, [t, paused])

    useEffect(() => {
        setActive(false)
        setPaused(true)
        setTimeout(() => {
            if (currInd != -1) {
                setT(user.workTasks.find(item => item.id == user.days[0].workTasks[currInd].id).duration)
                setTimeout(() => {
                    setPaused(false)
                    setActive(true)
                }, 1000)
            } else {
                setT(0)
                setActive(true)
            }
        }, 1000)
    }, [currInd])



    const updateStatus = (index, stat) => {
        const newArr = user.days
        newArr[0].workTasks[index].status = stat
        setUser({...user, days: newArr})
    }
    const toNextTask = () => {
        const nextInd = user.days[0].workTasks.findIndex(item => item.status == -1)
        if (currInd != -1) {updateStatus(currInd, 1)}
        if (nextInd != -1) {updateStatus(nextInd, 0)}
        setCurrInd(nextInd)
    }
    


    return (
        <div id="zen-body">

            {/* Timer */}
            <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center", margin:"20px 0 40px 0"}}>
                <IconButton
                    icon={<RetweetOutlined style={{fontSize:"20px"}}/>}
                    onClick={() => {
                        if (active) {
                            const nextInd = user.days[0].workTasks.findIndex(item => item.status == -1)
                            if (currInd != -1) {updateStatus(currInd, -1)}
                            if (nextInd != -1) {updateStatus(nextInd, 0)}
                            setCurrInd(nextInd)
                        }
                    }}
                    colorScheme="blue"
                    isRound style={active? {width: "80px", height: "80px"} : {width: "80px", height: "80px", backgroundColor: "gray"}}
                />
                <CircularProgress value={t} className="home-progress" size="250px">
                    <CircularProgressLabel>
                        <div onClick={() => setPaused(!paused)}>
                            {paused?
                                <CaretRightOutlined style={{fontSize:"45px", marginLeft:"4px", transform: "scaleX(1.3)"}} className="play-pause"/>
                            :
                                <PauseOutlined style={{fontSize:"45px"}} className="play-pause"/>
                            }
                        </div>
                    </CircularProgressLabel>
                </CircularProgress>
                <IconButton
                    icon={<StepForwardOutlined style={{fontSize:"20px"}}/>}
                    onClick={() => {
                        if (active) {
                            toNextTask()
                        }
                    }}
                    colorScheme="blue"
                    isRound style={active? {width: "80px", height: "80px"} : {width: "80px", height: "80px", backgroundColor: "gray"}}
                />
            </div>


            {/* Change Activity */}
            {[{
                title: "Current",
                data: 0,
                buttonicon: (index) => (
                    <>
                        <CheckOutlined style={{color: active? "#52c41a": "gray"}} onClick={() => {
                            if (active) {
                                updateStatus(index, 1)
                                setCurrInd(-1)
                            }
                        }}/>
                        &nbsp; &nbsp; &nbsp;
                        <ArrowDownOutlined style={{color: active? "black": "gray"}} onClick={() => {
                            if (active) {
                                updateStatus(index, -1)
                                setCurrInd(-1)
                            }
                        }}/>
                    </>
                )
            },{
                title: "On Deck",
                data: -1,
                buttonicon: (index) => (
                    <>
                        <CheckOutlined style={{color: active? "#52c41a": "gray"}} onClick={() => {
                            if (active) {
                                updateStatus(index, 1)}
                            }
                        }/>
                        &nbsp; &nbsp; &nbsp;
                        <CaretRightOutlined style={{color: active? "#3182ce": "gray", fontSize:"17px", width:"14px", margin:"0 2px 0 -1px", transform: "scaleX(1.4)"}} onClick={() => {
                            if (active) {
                                if (currInd != -1) {updateStatus(currInd, -1)}
                                updateStatus(index, 0)
                                setCurrInd(index)
                            }
                        }}/>
                    </>
                )
            },{
                title: "Completed",
                data: 1,
                buttonicon: (index) => (
                    <>
                        <ArrowUpOutlined style={{color: active? "black": "gray"}} onClick={() => {
                            if (active) {
                                updateStatus(index, -1)
                            }
                        }}/>
                        &nbsp; &nbsp; &nbsp;
                        <CaretRightOutlined style={{color: active? "#3182ce": "gray", fontSize:"17px", width:"14px", margin:"0 2px 0 -1px", transform: "scaleX(1.4)"}} onClick={() => {
                            if (active) {
                                if (currInd != -1) {updateStatus(currInd, -1)}
                                updateStatus(index, 0)
                                setCurrInd(index)
                            }
                        }}/>
                    </>
                )
            }].map(item => (
                <div style={{minHeight:"60px"}}>
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
    )
}

export default ZenMode