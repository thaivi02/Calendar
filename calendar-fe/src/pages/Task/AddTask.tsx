import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, message, Select, TimePicker, Typography} from "antd";
import {Dayjs} from "dayjs";
import agent from "../../api/agent";
import {priority} from "../../models/priority";
import dayjs from 'dayjs';

const priorityMapping: { [key: number]: string } = {
    1: "Low",
    2: "Normal",
    3: "High"
};
const AddTask: React.FC = () => {
    const [priorities, setPriorities] = useState<priority[]>([]);

    useEffect(() => {
        agent.Priority.list()
            .then((data: priority[]) => {
                setPriorities(data);
            })
            .catch(error => {
                console.error("Failed to fetch priorities:", error);
            });
    }, []);

    const handleSubmit = async (values: any) => {
        try {
            const formattedDate = values.date.format('DD-MM-YYYY');
            const formattedStartTime = values.startTime.format('HH:mm:ss');
            const formattedEndTime = values.endTime.format('HH:mm:ss');

            const response = await agent.TodoTask.create({
                title: values.title,
                description: values.description,
                date: formattedDate,
                startTime: formattedStartTime,
                endTime: formattedEndTime,
                priorityId: values.priorityId
            });

            if (response) {
                message.success('Task created successfully');
            }
            console.log(response);
        } catch (error) {
            console.error("Failed to create task: ", error);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        message.error('Failed to create task');
    };

    return (
        <div className="mt-6">
            <Typography.Title level={2} className="text-center">Add Task</Typography.Title>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{required: true, message: 'Please input Title!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{required: true, message: 'Please input Description!'}]}
                >
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item name="date" label="Date"
                           rules={[{required: true, message: 'Please choose Date!'}]}>
                    <DatePicker format="DD-MM-YYYY"/>
                </Form.Item>

                <Form.Item name="startTime" label="Start Time"
                           rules={[{required: true, message: 'Please choose Start Time!'}]}
                >
                    <TimePicker format="HH:mm:ss"/>
                </Form.Item>

                <Form.Item name="endTime" label="End Time"
                           rules={[{required: true, message: 'Please choose End Time!'}]}>
                    <TimePicker format="HH:mm:ss"/>
                </Form.Item>

                <Form.Item
                    name="priorityId"
                    label="Priority"
                    rules={[{required: true, message: 'Please select priority!'}]}
                >
                    <Select>
                        {priorities.map((priority: priority) => (
                            <Select.Option key={priority.priorityId} value={priority.priorityId}>
                                {priorityMapping[priority.priorityId]}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Add Task
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
};

export default AddTask;
