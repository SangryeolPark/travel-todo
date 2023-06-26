import React from 'react';
import { Layout } from 'antd';
import { Header, Content } from './styles/AppStyle';
import Home from './pages/Home';
import Map from './pages/Map';
import Calendar from './pages/Calendar';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Korea from './components/map/Korea';
import MapDetail from './components/map/MapDetail';

const App = () => {
  return (
    <Layout>
      <Header>
        <span>Travel Todo</span>
      </Header>
      <Content>
        {/* <Map /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />}>
            <Route index element={<Korea />} />
            <Route path=":region" element={<MapDetail />} />
          </Route>
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Content>
    </Layout>
  );
};
export default App;
