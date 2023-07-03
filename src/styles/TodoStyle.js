import styled from '@emotion/styled';

export const TodoDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5);
  padding: 70px 50px;
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
    .travel-plan {
      display: flex;
      justify-content: start;
      width: 100%;
      height: 100%;
      padding-right: 25px;
      border-right: 1px solid #ccc;
      position: relative;
      > div {
        text-align: start;
        width: 100%;
        ul.todoList-wrap {
          width: 100%;
          height: 35vh;
          overflow: auto;
          .add-plan-btn {
            position: absolute;
            right: 0px;
            top: 3px;
          }
        }
        button {
          border: none;
          background: none;
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }
    .travel-review {
      width: 100%;
      height: 100%;
      text-align: start;
      padding-left: 25px;
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
    .checkbox {
      margin-right: 10px;
    }
    .visitList-input {
      width: 100%;
      margin-right: 10px;
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
  }
  .checkListInput {
    width: 100%;
    margin-right: 10px;
    .input {
      margin-right: 10px;
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
