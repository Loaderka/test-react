import {notification} from 'antd';

const showSuccess = (message) => {
  notification.success({
    message: message,
    placement: 'bottomRight',
  });
};

export default showSuccess;
