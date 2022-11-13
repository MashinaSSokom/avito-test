import React from 'react';
import {Layout, Menu, Row} from "antd";
import {RouteNames} from "../router";
import {useHistory} from "react-router-dom";

const Navbar = () => {
    let history = useHistory()

    return (
        <Layout.Header className={'navbar'}>
            <Row justify={'start'}>
                <Menu theme={"dark"} mode={"horizontal"} selectable={false}>
                    <Menu.Item onClick={() => history.push(RouteNames.HOME)} key={1}>
                        Главная
                    </Menu.Item>
                </Menu>
            </Row>
        </Layout.Header>
    );
};

export default Navbar;