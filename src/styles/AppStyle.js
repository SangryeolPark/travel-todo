import styled from '@emotion/styled';
import { Layout, Switch } from 'antd';

const Header = styled(Layout.Header)`
  width: 100%;
  height: 70px;
  padding: 0 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e88e5;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5);
  > span {
    font-size: 30px;
    font-weight: bold;
    color: #fff;
  }
`;

const bgColor = '#fff';

const PageSwitch = styled(Switch)`
  background: ${bgColor};
  height: 40px;
  width: 90px;
  &:where(.css-dev-only-do-not-override-1wazalj).ant-switch.ant-switch-checked {
    background: ${bgColor};
  }
  &:where(.css-dev-only-do-not-override-1wazalj).ant-switch:hover:not(.ant-switch-disabled) {
    background: ${bgColor};
  }
  &:where(.css-dev-only-do-not-override-1wazalj).ant-switch.ant-switch-checked .ant-switch-handle {
    inset-inline-start: calc(100% - 38px);
  }
  .ant-switch-handle {
    width: 34px;
    height: 34px;
    top: 3px;
    inset-inline-start: 4px;
    &::before {
      border-radius: 34px;
      background: #2196f3;
    }
  }
  .ant-switch-inner {
    display: flex;
    align-items: center;
    > span {
      color: #1e88e5 !important;
      &:first-of-type {
        font-size: 30px !important;
      }
      &:last-of-type {
        font-size: 28px !important;
      }
    }
  }
  .ant-switch-inner-checked svg {
    margin-left: 0px;
  }
  &:where(.css-dev-only-do-not-override-1wazalj).ant-switch.ant-switch-checked .ant-switch-inner {
    padding-inline-start: 7px;
  }
  &:where(.css-dev-only-do-not-override-1wazalj).ant-switch
    .ant-switch-inner
    .ant-switch-inner-unchecked {
    margin-top: 0;
  }
`;

const Content = styled(Layout.Content)`
  height: calc(100vh - 70px);
  padding: 15px;
`;

export { Header, PageSwitch, Content };
