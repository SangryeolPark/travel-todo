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
    /* margin: 0 auto; */
    animation: ${fromRight} 0.5s ease-in-out;
    transition: all 1.5s;
  }
`;

export const DetailScheduleDiv = styled.div`
  padding-top: 60px;
  position: relative;
  .btns {
    color: #575757;
    position: absolute;
    right: -5px;
    top: -10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .bt-pencil {
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
        fill: #1e88e5;
      }
    }
  }
  h2 {
    color: #1e88e5;
    font-size: 18px;
    margin-bottom: 6px;
  }
  .travel-schedule {
    margin-bottom: 35px;
    h2 {
      color: #1e88e5;
      font-size: 18px;
      margin-bottom: 6px;
    }
    h3 {
      font-size: 24px;
      margin-bottom: 0;
    }
    span {
      font-size: 20px;
    }
  }
  .travel-plan {
    margin-bottom: 35px;
    .detail-plan {
      margin-bottom: 10px;
      .visit-list {
        display: flex;
        align-items: center;
        .checkbox {
          background: none;
          cursor: default;
        }
        .input {
          border: none;
          background: none;
          color: #000;
          font-size: 20px;
          font-weight: 600;
          cursor: default;
        }
      }
      .check-list {
        margin-left: 10px;
        div {
          display: flex;
          align-items: center;
          height: 27px;
        }
        .checkbox {
          background: none;
          cursor: default;
        }
        .input {
          border: none;
          background: none;
          color: #000;
          font-size: 17px;
          cursor: default;
        }
      }
    }
  }
  .travel-review {
    .text-area {
      resize: none;
      background: none;
      color: #000;
      cursor: default;
    }
  }
`;
