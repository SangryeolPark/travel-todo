import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(10%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const CalendarDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 0 15px;
  .wrap {
    width: 75%;
    height: 100%;
    background: #fff;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.5);
    max-width: 1200px;
    animation: ${fromRight} 0.5s ease-in-out;
    transition: all 1.5s;
  }
`;

export const DrawerDiv = styled.div`
  .ant-drawer-inline {
    position: initial;
    height: 100%;
    width: 18vw;
    .ant-drawer-mask {
      position: initial !important;
      display: none;
    }
    .ant-drawer-content-wrapper {
      top: 85px;
      right: 30px;
      width: 100% !important;
      height: 100%;
      border-radius: 10px;
      box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.5);
      position: initial;
      .ant-drawer-content {
        border-radius: 10px;
        .ant-drawer-body {
          padding: 30px 15px !important;
        }
      }
    }
  }
`;

export const DetailScheduleDiv = styled.div`
  padding-top: 60px;
  position: relative;
  .modal {
    position: absolute;
    top: 50%;
    width: 520px;
    transform: translate(-50%, -50%);
    left: 50%;
  }
  .btns {
    color: #494949;
    position: absolute;
    right: 0px;
    top: -10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .bt-pencil {
      color: #494949;
      font-size: 20px;
      margin-right: 15px;
      cursor: pointer;
      :hover {
        color: #1e88e5;
      }
    }
    .bt-trash {
      font-size: 21px;
      :hover {
        color: #1e88e5;
      }
    }
  }
  h2 {
    color: #1e88e5;
    font-size: 20px;
    margin-bottom: 6px;
  }
  .travel-schedule {
    margin-bottom: 50px;
    h2 {
      color: #1e88e5;
      font-size: 20px;
      margin-bottom: 6px;
    }
    h3 {
      font-size: 20px;
      margin-bottom: 0;
      color: #494949;
    }
    span {
      font-size: 16px;
    }
  }
  .travel-plan {
    margin-bottom: 50px;
    .detail-plan {
      border: 1px solid rgb(217, 217, 217);
      border-radius: 6px;
      margin-bottom: 10px;
      overflow: hidden;
      .visit-list-wrap {
        :not(:last-of-type) {
          border-bottom: 1px solid rgb(217, 217, 217);
        }
        .visit-list {
          display: flex;
          align-items: center;
          background: rgb(250, 250, 250);
          padding-left: 10px;
          .checkbox {
            color: #494949;
            font-size: 15px;
            background: none;
            cursor: default;
          }
          .input {
            border: none;
            background: none;
            color: #494949;
            font-size: 16px;
            font-weight: 800;
            cursor: default;
            height: 42px;
          }
        }
        .checkList-wrap {
          padding: 6px 0;
          border-top: 1px solid rgb(217, 217, 217);
          .check-list {
            display: flex;
            align-items: center;
            margin-left: 20px;
            div {
              display: flex;
              align-items: center;
              height: 27px;
            }
            .checkbox {
              color: #494949;
              background: none;
              cursor: default;
            }
            .input {
              border: none;
              background: none;
              color: #494949;
              font-weight: 400;
              font-size: 14px;
              line-height: 0.8;
              cursor: default;
            }
          }
        }
      }
    }
  }
  .travel-review {
    .text-area {
      resize: none;
      background: none;
      color: #494949;
      cursor: default;
    }
  }
`;
