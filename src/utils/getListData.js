import EventStore from "../store/EventStore";
import dayjs from "dayjs";

const getListData = (value) => {
  const events = EventStore.events.filter(event => {
    const eventDate = dayjs(event.startTime);
    return eventDate.isSame(value.startOf('day'), 'day');
  });

  return events.map(event => ({
    type: 'success',
    content: event.title,
  }));
};

export default getListData;
