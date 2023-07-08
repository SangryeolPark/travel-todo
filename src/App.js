import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Map from './pages/Map';
import Calendar from './pages/Calendar';
import NotFound from './pages/NotFound';
import MapDetail from './components/map/MapDetail';
import Korea from './components/map/map_data/Korea';
import Todo from './pages/Todo';
import Main from './pages/Main';

const STATUS_SERVER_ERROR = '서버와의 연결이 원활하지 않습니다.';
const STATUS_LOADING = '로딩 중...';

export { STATUS_LOADING, STATUS_SERVER_ERROR };

const App = () => {
  const [isDataChanged, setIsDataChanged] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Main isDataChanged={isDataChanged} />}>
        <Route
          path="map"
          element={<Map isDataChanged={isDataChanged} setIsDataChanged={setIsDataChanged} />}
        >
          <Route index element={<Korea />} />
          <Route path=":region" element={<MapDetail />}>
            <Route path=":regionDetail" element={<MapDetail />} />
          </Route>
        </Route>
        <Route path="calendar" element={<Calendar />} />
      </Route>
      <Route path="/todo" element={<Todo setIsDataChanged={setIsDataChanged} />} />
      <Route path="/todo/:id" element={<Todo setIsDataChanged={setIsDataChanged} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default App;
