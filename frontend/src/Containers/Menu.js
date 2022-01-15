import Title from "../Components/Title"
import { Button, Row, Col, Card } from 'antd'

const Menu = ({me, setSignedIn, setCar, setDoor}) => {
    return (
        <>
            <Title>
                <h1>MyCar</h1>
            </Title>
            <Row gutter={20}>
                <Col span={12}>
                    <Card title={<span style={{fontSize: 30}}>My Cars</span>} bordered={false} style={{width: 400, height: 350, margin: 20, borderRadius: 20}}>
                        <Button type='link' style={{fontSize: 20}} onClick={()=>setCar('Car1')}>Car1</Button>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title={<span style={{fontSize: 30}}>My Doors</span>} bordered={false} style={{width: 400, height: 350, margin: 20, borderRadius: 20}}>
                        <Button type='link' style={{fontSize: 20}} onClick={()=>setDoor('Door1')}>Door1</Button>
                    </Card>
                </Col>
            </Row>
            <div>
                <p>
                    Welcome, {me}.&emsp;
                    <Button type="primary" onClick={()=>setSignedIn(false)}>
                        Sign Out
                    </Button>
                </p>
            </div>
        </>
    )
}

export default Menu