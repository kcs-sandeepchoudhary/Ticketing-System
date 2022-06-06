import React, { useState } from "react";
import { Form, Input, Button,message } from 'antd';
import 'antd/dist/antd.css';
import "../index.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [islogin,setIslogin]=useState(false)

  const onFinish = (e) => {
    console.log(e)
    loginUser(e)
  
  }
  const loginUser = async (data) => {
  let res={}
    try {
     res = await fetch("http://localhost:4000/login/login_auth",
        {
          method: "Post",
          body: JSON.stringify({
            email: data.useremail,
            password: data.password

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
    finally{
      if(res.status===200){
       setIslogin(true)
        message.success("logged in successfully")
      }else{
        message.error("invalid user...")
      }
    }
  }
  return (<div className="mt-2 ">
    <Form
      onFinish={onFinish}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}

      autoComplete="off"
    >
      <Form.Item
        className="mt-2"
        label="UserEmail"
        name="useremail"
        rules={[
          {
            type:"email",
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

      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        {/* <Button type="primary" htmlType="submit">{islogin ? <Link to="/get_ticket">Login</Link>:"Login"}
        </Button> */}
        <Button type="primary" htmlType="submit">
          {islogin && <Link to="/get_ticket">Login</Link>}
          {!islogin && "Login"}
        </Button>
        <Button className="ml-5" type="primary" htmlType="submit">
          <Link to="/register">Register Now</Link>
        </Button>
      </Form.Item>
    </Form>
    
  </div>)
}
export default Login;