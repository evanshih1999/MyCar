import { useState } from 'react'
import { message } from 'antd'
import styled from 'styled-components'
import Menu from './Menu'
import SignIn from './SignIn'
import Register from './Register'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
`;

function App() {
    const [signedIn, setSignedIn] = useState(false)
    const [registered, setRegistered] = useState(true)
    const [me, setMe] = useState('')
    
    const displayStatus = (payload) => {
        if (payload.msg) {
            const { type, msg } = payload
            const content = {
                content: msg, duration: 0.5 }
            switch (type) {
                case 'success':
                    message.success(content)
                    break
                case 'info':
                    message.info(content)
                    break
                case 'error':
                default:
                    message.error(content)
                    break
    }}}

    return (
        <Wrapper>
            {signedIn?
                <Menu
                    me = {me}
                />:
                registered?
                    <SignIn
                        setMe = {setMe}
                        setSignedIn = {setSignedIn}
                        displayStatus = {displayStatus}
                    />:
                    <Register/>
            }
        </Wrapper>
    )
}
  
export default App;