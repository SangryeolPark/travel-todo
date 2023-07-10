import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, Layout, Switch } from 'antd';

const white = '#fff';
const primary = '#1e88e5';

const mainAni = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MainContainer = styled.div`
  position: relative;
  min-width: 1200px;
  width: 75vw;
  overflow: auto;
  border: 2px solid #1e88e5;
  border-radius: 10px;
  overflow: auto;
  background: #ecf8ff;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.5);
  animation: ${mainAni} 0.5s ease-in-out;
`;

const Header = styled(Layout.Header)`
  width: 100%;
  height: 70px;
  padding: 0 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${primary};
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5);
  > img {
    width: 210px;
  }
`;

const PageSwitch = styled(Switch)`
  background: ${white};
  height: 40px;
  width: 90px;
  &.ant-switch:hover:not(.ant-switch-disabled) {
    background: ${white};
  }
  &.ant-switch-checked {
    background: ${white};
  }
  .ant-switch-handle {
    width: 35px;
    height: 35px;
    top: 2.5px;
    inset-inline-start: 3px;
    &::before {
      border-radius: 35px;
      padding-top: 5px;
      background: ${primary};
      content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="23px" height="23px" fill="white" viewBox="0 0 448 512"><path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"/></svg>');
    }
  }
  &.ant-switch-checked .ant-switch-handle {
    inset-inline-start: calc(100% - 38px);
    &::before {
      content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="white" viewBox="0 0 512 512"><path d="M51.7 295.1l31.7 6.3c7.9 1.6 16-.9 21.7-6.6l15.4-15.4c11.6-11.6 31.1-8.4 38.4 6.2l9.3 18.5c4.8 9.6 14.6 15.7 25.4 15.7c15.2 0 26.1-14.6 21.7-29.2l-6-19.9c-4.6-15.4 6.9-30.9 23-30.9h2.3c13.4 0 25.9-6.7 33.3-17.8l10.7-16.1c5.6-8.5 5.3-19.6-.8-27.7l-16.1-21.5c-10.3-13.7-3.3-33.5 13.4-37.7l17-4.3c7.5-1.9 13.6-7.2 16.5-14.4l16.4-40.9C303.4 52.1 280.2 48 256 48C141.1 48 48 141.1 48 256c0 13.4 1.3 26.5 3.7 39.1zm407.7 4.6c-3-.3-6-.1-9 .8l-15.8 4.4c-6.7 1.9-13.8-.9-17.5-6.7l-2-3.1c-6-9.4-16.4-15.1-27.6-15.1s-21.6 5.7-27.6 15.1l-6.1 9.5c-1.4 2.2-3.4 4.1-5.7 5.3L312 330.1c-18.1 10.1-25.5 32.4-17 51.3l5.5 12.4c8.6 19.2 30.7 28.5 50.5 21.1l2.6-1c10-3.7 21.3-2.2 29.9 4.1l1.5 1.1c37.2-29.5 64.1-71.4 74.4-119.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm144.5 92.1c-2.1 8.6 3.1 17.3 11.6 19.4l32 8c8.6 2.1 17.3-3.1 19.4-11.6s-3.1-17.3-11.6-19.4l-32-8c-8.6-2.1-17.3 3.1-19.4 11.6zm92-20c-2.1 8.6 3.1 17.3 11.6 19.4s17.3-3.1 19.4-11.6l8-32c2.1-8.6-3.1-17.3-11.6-19.4s-17.3 3.1-19.4 11.6l-8 32zM343.2 113.7c-7.9-4-17.5-.7-21.5 7.2l-16 32c-4 7.9-.7 17.5 7.2 21.5s17.5 .7 21.5-7.2l16-32c4-7.9 .7-17.5-7.2-21.5z"/></svg>');
    }
  }
  .ant-switch-inner {
    display: flex;
    align-items: center;
    > span {
      color: rgba(0, 0, 0, 0.2) !important;
      &:first-of-type {
        font-size: 27px !important;
      }
      &:last-of-type {
        font-size: 29px !important;
      }
    }
  }
  &.ant-switch-checked .ant-switch-inner {
    padding-inline-start: 12px;
  }
  .ant-switch-inner-checked svg {
    margin-left: 0px;
  }
  .ant-switch-inner .ant-switch-inner-unchecked {
    margin-top: 0;
    padding-left: 7px;
  }
`;

const Content = styled(Layout.Content)`
  height: 80vh;
  padding: 15px;
  overflow: hidden;
`;

const AddButton = styled(Button)`
  position: absolute;
  right: 30px;
  bottom: 30px;
  width: 60px !important;
  height: 60px;
  background: #ff4d4f;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5);
  font-size: 30px;
  z-index: 9999;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: #ff4d4f !important;
    filter: brightness(1.1);
  }
  &:active {
    filter: brightness(0.9);
  }
`;

export { white, primary, MainContainer, Header, PageSwitch, Content, AddButton };
