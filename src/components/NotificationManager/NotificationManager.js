import {notification} from 'antd';
import dayjs from 'dayjs';
import {useEffect} from 'react';
import EventStore from "../../store/EventStore";
import {observer} from "mobx-react-lite";
import {HOURS_FORMAT} from "../../consts";

const NotificationManager = observer(() => {

  useEffect(() => {
    const interval = setInterval(() => {
      checkEvents();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const checkEvents = () => {
    EventStore.events.forEach(event => {
      notifyEvent(event);
    });
  };

  const notifyEvent = (event) => {
    const reminderHours = parseInt(event.reminder);
    const startTime = dayjs(event.startTime);
    const endTime = dayjs(event.endTime);
    const reminderTime = startTime.subtract(reminderHours, 'hours');

    if (dayjs().isSame(reminderTime, 'minute') && reminderHours !== 0) {
      notification.info({
        message: 'Напоминание',
        description: `У вас запланировано "${event.title}" с ${startTime.format(HOURS_FORMAT)} до ${endTime.format(HOURS_FORMAT)}`,
        duration: 10,
      });
    }
  };

  return null;
});

export default NotificationManager;
