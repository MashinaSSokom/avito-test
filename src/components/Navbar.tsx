import React from 'react';
import {Layout, Menu, Row} from "antd";
import {RouteNames} from "../router";
import {Redirect, Route, useHistory} from "react-router-dom";

const Navbar = () => {
    const history = useHistory()
    // history.push('/story/123')
    return (
        <Layout.Header>
            <Row justify={'start'}>
                <Menu theme={"dark"} mode={"horizontal"} selectable={false}>
                    <Menu.Item onClick={() => history.push(RouteNames.HOME)}
                               key={1}>
                        Главная
                    </Menu.Item>
                </Menu>
            </Row>
        </Layout.Header>
    );
};

export default Navbar;