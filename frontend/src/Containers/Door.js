import Title from "../Components/Title"
import Screen from "../Components/Screen"
import {Button} from 'antd'

const Door = ({door, setDoor}) => {
    return (
        <>
            <Title>
                <h1>{door}</h1>
            </Title>
            <Screen>
                <p style={{marginTop:200}}>video from {door}</p>
            </Screen>
            <Button type="primary" onClick={()=>setDoor('')}>
                Back
            </Button>
        </>
    )
}

export default Door