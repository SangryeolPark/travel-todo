import React, { useEffect, useState } from 'react';
import { AddButton, Content, Header, PageSwitch } from '../styles/AppStyle';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import logoSmall from '../logosmall.png';

const Main = ({ isDataChanged }) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [mapPath, setMapPath] = useState(null);
  const [calendarPath, setCalendarPath] = useState(null);
  const [switchBool, setSwitchBool] = useState(pathname.includes('map'));
  const [regionData, setRegionData] = useState(null);
  const [regionDataLoading, setRegionDataLoading] = useState('loading');

  useEffect(() => {
    const getRegionData = async () => {
      try {
        const { data } = await axios.get('/api/map/count');
        setRegionData(data);
      } catch (error) {
        console.log(error);
        setRegionDataLoading('fail');
      }
    };

    getRegionData();
  }, [isDataChanged]);

  useEffect(() => {
    if (pathname.includes('map')) {
      if (!calendarPath) {
        setCalendarPath('/calendar');
      }
      setSwitchBool(true);
      setMapPath(pathname + search);
    } else if (pathname.includes('calendar')) {
      if (!mapPath) {
        setMapPath('/map');
      }
      setSwitchBool(false);
      setCalendarPath(pathname + search);
    }
  }, [pathname, search]);

  useEffect(() => {
    navigate(switchBool ? mapPath : calendarPath);
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
        <img src={logoSmall} alt="" className="logo-small" />
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
