import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fromBottom = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

export const TodoDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.5);
  padding: 70px 50px;
  animation: ${fromBottom} 0.5s ease-in-out;
  h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #1e88e5;
  }
  .travel-schedule-wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    .input-travel {
      display: flex;
      .cascader {
        width: 200px;
        margin-right: 10px;
      }
      .range-picker {
        margin-right: 10px;
      }
    }
    .add-travel-btn {
      button:first-of-type {
        margin-right: 10px;
        background: #1e88e5;
      }
    }
  }
  .detail-plan-wrap {
    display: flex;
    .travel-plan-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      h2 {
        margin: 0;
      }
    }
    .travel-plan {
      display: flex;
      justify-content: start;
      width: 100%;
      height: 100%;
      /* padding-right: 25px; */
      position: relative;
      > div {
        text-align: start;
        width: 100%;
        ul.todoList-wrap {
          width: 100%;
          height: 35vh;
          overflow: auto;
        }
        button {
          border: none;
          background: none;
          margin-right: 0px;
          padding: 3px 9px;
          cursor: pointer;
          box-shadow: none;
        }
      }
    }
    .travel-review {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: start;
      padding-left: 50px;
      ::before {
        content: '';
        position: absolute;
        top: 0;
        left: 25px;
        height: 100%;
        width: 1px;
        background: #ccc;
      }
    }
    .ant-form-item {
      margin-bottom: 0;
    }
  }
`;

export const TodoListLi = styled.li`
  margin-bottom: 15px;
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .checkbox-wrap {
      margin-right: 10px;
      .checkbox {
        cursor: default;
      }
    }
    .visitList-input-wrap {
      width: 100%;
      margin-right: 10px;
      .visit-list {
        cursor: default;
        > input {
          cursor: default;
        }
      }
    }
    button:first-of-type {
      .bt-addcheck {
        font-size: 15px;
        color: #575757;
      }
    }
    button:last-child {
      border: none;
      background: none;
      cursor: pointer;
      .bt-x {
        font-size: 18px;
        color: #575757;
      }
    }
  }
`;

export const CheckListLi = styled.li`
  display: flex;
  margin: 10px 0 0 20px;
  .checkbox {
    margin-right: 10px;
    cursor: default;
  }
  .checkList-input-wrap {
    width: 100%;
    margin-right: 10px;
    .input {
      margin-right: 10px;
      cursor: default;
    }
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    .bt-x {
      font-size: 18px;
      color: #575757;
    }
  }
`;

export const TravelReviewDiv = styled.div`
  .review-wrap {
    height: 100%;
    resize: none;
    .textarea {
      height: 35vh;
      resize: none;
    }
  }
`;
