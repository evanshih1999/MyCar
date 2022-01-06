import { Form, Input, Button, Checkbox } from 'antd'
import Title from "../Components/Title"
import axios from '../api'

const SignIn = ({setMe, setSignedIn, displayStatus}) => {
    const onFinish = async (values) => {
        console.log('Success:', values)
        const username = values.username
        const password = values.password
        try {
            const {
                data: { msg },
            } = await axios.post('/api/user/login', {
                username,
                password
            });
            setMe(values.username)
            setSignedIn(true)
            displayStatus({
                type: 'success',
                msg: msg
            })
        } catch (error) {
            const { data: { msg } } = error.response
            displayStatus({
                type: 'error',
                msg: msg
            })
        }
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    };
    
    return (
        <>
            <Title>
                <h1>MyCar</h1>
            </Title>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                    Sign In
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default SignIn