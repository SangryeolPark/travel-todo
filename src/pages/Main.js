import React, { useEffect, useState } from 'react';
import { About, AddButton, Content, Header, MainContainer, PageSwitch } from '../styles/AppStyle';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import logoSmall from '../logosmall.png';
import { Button } from 'antd';
import github from '../github.png';
import notion from '../notion.png';
import member1 from '../member1.png';
import member2 from '../member2.png';
import member3 from '../member3.png';
import member4 from '../member4.png';

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

      <About
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={
          <div>
            <span>Team Notion </span>
            <a
              href="https://www.notion.so/devitoolz/Travel-Todo-TT-8f38ae2892434e6d953f8ae4c6589b5c"
              rel="noreferrer"
              target="_blank"
            >
              <img src={notion} alt="노션 바로가기" className="notion" />
            </a>
          </div>
        }
      >
        <div className="wrap">
          <h2 className="title">About</h2>
          <h3>나의 여행 기록을 관리할 수는 없을까?</h3>
          <p className="about-text">
            <span>
              여행 일정을 <b>계획</b>하고,
            </span>
            <br />
            <span>
              일정에 필요한 <b>준비물을 체크</b>하고,
            </span>
            <br />
            <span>
              여행에 대한 <b>리뷰를 작성</b>하는 것까지!
            </span>
            <br />
            <span>여행 전부터 여행 후까지 나만의 여행 일지를 관리할 수 있는 서비스입니다.</span>
          </p>
          <span className="member-title">프로젝트를 함께 만든 사람들</span>
          <div className="member-wrap">
            <div className="front-wrap">
              <h4>Front-end</h4>
              <div>
                <div className="member-detail-wrap">
                  <img src={member1} alt="박상렬 이미지" />
                  <div>
                    <span className="member-name">박상렬</span>
                    <div className="icons">
                      <a href="https://github.com/devitoolz" rel="noreferrer" target="_blank">
                        <img src={github} alt="깃허브 바로가기" className="github" />
                      </a>
                    </div>
                  </div>
                </div>
                <span className="roles">
                  기본 UI / 지도 페이지 /<br />
                  여행 일정 등록·수정 페이지 / 노션 관리
                </span>
              </div>
              <div>
                <div className="member-detail-wrap">
                  <img src={member2} alt="박주희 이미지" />
                  <div>
                    <span className="member-name">박주희</span>
                    <div className="icons">
                      <a href="https://github.com/heeheepark" rel="noreferrer" target="_blank">
                        <img src={github} alt="깃허브 바로가기" className="github" />
                      </a>
                    </div>
                  </div>
                </div>
                <span className="roles">
                  인트로 페이지 / 캘린더 페이지 /<br />
                  여행 일정 등록·수정 페이지
                </span>
              </div>
            </div>
            <div className="back-wrap">
              <h4>Back-end</h4>
              <div>
                <div className="member-detail-wrap">
                  <img src={member3} alt="권민구 이미지" />
                  <div>
                    <span className="member-name">권민구</span>
                    <div className="icons">
                      <a href="https://github.com/Shin-HyoungJoo/" rel="noreferrer" target="_blank">
                        <img src={github} alt="깃허브 바로가기" className="github" />
                      </a>
                    </div>
                  </div>
                </div>
                <span className="roles">todo-페이지 / 캘린더 페이지</span>
              </div>
              <div>
                <div className="member-detail-wrap">
                  <img src={member4} alt="신형주 이미지" />
                  <div>
                    <span className="member-name">신형주</span>
                    <div className="icons">
                      <a href="https://github.com/KwonMingu" rel="noreferrer" target="_blank">
                        <img src={github} alt="깃허브 바로가기" className="github" />
                      </a>
                    </div>
                  </div>
                </div>
                <span className="roles">맵 페이지 / todo-페이지</span>
              </div>
            </div>
          </div>
        </div>
      </About>
    </>
  );
};

export default Main;
