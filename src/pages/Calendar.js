import React, { useEffect } from 'react';
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
  // const test = moment('June 2023').format(`'YYYY년 M월'`);

  useEffect(() => {
    const headerCell = document.querySelectorAll('.fc-col-header-cell-cushion');
    const day = ['일', '월', '화', '수', '목', '금', '토'];
    headerCell.forEach((item, index) => (item.innerHTML = day[index]));

    // let test = document.querySelector('.fc-toolbar-title');
    // const newMonth = moment(test.innerHTML).format(`YYYY년 M월`);
    // console.log(newMonth);

    // test.innerHTML = newMonth;
    // console.log(test.innerHTML);

    // const dayNum = document.querySelectorAll('.fc-daygrid-day-number');
    // dayNum.forEach(item => (item.innerHTML = item.innerHTML.replace('일', '')));
  }, []);

  return (
    <div className="wrap">
      <FullCalendar
        height="calc(100vh - 130px)"
        initialView="dayGridMonth"
        // locale="ko"
        // locales={['esLocale', 'koLocale']}
        titleFormat={{
          month: '2-digit',
          year: 'numeric',
          locale: 'ko',
        }}
        // dayCellContent={{ locale: 'ko' }}
        plugins={[dayGridPlugin]}
        events={travelList}
      />
    </div>
  );
};
export default Calendar;
