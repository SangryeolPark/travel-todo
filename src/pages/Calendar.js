import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './../styles/calendar.css';
import moment from 'moment';
import styled from '@emotion/styled';

const Calendar = ({ originData }) => {
  let travelList = [];
  originData.forEach(item => {
    // 기존 종료일 + 1
    const defualtEndDate = item.endDate;
    const date = new Date(defualtEndDate);
    const addOneDay = 86400000;
    const newDate = Number(date) + addOneDay;
    const newEndDate = moment(newDate).format('YYYY-MM-DD');
    const eventData = {
      borderColor: item.color,
      backgroundColor: item.color,
      title: `${item.city} ${item.detailCity}`,
      start: item.startDate,
      end: newEndDate,
    };
    travelList = [...travelList, eventData];
  });

  return (
    <div className="wrap">
      <FullCalendar
        height="calc(100vh - 130px)"
        initialView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={travelList}
      />
    </div>
  );
};

export default Calendar;
