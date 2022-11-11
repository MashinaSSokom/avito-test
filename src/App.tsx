import React from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import {Layout} from "antd";

function App() {
    return (
        <Layout>
            <Navbar/>
            <AppRouter/>
        </Layout>
    );
}

export default App;
