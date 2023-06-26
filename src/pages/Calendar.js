import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './../styles/calendar.css';
import moment from 'moment';

const Calendar = ({ data }) => {
  console.log(data);
  let travelList = [];
  data.forEach(item => {
    // 기존 종료일 + 1
    const defualtEndDate = item.endDate;
    const date = new Date(defualtEndDate);
    const addOneDay = 86400000;
    const newDate = Number(date) + addOneDay;
    const newEndDate = moment(newDate).format('YYYY-MM-DD');
    const eventData = {
      borderColor: item.color,
      backgroundColor: item.color,
      title: `${item.city} ${item.county}`,
      start: item.startDate,
      end: newEndDate,
    };
    travelList = [...travelList, eventData];
  });
  return (
    <div className="wrap">
      <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin]} events={travelList} />
    </div>
  );
};

export default Calendar;
