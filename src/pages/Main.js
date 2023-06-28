import React, { useEffect, useState } from 'react';
import { Content, Header, PageSwitch } from '../styles/AppStyle';
import { Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';

const Main = () => {
  const navigate = useNavigate();
  const [switchBool, setSwitchBool] = useState(true);

  useEffect(() => {
    // switchBool ? navigate('/map') : navigate('/calendar');
  }, [switchBool]);

  return (
    <>
      <Header>
        <span>Travel Todo</span>
        <PageSwitch
          onChange={() => setSwitchBool(!switchBool)}
          checkedChildren={<FontAwesomeIcon icon={faEarthAsia} />}
          unCheckedChildren={<FontAwesomeIcon icon={faCalendarDays} />}
          checked={switchBool}
        />
      </Header>
      <Content>
        <Outlet />
      </Content>
    </>
  );
};

export default Main;
