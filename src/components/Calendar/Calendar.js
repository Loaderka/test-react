import {Badge, Calendar as CalendarAntd} from 'antd';
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import NotificationManager from "../NotificationManager";
import getListData from "../../utils/getListData";

const Calendar = observer(() => {
  const navigate = useNavigate();

  const onSelect = (newValue, info) => {
    if (info.source === "date") {
      navigate(`/events/${newValue.valueOf()}`);
    }
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return (
    <>
      <CalendarAntd
        onSelect={onSelect}
        cellRender={cellRender}
      />

      <NotificationManager/>
    </>
  )
});

export default Calendar;
