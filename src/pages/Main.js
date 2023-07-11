import React, { useEffect, useState } from 'react';
import { AddButton, Content, Header, MainContainer, PageSwitch } from '../styles/AppStyle';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import logoSmall from '../logosmall.png';
import { Button, Modal } from 'antd';

const Main = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [switchBool, setSwitchBool] = useState(pathname.includes('map'));
  const [previousPath, setPreviousPath] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <MainContainer>
        <Header>
          <img src={logoSmall} alt="" className="logo-small" />
          <Button type="primary" onClick={showModal}>
            Open Modal
          </Button>
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

      <Modal title="About" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h2>나의 여행 기록을 관리할 수는 없을까?</h2>
        <p>
          여행 일정을 계획하고, <br />
          일정에 필요한 준비물을 체크하고, <br />
          여행에 대한 리뷰를 작성하는 것 까지!
        </p>
        <p>여행 전부터 여행 후까지 나만의 여행 일지를 관리할 수 있는 서비스입니다.</p>
        <span>프로젝트를 함께 만든 사람들</span>
        <div>
          <h3>Front-end</h3>
          <div>
            <span>박상렬</span>
            <span>기본 UI / 지도 페이지 / 여행 일정 등록·수정 페이지 / 노션 관리</span>
            <a>깃허브</a>
            <a>노션</a>
            <a>이메일</a>
          </div>
          <div>
            <span>박주희</span>
            <span>인트로 페이지 / 캘린더 페이지 / 여행 일정 등록·수정 페이지</span>
            <a>깃허브</a>
            <a>노션</a>
            <a>이메일</a>
          </div>
        </div>
        <div>
          <h3>Back-end</h3>
          <div>
            <span>권민구</span>
            <span>맵 페이지 / 캘린더 페이지</span>
            <a>깃허브</a>
            <a>이메일</a>
          </div>
          <div>
            <span>신형주</span>
            <span>todo 페이지 / slack 관리</span>
            <a>깃허브</a>
            <a>이메일</a>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Main;
