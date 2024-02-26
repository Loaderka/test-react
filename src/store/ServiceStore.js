import {makeObservable, observable, action} from 'mobx';
import axios from "axios";
import {notification} from "antd";
import showError from "../utils/showError";

class ServiceStore {
  services = [];
  service = null;
  isLoading = false;

  constructor() {
    makeObservable(this, {
      services: observable,
      service: observable,
      isLoading: observable,
      fetchServices: action,
      fetchServiceDetails: action,
    });
  }

  fetchServices() {
    this.isLoading = true;

    notification.destroy();

    axios('http://localhost:7070/api/services')
      .then(res => {
        this.services = res.data;
      })
      .catch(() => showError(() => this.fetchServices()))
      .finally(() => this.isLoading = false)
  };

  fetchServiceDetails(id) {
    this.isLoading = true;
    const serviceId = id;

    notification.destroy();

    axios(`http://localhost:7070/api/services/${id}`)
      .then(res => {
        this.service = res.data;
      })
      .catch(() => showError(() => this.fetchServiceDetails(serviceId)))
      .finally(() => this.isLoading = false)
  };
}

const serviceStore = new ServiceStore();
export default serviceStore;
