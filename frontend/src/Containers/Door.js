import Title from "../Components/Title"
import Screen from "../Components/Screen"
import {Button} from 'antd'
import axios from "../api"

const Door = ({door, setDoor}) => {
    const control = async (command) => {
        const {
            data: { msg },
        } = await axios.post('/api/door/control', {
            door,
            command
        })
    }

    return (
        <>
            <Title>
                <h1>{door}</h1>
            </Title>
            <div style={{display:"flex"}}>
                <Screen>
                    <p style={{marginTop:200}}>video from {door}</p>
                </Screen>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", margin:50}}>
                    <Button type="primary" shape="round" onClick={()=>control('open')} style={{margin:10}}>
                        Open
                    </Button>
                    <Button type="primary" shape="round" onClick={()=>control('close')} style={{margin:10}}>
                        Close
                    </Button>
                </div>
            </div>
            <Button type="primary" onClick={()=>setDoor('')}>
                Back
            </Button>
        </>
    )
}

export default Door