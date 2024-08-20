import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, message, Select, TimePicker, Typography} from "antd";
import dayjs from "dayjs";
import agent from "../../api/agent";
import {priority} from "../../models/priority";

const priorityMapping: { [key: number]: string } = {
    1: "Low",
    2: "Normal",
    3: "High"
};

interface AddTaskProps {
    onSuccess: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({onSuccess}) => {
    const [form] = Form.useForm();
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

            await agent.TodoTask.create({
                title: values.title,
                description: values.description,
                date: formattedDate,
                startTime: formattedStartTime,
                endTime: formattedEndTime,
                priorityId: values.priorityId
            });

            message.success('Task created successfully');
            onSuccess(); // Call the onSuccess callback to trigger parent component update
            form.resetFields(); // Reset form fields after successful submission
        } catch (error) {
            console.error("Failed to create task: ", error);
            message.error('Failed to create task');
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
                form={form}
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
                    <DatePicker disabledDate={d => !d || d.isBefore(dayjs().startOf('day'), 'day')}
                                format="DD-MM-YYYY"/>
                </Form.Item>

                <Form.Item name="startTime" label="Start Time"
                           rules={[{required: true, message: 'Please choose Start Time!'}]}
                >
                    <TimePicker format="HH:mm:ss"/>
                </Form.Item>

                <Form.Item
                    name="endTime"
                    label="End Time"
                    dependencies={['startTime']}
                    rules={[
                        {required: true},
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value) {
                                    return Promise.reject(new Error('Please choose End Time!'));
                                }
                                const startTime = getFieldValue('startTime');
                                if (startTime && value.isBefore(startTime)) {
                                    return Promise.reject(new Error('End Time must be greater than Start Time!'));
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
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
