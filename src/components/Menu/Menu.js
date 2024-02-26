import React from 'react';
import {Menu as AntMenu} from 'antd';
import {useLocation} from 'react-router-dom';
import {MENU_ITEMS} from "./consts";

const Menu = () => {
  const location = useLocation();

  return (
    <AntMenu
      mode="horizontal"
      items={MENU_ITEMS}
      selectedKeys={[location.pathname]}
      style={{display: 'flex', justifyContent: 'center'}}
    />
  );
};

export default Menu;
