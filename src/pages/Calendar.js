import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './../styles/calendar.css';
import moment from 'moment';

const Calendar = ({ originData }) => {
  // 기존 종료일 + 1
  const defualtEndDate = originData.endDate;
  const date = new Date(defualtEndDate);
  const addOneDay = 86400000;
  const newDate = Number(date) + addOneDay;
  const newEndDate = moment(newDate).format('YYYY-MM-DD');

  // event list
  let travelList = [
    {
      color: 'rgb(0, 177, 94)',
      end: '2023-07-08',
      start: '2023-07-05',
      title: '경상북도 안동시',
    },
    {
      color: 'rgb(255, 209, 2)',
      end: '2023-06-19',
      start: '2023-06-15',
      title: '대구광역시 북구',
    },
    {
      color: 'rgb(184, 3, 3)',
      end: '2023-06-08',
      start: '2023-06-05',
      title: '전라남도 여수시',
    },
  ];
  const eventData = {
    borderColor: originData.color,
    backgroundColor: originData.color,
    title: `${originData.city} ${originData.detailCity}`,
    start: originData.startDate,
    end: newEndDate,
  };
  travelList = [...travelList, eventData];

  useEffect(() => {
    const headerCell = document.querySelectorAll('.fc-col-header-cell-cushion');
    const day = ['일', '월', '화', '수', '목', '금', '토'];
    headerCell.forEach((item, index) => (item.innerHTML = day[index]));
  }, []);

  return (
    <div className="wrap">
      <FullCalendar
        height="75vh"
        initialView="dayGridMonth"
        titleFormat={{
          month: '2-digit',
          year: 'numeric',
        }}
        plugins={[dayGridPlugin]}
        events={travelList}
      />
    </div>
  );
};
export default Calendar;
