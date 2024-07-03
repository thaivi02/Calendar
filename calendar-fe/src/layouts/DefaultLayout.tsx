import React from 'react';
import {Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import NavigationBar from "./NavigationBar";

const headerStyle: React.CSSProperties = {
    height: 60,
    lineHeight: '60px',
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