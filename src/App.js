import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Map from './pages/Map';
import Calendar from './pages/Calendar';
import NotFound from './pages/NotFound';
import MapDetail from './components/map/MapDetail';
import Korea from './components/map/map_data/Korea';
import Todo from './pages/Todo';
import Main from './pages/Main';
import axios from 'axios';

const App = () => {
  const originData = {
    id: 1,
    city: '경상북도',
    detailCity: '안동시',
    color: 'rgb(0, 55, 173)',
    startDate: '2023-06-30',
    endDate: '2023-07-01',
    visitList: [
      {
        id: 1,
        title: '월영교 방문',
        complete: false,
        checkList: [
          {
            id: 1,
            title: '카메라 챙기기',
            complete: true,
          },
          {
            id: 2,
            title: '근처 맛집 찾아보기',
            complete: false,
          },
        ],
      },
      {
        id: 2,
        title: '안동 시장 구경',
        complete: true,
        checkList: [
          {
            id: 1,
            title: '인근 주차장 검색',
            complete: true,
          },
          {
            id: 2,
            title: '시장 맛집 검색',
            complete: false,
          },
        ],
      },
    ],
  };
  // {
  //   id: 2,
  //   city: '대구광역시',
  //   detailCity: '북구',
  //   color: 'skyblue',
  //   startDate: '2023-06-27',
  //   endDate: '2023-06-28',
  //   visitList: [
  //     {
  //       id: 1,
  //       title: '경북대학교 방문',
  //       complete: false,
  //       checkList: [
  //         {
  //           id: 1,
  //           title: '교통편 알아보기',
  //           complete: true,
  //         },
  //         {
  //           id: 2,
  //           title: '놀거리 찾아보기',
  //           complete: false,
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       title: '함지산 등산',
  //       complete: false,
  //       checkList: [
  //         {
  //           id: 1,
  //           title: '등산화 챙기기',
  //           complete: true,
  //         },
  //         {
  //           id: 2,
  //           title: '근처 맛집 찾아보기',
  //           complete: false,
  //         },
  //       ],
  //     },
  //   ],
  // },

  const [data, setData] = useState(originData);
  const [switchBool, setSwitchBool] = useState(true);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Main switchBool={switchBool} setSwitchBool={setSwitchBool} />}>
        <Route path="map" element={<Map />}>
          <Route index element={<Korea />} />
          <Route path=":region" element={<MapDetail />}>
            <Route path=":regionDetail" element={<MapDetail />} />
          </Route>
        </Route>
        <Route path="calendar" element={<Calendar originData={originData} />} />
      </Route>
      <Route path="/todo" element={<Todo setData={setData} data={data} />} />
      <Route path="/todo/:id" element={<Todo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default App;
