import React from 'react';
import {Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import NavigationBar from "./NavigationBar";

const headerStyle: React.CSSProperties = {
    height: 80,
    lineHeight: '80px',
    backgroundColor: 'wheat',
};

const DefaultLayout = () => {
    return (
        <Layout>
            <Header style={headerStyle}><NavigationBar/></Header>
            <Content><Outlet/></Content>
        </Layout>
    );
};

export default DefaultLayout;