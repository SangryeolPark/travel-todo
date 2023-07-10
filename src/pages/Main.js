import React, { useEffect, useState } from 'react';
import { AddButton, Content, Header, MainContainer, PageSwitch } from '../styles/AppStyle';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import logoSmall from '../logosmall.png';

const Main = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [switchBool, setSwitchBool] = useState(pathname.includes('map'));
  const [previousPath, setPreviousPath] = useState(null);

  useEffect(() => {
    if (pathname.includes('map')) {
      if (!previousPath) {
        setPreviousPath('/calendar');
      }
      setSwitchBool(true);
    } else if (pathname.includes('calendar')) {
      if (!previousPath) {
        setPreviousPath('/map');
      }
      setSwitchBool(false);
    }
  }, [previousPath, pathname]);

  const handleSwitchChange = () => {
    setPreviousPath(pathname + search);
    setSwitchBool(!switchBool);
    navigate(previousPath);
  };

  const handleAddClick = () => {
    navigate('/todo');
  };

  return (
    <MainContainer>
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
        <Outlet />
      </Content>
      <AddButton
        onClick={handleAddClick}
        icon={<FontAwesomeIcon icon={faPlus} />}
        type="primary"
        shape="circle"
      />
    </MainContainer>
  );
};

export default Main;
