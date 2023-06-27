import React from 'react';
import { Content, Header } from '../styles/AppStyle';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <>
      <Header>
        <span>Travel Todo</span>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </>
  );
};

export default Main;
