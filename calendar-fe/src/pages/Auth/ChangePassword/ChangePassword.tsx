import React from 'react';
import {useNavigate} from "react-router-dom";
import agent from "../../../api/agent";
import {Button, Form, Input, message} from "antd";

type FieldType = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};

const ChangePassword = () => {
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            await agent.auth.changePassword(values);
            message.success('Change password successfully');
            setTimeout(() => {
                navigate('/');
            }, 3000)
        } catch (error) {
            message.error('Change password failed');
            console.error('Change password failed', error);
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl mb-6 text-center">Change Password</h1>
                <Form
                    name="register"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Current Password"
                        name="oldPassword"
                        rules={[{required: true, message: 'Please input your current password!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="New Password"
                        name="newPassword"
                        rules={[{required: true, message: 'Please input your new password!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={['newPassword']}
                        hasFeedback
                        rules={[
                            {required: true, message: 'Please confirm your password!'},
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item className="flex justify-center" wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ChangePassword;