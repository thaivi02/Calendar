import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import agent from '../../../api/agent';

type FieldType = {
    fullName:string
    userName: string;
    password: string;
    confirmPassword: string;
};


const Register = () => {
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            await agent.auth.register(values);
            navigate('/auth/login'); // Redirect to the login page after successful registration
        } catch (error) {
            console.error('Registration failed', error);
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl mb-6 text-center">Register</h1>
                <Form
                    name="register"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                        
                    <Form.Item<FieldType>
                        label="Username"
                        name="userName"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item className="flex justify-center" wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Register;
