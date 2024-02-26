import {Button, notification} from "antd";

const showError = (handleClick) => {
  notification.error({
    duration: null,
    btn: (
      <Button onClick={handleClick}>
        Повторить запрос
      </Button>
    ),
    message: 'Произошла ошибка!',
    placement: 'bottomRight',
  })
};

export default showError;
