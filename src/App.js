import React from 'react';
import { Layout } from 'antd';
import { Header, Content } from './styles/AppStyle';
import Map from './pages/Map';
import Calendar from './pages/Calendar';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Layout>
      <Header>
        <span>Travel Todo</span>
      </Header>
      <Content>
        {/* <Map /> */}
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/map" element={<Map />}>
            {/* <Route index element={<Korea />} /> */}
            <Route path=":region" element={<Map />} />
          </Route>
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Content>
    </Layout>
  );
};
export default App;
