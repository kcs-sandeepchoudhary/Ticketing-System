import React from "react";
import { Form, Input, Button } from 'antd';
import "../index.css"
import { Link } from "react-router-dom";


const Register = () => {
    const onFinish = (e) => {
        registerUser(e.user)
        alert("registerd succesfully")
    }

    const registerUser = async (response) => {
        try {
            let res = await fetch("http://localhost:4000/reg/reg_user",
                {
                    method: "Post",
                    body: JSON.stringify({

                        uname: response.uname,
                        email: response.email,
                        password: response.password

                    }),

                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
        }
        catch (e) {
            console.warn(e)
        }
    }
    return (<div className="mt-2">
        <Form
            name="nest-messages"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 8,
            }}
            onFinish={onFinish}
        >
            <Form.Item

                name={['user', 'uname']}
                label="Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'email']}
                label="Email"
                rules={[
                    {
                        type: 'email',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name={['user', 'password']}
                label="Password"
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
                <Button className="ml-5" type="primary" htmlType="submit">
                    <Link to="/">Login</Link>
                </Button>
            </Form.Item>
        </Form>
    </div>)
}
export default Register;