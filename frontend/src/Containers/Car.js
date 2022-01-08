import Title from "../Components/Title"
import Screen from "../Components/Screen"
import {Button} from 'antd'
import {UpCircleOutlined, DownCircleOutlined, LeftCircleOutlined, RightCircleOutlined} from '@ant-design/icons'
import axios from "../api"

const Car = ({car, setCar}) => {
    const control = async (command) => {
        const {
            data: { msg },
        } = await axios.post('/api/car/control', {
            car,
            command
        })
    }
    
    return (
        <>
            <Title>
                <h1>{car}</h1>
            </Title>
            <Screen>
                <p style={{marginTop:200}}>video from {car}</p>
            </Screen>
            <div>
                <UpCircleOutlined style={{fontSize: 50, margin:2, cursor:"pointer"}} onMouseDown={()=>control("up")} onMouseUp={()=>control("stop")}/>
            </div>
            <div>
                <LeftCircleOutlined style={{fontSize: 50, margin:2, cursor:"pointer"}} onMouseDown={()=>control("left")} onMouseUp={()=>control("stop")}/>
                <DownCircleOutlined style={{fontSize: 50, margin:2, cursor:"pointer"}} onMouseDown={()=>control("down")} onMouseUp={()=>control("stop")}/>
                <RightCircleOutlined style={{fontSize: 50, margin:2, cursor:"pointer"}} onMouseDown={()=>control("right")} onMouseUp={()=>control("stop")}/>
            </div>
            <Button type="primary" onClick={()=>setCar('')} style={{margin:10}}>
                Back
            </Button>
        </>
    )
}

export default Car