import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import agent from "../api/agent";
import {Dropdown, MenuProps, Space} from "antd";
import {DownOutlined} from '@ant-design/icons';

const NavigationBar = () => {
    const [fullName, setFullName] = useState<string>()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await agent.auth.UserProfile()
                setFullName(response.fullName)
            } catch (error) {
                console.error('Failed to fetch user profile:', error)
            }
        }

        fetchUserData()
    }, [])

    const handleLogout = () => {
        localStorage.clear()
    }

    const items: MenuProps['items'] = [
        {
            label: <a href="/auth/login" ><p className={"text-red-500 font-medium text-center"}>Logout</p></a>,
            onClick: handleLogout,
            key: '0',
        },
    ];

    return (
        <div className="flex justify-center relative">
            <NavLink to="/" className={'italic font-semibold text-xl text-red-700'}>todotasks</NavLink>
            <Dropdown menu={{items}} trigger={['click']} className="absolute end-0">
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <p className="font-semibold text-lg">{fullName}</p>
                        <DownOutlined/>
                    </Space>
                </a>
            </Dropdown>
        </div>
    );
};

export default NavigationBar;