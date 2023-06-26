import React, { useState } from 'react';
import { Layout } from 'antd';
import { Header, Content } from './styles/AppStyle';
// import Calendar from './pages/Calendar';
import Todo from './pages/Todo';

const App = () => {
  // const [collapsed, setCollapsed] = useState(false);

  const originData = [
    {
      id: 1,
      city: '경상북도',
      detailCity: '안동시',
      color: 'pink',
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
          id: 1,
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
    },
    {
      id: 1,
      city: '대구광역시',
      detailCity: '북구',
      color: 'skyblue',
      startDate: '2023-06-27',
      endDate: '2023-06-28',
      visitList: [
        {
          id: 1,
          title: '경북대학교 방문',
          complete: false,
          checkList: [
            {
              id: 1,
              title: '교통편 알아보기',
              complete: true,
            },
            {
              id: 2,
              title: '놀거리 찾아보기',
              complete: false,
            },
          ],
        },
        {
          id: 1,
          title: '함지산 등산',
          complete: false,
          checkList: [
            {
              id: 1,
              title: '등산화 챙기기',
              complete: true,
            },
            {
              id: 2,
              title: '근처 맛집 찾아보기',
              complete: false,
            },
          ],
        },
      ],
    },
  ];
  const [data, setData] = useState(originData);
  console.log(data);

  return (
    <Layout>
      <Header>
        <span>Travel Todo</span>
      </Header>
      <Content>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'white',
            borderRadius: 10,
          }}
        >
          {/* <Calendar originData={originData} /> */}
          <Todo setData={setData} data={data} />
        </div>
      </Content>
    </Layout>
  );
};
export default App;
