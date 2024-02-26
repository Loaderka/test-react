import {useEffect, useState} from 'react';
import {Button, List, Divider, Popconfirm, Typography, Row} from 'antd';
import dayjs from 'dayjs';
import {useParams} from "react-router-dom";
import EventStore from "../../store/EventStore";
import {observer} from "mobx-react-lite";
import CalendarModal from "../CalendarModal";
import NotificationManager from "../NotificationManager";

const CalendarDetail = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const {date} = useParams();
  const selectedDate = dayjs(+date);

  useEffect(() => {
    setSelectedEvents(EventStore.events.filter(event => dayjs(event.startTime).isSame(selectedDate, 'day')));
  }, [EventStore.events.length]);

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const handleDelete = (eventId) => {
    EventStore.deleteEvent(eventId);
    setSelectedEvents(prev => prev.filter(el => el.id !== eventId));
  };

  return (
    <div style={{width: '500px'}}>
      <Typography.Title style={{textAlign: 'center'}}>
        {selectedDate.format('DD.MM.YYYY')}
      </Typography.Title>

      <Divider/>

      <Row justify="center">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Добавить событие</Button>
      </Row>

      <List
        dataSource={selectedEvents}
        renderItem={event => (
          <List.Item actions={[
            <Button type="link" key="edit" size="small" onClick={() => handleEdit(event)}>Редактировать</Button>,
            <Popconfirm
              placement="left"
              title="Вы уверены?"
              okText="Да"
              cancelText="Нет"
              onConfirm={() => handleDelete(event.id)}
            >
              <Button type="link" key="delete" size="small">Удалить</Button>
            </Popconfirm>
          ]}>
            <List.Item.Meta
              title={event.title}
              description={`${dayjs(event.startTime).format('HH:mm')} до ${dayjs(event.endTime).format('HH:mm')}`}
            />
          </List.Item>
        )}
      />

      <CalendarModal
        open={isModalOpen}
        onClose={handleCloseModal}
        selectedEvent={selectedEvent}
      />

      <NotificationManager/>
    </div>
  );
});

export default CalendarDetail;
