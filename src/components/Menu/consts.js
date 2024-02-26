import {Link} from "react-router-dom";
import React from "react";

export const MENU_ITEMS = [
  {
    label: <Link to="/cards">Задание №1</Link>,
    key: '/cards',
  },
  {
    label: <Link to="/services">Задание №2</Link>,
    key: '/services',
  },
  {
    label: <Link to="/events">Задание №3</Link>,
    key: '/events',
  },
];
