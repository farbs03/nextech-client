import React, {useState, useEffect, useContext} from 'react'

import {userData} from './MockData';

import { CircularProgress, CircularProgressLabel, IconButton, Container, Input, Button, useRadioGroup, RadioCard, HStack, RadioGroup } from "@chakra-ui/react"
import {StepForwardOutlined,StepBackwardOutlined, RetweetOutlined, CheckOutlined, PauseOutlined, CaretRightOutlined, ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons'
import { RepeatClockIcon } from '@chakra-ui/icons'


const ZenMode = () => {
    const CountData = {
        "Work": 2700,
        "Short Break": 300,
        "Long Break": 900
    }
    
    const [selected, setSelected] = useState("Work")
    const [t, setT] = useState(CountData["Work"])
    const [paused, setPaused] = useState(false)
    const [active, setActive] = useState(true) //whether buttons are active

    useEffect(() => {
        const screen = document.documentElement;
        screen.requestFullscreen().catch(() => {})
        return () => {
            document.exitFullscreen().catch(() => {})
        }
    }, [])

    useEffect(() => {
        if (!paused) {
            if (t!=0) {
                let timer = setTimeout(() => {
                    setT(t => t-1)
                }, 1000)
                return () => clearTimeout(timer)
            }
        }
        else {
            setT(CountData[selected])
        }
    }, [t, paused])

    useEffect(() => {
        if (paused) {
            setTimeForm(timeString(t))
        }
    }, [paused])

    useEffect(() => {
        setT(CountData[selected])
    }, [selected])


    const timeString = (t) => {
        var str = Math.floor(t/60) + ":" + t%60
        if (t%60<10) {
            str = str.replace(":", ":0")
        }
        if (Math.floor(t/60)<10) {
            str = "0" + str
        }
        return str
    }
    const [timeForm, setTimeForm] = useState(timeString(t))


    const changeTime = (inc) => {
        setActive(false)
        setPaused(true)
        setTimeout(() => {
            setT(inc)
            setTimeout(() => {
                setActive(true)
                setPaused(false)
            }, 500)
        }, 1000)
    }
    const addMin = (inc) => {
        setTimeForm(timeString(t+inc*60))
        if (t+inc*60>5) {
            if (paused) {
                setT(t+inc*60)
            } else {
                changeTime(t+inc*60)
            }
        }
    }

      
    

    const setTimeToForm = () => {
        var min = Math.floor(parseInt(timeForm.substring(0, timeForm.indexOf(":"))))
        var sec = Math.floor(parseInt(timeForm.substring(timeForm.indexOf(":")+1)))
        if (0<=min && 0<=sec && sec<=60) {
            setT(min*60 + sec)
        }
        setTimeout(() => {setPaused(false)}, 1000)
    }




    return (
        <div id="zen-body">

            {/* Timer */}
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"20px 0 40px 0"}}>
                <CircularProgress value={t/(CountData[selected] / 100)} className="home-progress" size="400px" thickness="5px" color="purple.500">
                    <CircularProgressLabel style={{display:'flex', justifyContent:"center", fontSize:"60px"}}>
                        {paused?
                            <Input 
                                variant="unstyled"
                                value={timeForm}
                                style={{width:"142px", fontSize:"60px", height:"60px"}}
                                onChange = {(e) => setTimeForm(e.target.value)}
                                onKeyPress = {e => {
                                    if (e.key == 'Enter' && paused) {
                                        setTimeToForm()
                                    }
                                }}
                            />
                        :
                            <div
                                style={{fontSize:"60px", height:"60px"}}
                                onClick={() => {
                                    setPaused(true)
                                    setTimeForm(timeString(t))
                                }}
                            >{timeString(t)}</div>
                        }
                    </CircularProgressLabel>
                </CircularProgress>
            </div>
            

            <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"20px 0 40px 0", width:"100%"}}>

                <IconButton
                    icon={paused?
                        <CaretRightOutlined style={{fontSize:"30px", marginLeft:"4px", transform: "scaleX(1.3)"}}/>
                    :
                        <PauseOutlined style={{fontSize:"30px"}}/>
                    }
                    colorScheme="purple"
                    isRound style={active? {width: "80px", height: "80px"} : {width: "80px", height: "80px", backgroundColor: "gray"}}
                    onClick={() => {
                        if (paused) {
                            setTimeToForm()
                        }
                        setPaused(!paused)
                    }}
                />
                
                <Button 
                    colorScheme="purple" 
                    size="lg"
                    style={{borderRadius: "50%"}}
                    h="80px"
                    w="80px"
                    ml="120px"
                    isDisabled={paused}
                    onClick={() => {
                        setT(CountData[selected])
                        
                    }}
                >
                <RepeatClockIcon w="30px" h="45px"  />
                
            </Button>

            </div>

            <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"20px 0 40px 0", width:"100%"}}>

                <RadioGroup>
                    <HStack>
                        <Button 
                            h="50px"
                            colorScheme={selected == "Work" ? "purple" : "gray"}
                            onClick={() =>{
                                setSelected("Work")
                                
                            }}
                            >
                            Work
                            
                        </Button>
                        <Button 
                            h="50px"
                            colorScheme={selected == "Short Break" ? "purple" : "gray"}
                            onClick={() =>{
                                setSelected("Short Break")
                                
                            }}
                        >
                        Short Break
                        </Button>
    
                        <Button 
                            h="50px"
                            colorScheme={selected == "Long Break" ? "purple" : "gray"}
                            onClick={() =>{
                                setSelected("Long Break")
                                
                            }}
                        >
                        Long Break
                        </Button>
    
                    </HStack>
                </RadioGroup>
            </div>

        </div>
    )
    
}

export default ZenMode