import {Form, Input, Button, Select, TimePicker, Modal, Space} from 'antd';
import dayjs from 'dayjs';
import EventStore from "../../store/EventStore";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import showSuccess from "../../utils/showSuccess";
import {HOURS_FORMAT} from "../../consts";

const CalendarModal = observer(({open, onClose, selectedEvent}) => {
  const [form] = Form.useForm();

  const {date} = useParams();
  const selectedDate = dayjs(+date);

  const handleFinish = (values) => {
    const {title, startDateTime, endDateTime, reminder} = values;

    const startDate = dayjs(selectedDate).startOf('day').add(startDateTime.hour(), 'hour').add(startDateTime.minute(), 'minute');
    const endDate = dayjs(selectedDate).startOf('day').add(endDateTime.hour(), 'hour').add(endDateTime.minute(), 'minute');

    if (selectedEvent) {
      EventStore.editEvent(selectedEvent.id, title, startDate, endDate, reminder);

      showSuccess('Событие обновлено!')
    } else {
      EventStore.addEvent(title, startDate, endDate, reminder);

      showSuccess('Событие добавлено!')
    }

    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={selectedEvent ? 'Редактировать событие' : 'Добавить событие'}
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        onFinish={handleFinish}
        preserve={false}
      >
        <Form.Item
          label="Название"
          name="title"
          rules={[{ required: true, message: 'Введите название события' }]}
          initialValue={selectedEvent?.title}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Время начала"
          name="startDateTime"
          rules={[{ required: true, message: 'Укажите время начала' }]}
          initialValue={selectedEvent ? dayjs(selectedEvent?.startTime) : null}
        >
          <TimePicker format={HOURS_FORMAT}/>
        </Form.Item>
        <Form.Item
          label="Время окончания"
          name="endDateTime"
          rules={[{ required: true, message: 'Укажите время окончания' }]}
          initialValue={selectedEvent ? dayjs(selectedEvent?.endTime) : null}
        >
          <TimePicker format={HOURS_FORMAT}/>
        </Form.Item>
        <Form.Item
          label="За сколько часов напомнить"
          name="reminder"
          initialValue={selectedEvent?.reminder ?? '0'}
        >
          <Select
            options={[
              {value: '0', label: 'Не напоминать'},
              {value: '1', label: '1'},
              {value: '2', label: '2'},
              {value: '3', label: '3'},
              {value: '4', label: '4'},
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {selectedEvent ? 'Сохранить' : 'Добавить'}
            </Button>
            <Button onClick={onClose}>
              Отмена
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default CalendarModal;
