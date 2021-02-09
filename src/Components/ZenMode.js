import React, {useState, useEffect, useContext} from 'react'

import userData from '../mockUserData.json';

import { CircularProgress, CircularProgressLabel, IconButton, Container, Input } from "@chakra-ui/react"
import {StepForwardOutlined,StepBackwardOutlined, RetweetOutlined, CheckOutlined, PauseOutlined, CaretRightOutlined, ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons'



const ZenMode = () => {

    const [user, setUser] = useState(userData)

    const currDate = new Date()
    const [t, setT] = useState(3600)
    const [paused, setPaused] = useState(false)
    const [active, setActive] = useState(true) //whether buttons are active
    
    var time = 1000


    useEffect(() => {
        if (!paused) {
            if (t!=0) {
                setTimeout(() => {
                    setT(t-1)
                }, 1000)
            }
        }
    }, [t, paused])

    useEffect(() => {
        if (paused) {
            setTimeForm(timeString(t))
        }
    }, [paused])



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
    const skipButton = (inc, size) => (
        <IconButton
            icon={<div style={{fontSize:"20px"}}>{inc>0? "+": ""}{inc}</div>}
            onClick={() => {if (active) {addMin(inc)}}}
            colorScheme="blue"
            isRound style={active? {width: size, height: size} : {width: size, height: size, backgroundColor: "gray"}}
        />
    )
      
    

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
                <CircularProgress value={t/36} className="home-progress" size="400px" thickness="5px" color="purple.500">
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
            

            <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center", margin:"20px 0 40px 0", width:"100%"}}>
                {skipButton(-15, "60px")}
                {skipButton(-5, "70px")}
                <IconButton
                    icon={paused?
                        <CaretRightOutlined style={{fontSize:"30px", marginLeft:"4px", transform: "scaleX(1.3)"}}/>
                    :
                        <PauseOutlined style={{fontSize:"30px"}}/>
                    }
                    colorScheme="blue"
                    isRound style={active? {width: "80px", height: "80px"} : {width: "80px", height: "80px", backgroundColor: "gray"}}
                    onClick={() => {
                        if (paused) {
                            setTimeToForm()
                        }
                        setPaused(!paused)
                    }}
                />
                {skipButton(5, "70px")}
                {skipButton(+15, "60px")}
            </div>

        </div>
    )
    
}

export default ZenMode