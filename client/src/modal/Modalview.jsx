import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';


const { TextArea } = Input;

const Modalview = ({ tableData }) => {
    const [inputTextarea, setInputextarea] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false);



    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {

        try {
            let res = await fetch("http://localhost:4000/ticket/insert_ticket?conty",
                {
                    method: "Post",
                    body: JSON.stringify({ ticketDesc: inputTextarea }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
        }
        catch (e) {
            console.warn(e.message)
        }
        finally {
            tableData()
            setIsModalVisible(false);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const textInput = (e) => {
        setInputextarea(e.target.value)

    }
    //   console.log(inputTextarea)
    return (<>
        <Button type="primary" onClick={showModal}>
            Create Ticket
        </Button>
        <Modal title="Ticket Description" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <TextArea onChange={textInput} />
        </Modal>
    </>)
}
export default Modalview;