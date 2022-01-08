import Title from "../Components/Title"
import { Button } from 'antd'

const Menu = ({me, setSignedIn, setRegistered}) => {
    return (
        <>
            <Title>
                <h1>Welcome, {me}</h1>
            </Title>
            <div>
                <Button type="primary" onClick={()=>setSignedIn(false)}>
                    Sign Out
                </Button>
            </div>
        </>
    )
}

export default Menu