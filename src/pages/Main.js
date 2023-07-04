import React, { useEffect, useState } from 'react';
import { AddButton, Content, Header, PageSwitch } from '../styles/AppStyle';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

import { STATUS_LOADING, STATUS_SERVER_ERROR } from '../App';

const Main = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mapPath, setMapPath] = useState(null);
  const [switchBool, setSwitchBool] = useState(pathname.includes('map'));
  const [regionData, setRegionData] = useState(null);
  const [regionDataLoading, setRegionDataLoading] = useState(STATUS_LOADING);

  useEffect(() => {
    const getRegionData = async () => {
      try {
        const { data } = await axios.get('/api/todo');
        setRegionData(data);
      } catch (error) {
        console.log(error);
        setRegionDataLoading(STATUS_SERVER_ERROR);
      }
    };

    getRegionData();
  }, []);

  useEffect(() => {
    if (pathname.includes('map')) {
      setSwitchBool(true);
      setMapPath(pathname);
    } else if (pathname.includes('calendar')) {
      if (!mapPath) {
        setMapPath('/map');
      }
      setSwitchBool(false);
    }
  }, [pathname]);

  useEffect(() => {
    navigate(switchBool ? mapPath : '/calendar');
  }, [switchBool]);

  const handleSwitchChange = () => {
    setSwitchBool(!switchBool);
  };

  const handleAddClick = () => {
    navigate('/todo');
  };

  return (
    <>
      <Header>
        <span>Travel Todo</span>
        <PageSwitch
          onChange={handleSwitchChange}
          checked={switchBool}
          checkedChildren={<FontAwesomeIcon icon={faCalendarDays} />}
          unCheckedChildren={<FontAwesomeIcon icon={faEarthAsia} />}
        />
      </Header>
      <Content>
        <Outlet context={{ regionData, regionDataLoading }} />
      </Content>
      <AddButton
        onClick={handleAddClick}
        icon={<FontAwesomeIcon icon={faPlus} />}
        type="primary"
        shape="circle"
      />
    </>
  );
};

export default Main;
