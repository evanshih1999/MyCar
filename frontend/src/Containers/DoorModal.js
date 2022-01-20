import { useState } from 'react';
import { Modal, Input } from 'antd';

const DoorModal = ({ visible, onCreate, onCancel }) => {
    const [doorname, setDoorname] = useState("")
    
    return (
        <Modal
            visible = {visible}
            onOk = {()=>onCreate({doorname})}
            onCancel = {onCancel}
            okText = "Add"
            title = "Add a new door"
        >
            <Input
                value={doorname}
                onChange={(e) => setDoorname(e.target.value)}
                placeholder="Enter door name here..."
                style={{marginBottom:10}}
            />
        </Modal>
    );
};

export default DoorModal;