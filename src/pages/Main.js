import React, { useEffect, useState } from 'react';
import { AddButton, Content, Header, PageSwitch } from '../styles/AppStyle';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

const Main = ({ switchBool, setSwitchBool }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mapPath, setMapPath] = useState(null);
  const [regionCode, setRegionCode] = useState(null);

  const getRegionCode = async () => {
    try {
      const { data } = await axios.get('/api/todo');
      // const { data } = await axios.get('http://localhost:5000/data');
      setRegionCode(data);
    } catch (error) {
      console.log(error);
    }
  };

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
    getRegionCode();
    switchBool ? navigate(mapPath) : navigate('/calendar');
  }, [switchBool]);

  return (
    <>
      <Header>
        <span>Travel Todo</span>
        <PageSwitch
          onChange={() => setSwitchBool(!switchBool)}
          checked={switchBool}
          checkedChildren={<FontAwesomeIcon icon={faCalendarDays} />}
          unCheckedChildren={<FontAwesomeIcon icon={faEarthAsia} />}
        />
      </Header>
      <Content>
        <Outlet context={{ regionCode }} />
      </Content>
      <AddButton
        onClick={() => navigate('/todo')}
        icon={<FontAwesomeIcon icon={faPlus} />}
        type="primary"
        shape="circle"
      />
    </>
  );
};

export default Main;
