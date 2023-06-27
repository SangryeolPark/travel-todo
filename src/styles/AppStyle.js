import styled from '@emotion/styled';
import { Layout } from 'antd';

const Header = styled(Layout.Header)`
  position: fixed;
  width: 100%;
  height: 70px;
  z-index: 9999;
  padding: 0;
  display: flex;
  align-items: center;
  background: #1e88e5;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5);
  > span {
    font-size: 30px;
    font-weight: bold;
    color: #fff;
    margin-left: 20px;
  }
`;

const Content = styled(Layout.Content)`
  height: calc(100vh - 70px);
  margin-top: 70px;
  padding: 15px;
`;

export { Header, Content };
