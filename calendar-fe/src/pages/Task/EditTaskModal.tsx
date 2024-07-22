import React, { useEffect, useState } from 'react';
import { Modal, Input, DatePicker, TimePicker, Select, message } from 'antd';
import agent from "../../api/agent";
import { todoTask } from '../../models/todoTask';
import { priority } from "../../models/priority";
import dayjs from 'dayjs';

const { Option } = Select;

const priorityMapping: { [key: string]: number } = {
    warning: 1,
    success: 2,
    error: 3
};

interface EditTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (task: todoTask) => void;
    task: todoTask;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, onSave, task }) => {
    const [editedTask, setEditedTask] = useState<Partial<todoTask>>({
        ...task,
        priorityId: priorityMapping[task.priorityName] // Convert priorityName to priorityId
    });

    const [priorities, setPriorities] = useState<priority[]>([]);

    useEffect(() => {
        fetchPriorities();
    }, []);

    const fetchPriorities = async () => {
        try {
            const data = await agent.Priority.list();
            setPriorities(data);
        } catch (error) {
            console.error("Failed to fetch priorities:", error);
        }
    };

    const handleFieldChange = (fieldName: keyof todoTask, value: any) => {
        setEditedTask({ ...editedTask, [fieldName]: value });
    };

    const handleSubmit = async () => {
        try {
            await onSave(editedTask as todoTask);
        } catch (error) {
            console.error('Failed to update task', error);
            message.error('Failed to update task');
        }
    };

    return (
        <Modal
            title="Edit Task"
            open={isOpen}
            onOk={handleSubmit}
            onCancel={onClose}
            okText="Save"
            cancelText="Cancel"
        >
            <Input
                value={editedTask.title || ''}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                placeholder="Title"
            />
            <DatePicker
                value={editedTask.date ? dayjs(editedTask.date, "DD-MM-YYYY") : undefined}
                onChange={(date) => handleFieldChange('date', date?.format("DD-MM-YYYY"))}
                placeholder="Date"
                style={{ marginTop: 10, width: '100%' }}
            />
            <TimePicker
                value={editedTask.startTime ? dayjs(editedTask.startTime, 'HH:mm:ss') : undefined}
                onChange={(time) => handleFieldChange('startTime', time?.format("HH:mm:ss"))}
                placeholder="Start Time"
                style={{ marginTop: 10, width: '100%' }}
            />
            <TimePicker
                value={editedTask.endTime ? dayjs(editedTask.endTime, 'HH:mm:ss') : undefined}
                onChange={(time) => handleFieldChange('endTime', time?.format("HH:mm:ss"))}
                placeholder="End Time"
                style={{ marginTop: 10, width: '100%' }}
            />
            <Select
                value={editedTask.priorityId}
                onChange={(value) => handleFieldChange('priorityId', value)}
                placeholder="Select Priority"
                style={{ marginTop: 10, width: '100%' }}
            >
                {priorities.map((priority: priority) => (
                    <Option key={priority.priorityId} value={priority.priorityId}>
                        {priority.priorityName}
                    </Option>
                ))}
            </Select>
            <Input.TextArea
                value={editedTask.description || ''}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                placeholder="Description"
                style={{ marginTop: 10 }}
            />
        </Modal>
    );
};

export default EditTaskModal;
