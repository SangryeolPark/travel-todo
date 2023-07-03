import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './../styles/fullCalendar.css';
import moment from 'moment';
import { Drawer } from 'antd';
import Schedule from '../components/calendar/Schedule';
import { CalendarDiv } from './../styles/CalendarStyle';

const Calendar = ({ originData }) => {
  // (캘린더 표시) 기존 종료일 + 1
  const defualtEndDate = originData.endDate;
  const date = new Date(defualtEndDate);
  const addOneDay = 86400000;
  const newDate = Number(date) + addOneDay;
  const newEndDate = moment(newDate).format('YYYY-MM-DD');

  // 여행 일정 클릭시
  const [selectTitle, setSelecTitle] = useState('');
  const [selectStartDate, setSelectStartDate] = useState('');
  const [selectEndDate, setSelectEndDate] = useState('');

  // 세부 여행 일정
  const [open, setOpen] = useState(false);
  const showDrawer = e => {
    console.log(e);
    const eventTitle = e.event._def.title;
    const eventStartDate = moment(e.event._instance.range.start).format('YYYY-MM-DD');

    // (세부 일정 표시) 종료일 - 1
    const defaultEndDate = e.event._instance.range.end;
    const removeOneDay = 86400000;
    const newDate = Number(defaultEndDate) - removeOneDay;
    const eventEndDate = moment(newDate).format('YYYY-MM-DD');

    setSelecTitle(eventTitle);
    setSelectStartDate(eventStartDate);
    setSelectEndDate(eventEndDate);
    setOpen(true);
  };

  // 임시 event list
  let travelList = [
    {
      id: 1,
      color: 'rgb(0, 177, 94)',
      end: '2023-07-08',
      start: '2023-07-05',
      title: '경상북도 안동시',
    },
    {
      id: 2,
      color: 'rgb(255, 209, 2)',
      end: '2023-07-12',
      start: '2023-07-10',
      title: '대구광역시 북구',
    },
    {
      id: 3,
      color: 'rgb(184, 3, 3)',
      end: '2023-07-24',
      start: '2023-07-21',
      title: '전라남도 여수시',
    },
  ];

  const eventData = {
    id: originData.id,
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
  });

  return (
    <CalendarDiv>
      <div className="wrap">
        <FullCalendar
          height="74.4vh"
          initialView="dayGridMonth"
          titleFormat={{
            year: 'numeric',
            month: '2-digit',
          }}
          // titleFormat: function (date) {
          //   year = date.date.year;
          //   month = date.date.month + 1;

          //   return year + "년 " + month + "월";
          // },
          plugins={[dayGridPlugin]}
          events={travelList}
          eventClick={showDrawer}
        />
      </div>
      <Drawer
        placement="right"
        closable={false}
        // onClose={onClose}
        open={open}
        getContainer={false}
      >
        <Schedule
          setOpen={setOpen}
          selectTitle={selectTitle}
          selectStartDate={selectStartDate}
          selectEndDate={selectEndDate}
        />
      </Drawer>
    </CalendarDiv>
  );
};
export default Calendar;
