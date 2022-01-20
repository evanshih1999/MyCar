import { useState } from 'react'
import ReactPlayer from 'react-player'
import ReactHLS from 'react-hls'
import ReactHlsPlayer from 'react-hls-player'
import Title from "../Components/Title"
import Screen from "../Components/Screen"
import {Button} from 'antd'
import axios from "../api"
import Player from '../Components/Player'
import Image from "../Components/Image"
import VideoPlayer from '../Components/VideoPlayer'

const Door = ({door, setDoor}) => {
    const [open, setOpen] = useState(false)
    
    const control = async (command) => {
        const {
            data: { msg },
        } = await axios.post('/api/door/control', {
            door,
            command
        })
    }

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        sources: [{
          src: 'rtmp://58.200.131.2:1935/livetv/cctv1',
          type: 'rtmp/flv'
        }]
    }

    return (
        <>
            <Title>
                <h1>{door}</h1>
            </Title>
            <div style={{display:"flex"}}>
                <Screen style={{height:400}}>
                    {/*<p style={{marginTop:190}}>video from {door}</p>*/}
                    {/*<Image/>*/}
                    {/*<Player/>*/}
                    {/*<div style={{width:525, height:350, marginTop:25, marginLeft:40}}>
                        <ReactPlayer url='https://www.youtube.com/watch?v=RYsSx-VK2ks' width = '525px' height = '350px' />
                    </div>*/}
                    {/*<ReactHLS 
                        url={"http://112.50.243.8/PLTV/88888888/224/3221225922/1.m3u8"}
                        autoplay='true'
                    />*/}
                    {/*<VideoPlayer { ...videoJsOptions } />*/}
                    <div style={{marginTop:50}}>
                        <ReactHlsPlayer
                            src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
                            autoPlay={false}
                            controls={true}
                            width="90%"
                            height="auto"
                        />
                    </div>
                </Screen>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", margin:50}}>
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
            <Button type="primary" onClick={()=>setDoor('')}>
                Back
            </Button>
        </>
    )
}

export default Door