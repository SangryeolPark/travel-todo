import React, { useEffect, useState } from 'react';
import { AddButton, Content, Header, PageSwitch } from '../styles/AppStyle';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';

const Main = ({ switchBool, setSwitchBool }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mapPath, setMapPath] = useState(null);

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
        <Outlet />
      </Content>
      <AddButton to="/todo">
        <FontAwesomeIcon icon={faPlus} />
      </AddButton>
    </>
  );
};

export default Main;
