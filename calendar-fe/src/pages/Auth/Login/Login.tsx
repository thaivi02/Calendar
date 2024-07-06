import React from 'react';
import {Button, Checkbox, Form, FormProps, Input} from "antd";
import agent from "../../../api/agent";
import Title from "antd/es/typography/Title";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Link, useNavigate} from "react-router-dom";

type FieldType = {
    userName?: string;
    password?: string;
};


function Login() {
    const navigate = useNavigate();
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            const response = await agent.auth.login(values);
            localStorage.setItem('token', response.token);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure (e.g., show an error message)
            toast.error('Login failed! Please check username or password.');
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <Title className='pb-6' level={2} style={{textAlign: 'center'}}>Login</Title>
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 350}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Username"
                        name="userName"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item className="flex justify-center" wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                    
                    <div className="w-full flex justify-center">
                        <Link to="/auth/register">Register a new account</Link>
                    </div>
                     
                </Form>
                <ToastContainer/>
            </div>
        </div>
    );
}

export default Login;