import React, {useEffect} from 'react';
import {observer } from 'mobx-react-lite';
import {Card, Button, Space, Result} from 'antd';
import {Link, useParams} from 'react-router-dom';
import serviceStore from '../../store/ServiceStore';
import {ArrowLeftOutlined} from "@ant-design/icons";
import Loader from "../Loader";

const ServiceDetail = observer(() => {
  const {id} = useParams();

  useEffect(() => {
    serviceStore.fetchServiceDetails(id);
  }, [id]);

  const {service} = serviceStore;

  const currentService = service && service.id === id;

  return (
    <>
      {serviceStore.isLoading && <Loader/>}

      {!serviceStore.isLoading && !currentService && (
        <Result
          status="500"
          title="Произошла ошибка!"
        />
      )}

      <Space direction="vertical">
        {currentService && (
          <>
            <Card title="Детали услуги">
              <p>Название: {service.name}</p>
              <p>Описание: {service.content}</p>
              <p>Цена: {service.price}</p>
            </Card>

            <Link to="/services">
              <Button type="primary">
                <ArrowLeftOutlined />
                Назад
              </Button>
            </Link>
          </>
        )}
      </Space>
    </>
  );
});

export default ServiceDetail;
