import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const title = keyframes`
from {
    opacity: 0;
    transform: translateY(10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }`;

const button = keyframes`
from {
    opacity: 0;
    transform: translateY(20%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }`;

const BtnSize = keyframes`
  0% {
    transform: scale(1.03);
    box-shadow: 0px 0px 13px 3px rgba(255, 67, 139, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0px 0px 13px 3px rgba(255, 67, 139, 0.6);
  }

  100% {
    transform: scale(1.03);
    box-shadow: 0px 0px 13px 3px rgba(255, 67, 139, 0.3);
  }
`;

const logoImg = keyframes`
from {
    opacity: 0;
    transform: translateX(10%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }`;

export const HomeDiv = styled.div`
  width: 1100px;
  height: 800px;
  padding: 110px 90px 130px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: start;
  position: relative;
  background: #ecf8ff;
  border-radius: 10px;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.5);
  .title {
    position: absolute;
    top: 15%;
    width: 36vw;
    animation: ${title} 0.8s ease-in-out;
  }
  .bottom {
    padding-top: 33%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > a {
      animation: ${button} 0.8s ease-in-out;
    }
    .ant-btn {
      width: 12vw;
      height: 60px;
      font-size: 24px;
      line-height: 30px;
      border-radius: 10px;
      background: rgb(255, 67, 139);
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
      animation: ${BtnSize} 0.8s ease-out infinite;
      margin-left: 30px;
      :hover {
        background: rgb(204, 0, 78);
      }
      > span {
        font-size: 20px;
      }
    }
    .logoImg {
      width: 14vw;
      animation: ${logoImg} 0.8s ease-in-out;
    }
  }
`;
