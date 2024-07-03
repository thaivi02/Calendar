import React, {useEffect, useState} from 'react';
import {Alert, BadgeProps, CalendarProps, theme} from 'antd';
import {Badge, Calendar} from 'antd';
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import agent from "../../api/agent";
import {todoTask} from "../../models/todoTask";
import {useNavigate} from "react-router-dom";
import AddTask from "../Task/AddTask";


const CalendarHome: React.FC = () => {
    const [value, setValue] = useState(() => dayjs());
    const [selectedValue, setSelectedValue] = useState(() => dayjs());
    const [tasks, setTasks] = useState<todoTask[]>([])

    useEffect(() => {
        agent.TodoTask.get()
            .then((data: todoTask[]) => {
                setTasks(data)
            })
            .catch(error => console.log(error))
    }, [tasks]);

    const {token} = theme.useToken();

    const wrapperStyle: React.CSSProperties = {
        maxWidth: '100%', 
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        margin: '0 auto', 
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

    let navigate = useNavigate();

    const handleDoubleClick = (date: Dayjs) => {
        navigate('/taskList', {state: {date: date.format('DD-MM-YYYY')}});
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <ul className="events" onDoubleClick={() => handleDoubleClick(value)}>
                {listData.map((item, index) => (
                    <li key={index}>
                        <Badge status={item.type as BadgeProps['status']} text={item.content}/>
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        return info.originNode;
    };

    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
        setSelectedValue(newValue);
        console.log(newValue.format('DD-MM-YYYY'));
    };

    const onPanelChange = (newValue: Dayjs) => {
        setValue(newValue);
    };

    return (
        <div className="grid grid-cols-4">
            <div style={wrapperStyle} className="col-span-3">
                <Alert message={`You selected date: ${selectedValue?.format('DD-MM-YYYY')}`}/>
                <Calendar value={value} onSelect={onSelect} cellRender={cellRender}/>
            </div>
            <div className="mx-auto">
                <AddTask/>
            </div>
        </div>
    )
};

export default CalendarHome;