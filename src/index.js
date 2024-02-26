import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, Link, RouterProvider} from "react-router-dom";
import CardList from "./components/CardList";
import ServicesList from "./components/ServicesList";
import ServiceDetail from "./components/ServiceDetail";
import Layout from "./components/Layout";
import {Button, Result} from "antd";
import Calendar from "./components/Calendar";
import CalendarDetailPage from "./components/CalendarDetail";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: (
      <Result
        status="404"
        title="404"
        subTitle="Извините, такой страницы не существует"
        extra={<Button type="primary"><Link to='/'>На главную</Link></Button>}
      />
    ),
    children: [
      {
        path: "",
        element: <Link to='https://github.com/GPB-COS/test-work-react'>https://github.com/GPB-COS/test-work-react</Link>,
      },
      {
        path: "cards",
        element: <CardList/>,
      },
      {
        path: "services",
        element: <ServicesList/>,
      },
      {
        path: "services/:id",
        element: <ServiceDetail/>,
      },
      {
        path: "events",
        element: <Calendar/>,
      },
      {
        path: "events/:date",
        element: <CalendarDetailPage/>,
      },
    ],
  },
]);

root.render(
    <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
