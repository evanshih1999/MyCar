import { useState } from 'react'
import Title from "../Components/Title"
import Screen from "../Components/Screen"
import {Button} from 'antd'
import {UpCircleOutlined, DownCircleOutlined, LeftCircleOutlined, RightCircleOutlined} from '@ant-design/icons'
import axios from "../api"
import Player from '../Components/Player'

const Car = ({car, setCar, host, port}) => {
    const [open, setOpen] = useState(false)
    
    const control = async (command) => {
        const {
            data: { msg },
        } = await axios.post('/api/car/control', {
            car,
            command,
        })
    }
    
    return (
        <>
            <Title>
                <h1>{car}</h1>
            </Title>
            <div style={{display:"flex"}}>
                <Screen style={{height:400}}>
                    {/*<p style={{marginTop:190}}>video from {car}</p>*/}
                    <Player/>
                </Screen>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", margin:50}}>
                    <div>
                        <UpCircleOutlined style={{fontSize: 50, margin:2, cursor:"pointer"}} onMouseDown={()=>control("forward")} onMouseUp={()=>control("stop")}/>
                    </div>
                    <div>
                        <LeftCircleOutlined style={{fontSize: 50, margin:2, cursor:"pointer"}} onMouseDown={()=>control("left")} onMouseUp={()=>control("stop")}/>
                        <DownCircleOutlined style={{fontSize: 50, margin:2, cursor:"pointer"}} onMouseDown={()=>control("backward")} onMouseUp={()=>control("stop")}/>
                        <RightCircleOutlined style={{fontSize: 50, margin:2, cursor:"pointer"}} onMouseDown={()=>control("right")} onMouseUp={()=>control("stop")}/>
                    </div>
                    <div>
                        {open?
                            <Button type="primary" shape="round" onClick={()=>{
                                control('close')
                                setOpen(false)
                                }} style={{margin:10}}>
                                Close
                            </Button>:
                            <Button type="primary" shape="round" onClick={()=>{
                                control('open')
                                setOpen(true)
                                }} style={{margin:10}}>
                                Open
                            </Button>
                        }
                    </div>
                </div>
            </div>
            <Button type="primary" onClick={()=>setCar('')} style={{margin:10}}>
                Back
            </Button>
        </>
    )
}

export default Car