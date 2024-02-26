import React from 'react';
import Menu from '../Menu'
import {Outlet} from "react-router-dom";
import '../../styles/index.css';
import {Row} from "antd";

const Layout = () => {
  return (
    <div>
      <Menu/>
      <Row justify="center" style={{padding: '25px'}}>
        <Outlet/>
      </Row>
    </div>
  );
};

export default Layout;
