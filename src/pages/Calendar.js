import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './../styles/fullCalendar.css';
import moment from 'moment';
import { Drawer } from 'antd';
import Schedule from '../components/calendar/Schedule';
import { CalendarDiv } from './../styles/CalendarStyle';
import axios from 'axios';

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
      id: 6,
      color: 'rgb(0, 177, 94)',
      end: '2023-07-09',
      start: '2023-07-06',
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

  let year;
  let month;

  const handleDatesSet = arg => {
    const startDate = arg.start; // 변경된 날짜 범위의 시작 날짜
    const endDate = arg.end; // 변경된 날짜 범위의 종료 날짜

    const currentYear = startDate.getFullYear();
    year = currentYear;

    const startMonth = startDate.getMonth() + 1; // 시작 날짜의 월 (0부터 시작)
    const endMonth = endDate.getMonth() + 1; // 종료 날짜의 월 (0부터 시작)
    const currentMonth = endDate.getMonth();
    month = currentMonth;

    console.log('시작 월:', startMonth);
    console.log('종료 월:', endMonth);
    console.log('현재 월:', currentMonth);

    // 원하는 동작을 수행하거나 상태를 업데이트할 수 있습니다.
    // 예: API 호출, 데이터 로딩 등
  };

  useEffect(() => {
    const getCalendarData = async () => {
      try {
        const res = await axios.get(`/api/calender?year=${year}&month=${month}`);
        const result = res.data;
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    };
    getCalendarData();
  }, []);

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
          datesSet={handleDatesSet}
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
