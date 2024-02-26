import React, {useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import {List, Result} from 'antd';
import serviceStore from '../../store/ServiceStore';
import {Link} from "react-router-dom";
import Loader from "../Loader";

const ServicesList = observer(() => {
  const hasServices = !!serviceStore.services.length;

  useEffect(() => {
    if (!hasServices) {
      serviceStore.fetchServices();
    }
  }, []);

  return (
    <>
      {serviceStore.isLoading && <Loader/>}

      {!hasServices && !serviceStore.isLoading && (
        <Result
          status="500"
          title="Произошла ошибка!"
        />
      )}

      {hasServices && (
        <List
          dataSource={serviceStore.services}
          renderItem={service => (
            <Link to={`/services/${service.id}`}>
              <List.Item key={service.id}>
                {service.name}
              </List.Item>
            </Link>
          )}
        />
      )}
    </>
  );
});

export default ServicesList;
