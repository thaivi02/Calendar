import React, {useEffect, useState} from 'react';
import {Alert, Badge, Calendar, message} from 'antd';
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import agent from "../../api/agent";
import {todoTask} from "../../models/todoTask";
import {useNavigate} from "react-router-dom";
import AddTask from "../Task/AddTask";
import {toast, ToastContainer} from 'react-toastify';

const CalendarHome: React.FC = () => {
    const [value, setValue] = useState(() => dayjs());
    const [selectedValue, setSelectedValue] = useState(() => dayjs());
    const [tasks, setTasks] = useState<todoTask[]>([])

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        const interval = setInterval(checkForMatchingStartTimes, 20000); // Check every minute
        return () => clearInterval(interval);
    }, [tasks]);

    const fetchTasks = async () => {
        try {
            const data = await agent.TodoTask.get();
            setTasks(data);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
            message.error("Failed to fetch tasks");
        }
    };

    const checkForMatchingStartTimes = () => {
        const now = dayjs();
        console.log('Current time:', now.format('YYYY-MM-DDTHH:mm:ss'));

        tasks.forEach(task => {
            const dateParts = task.date.split('-');
            const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

            const dateTimeString = `${formattedDate}T${task.startTime}`;
            const taskDateTime = dayjs(dateTimeString);

            if (taskDateTime.isValid() && now.isSame(taskDateTime, 'minute')) {
                toast.info(`Task "${task.title}" is starting now.`);
                console.log("thong bao di")
            } else if (!taskDateTime.isValid()) {
                console.error(`Invalid dateTime for task "${task.title}":`, dateTimeString);
            }
        });
    };


    const navigate = useNavigate();

    const handleDoubleClick = (date: Dayjs) => {
        navigate('/taskList', {state: {date: date.format('YYYY-MM-DD')}});
    };

    const getListData = (value: Dayjs) => {
        const dateString = value.format('DD-MM-YYYY');
        return tasks
            .filter(task => task.date === dateString)
            .map(task => ({
                type: task.priorityName,
                content: task.title,
            }));
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <ul className="events" onDoubleClick={() => handleDoubleClick(value)}>
                {listData.map((item, index) => (
                    <li key={index}>
                        <Badge status={item.type as any} text={item.content}/>
                    </li>
                ))}
            </ul>
        );
    };

    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue: Dayjs) => {
        setValue(newValue);
    };

    return (
        <div className="grid grid-cols-4">
            <div className="col-span-3">
                <Alert message={`You selected date: ${selectedValue?.format('DD-MM-YYYY')}`}/>
                <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} cellRender={dateCellRender}/>
            </div>
            <div className="mx-auto">
                <AddTask onSuccess={() => fetchTasks()}/>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default CalendarHome;
