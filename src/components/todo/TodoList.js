import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faListCheck } from '@fortawesome/free-solid-svg-icons';
import CheckList from './CheckList';
import { TodoListLi } from '../../styles/TodoStyle';
import axios from 'axios';

const TodoList = ({ state, idSub, sub, subList, setSubList, disabledPlan }) => {
  // 일정 이름 변경
  const handleChangeSubTitle = e => {
    const newSubList = subList.map(sub => {
      if ((state && sub.idSub ? sub.idSub : sub.id) === idSub) {
        sub.subTitle = e.target.value;
      }
      return sub;
    });
    setSubList(newSubList);
  };

  // 일정 삭제
  const deleteSub = async () => {
    const newSubList = subList.filter(sub => (state && sub.idSub ? sub.idSub : sub.id) !== idSub);
    if (state) {
      try {
        await axios.delete(`/api/todo/sub/${idSub}`);
      } catch (error) {
        console.log(error);
      }
    }
    setSubList(newSubList);
  };

  // 일정 달성 여부 변경
  const handleChangeSubCheck = e => {
    const newSubList = subList.map(sub => {
      if ((state && sub.idSub ? sub.idSub : sub.id) === idSub) {
        sub.finishYn = e.target.checked;
      }
      return sub;
    });
    setSubList(newSubList);
  };

  // 체크리스트 추가
  const handleAddCheckList = () => {
    const newCheckList = {
      id: Date.now(),
      idCheck: 0,
      checkTitle: '',
    };
    const newCheckListData = [...sub.checkList, newCheckList];
    const newSubList = subList.map(sub => {
      if ((state && sub.idSub ? sub.idSub : sub.id) === idSub) {
        sub = { ...sub, checkList: newCheckListData };
      }
      return sub;
    });
    setSubList(newSubList);
  };

  return (
    <>
      <TodoListLi>
        <div>
          <Form.Item
            className="checkbox-wrap"
            name={`visit-complete${idSub}`}
            valuePropName="checked"
            initialValue={sub.finishYn}
          >
            <Checkbox
              disabled={disabledPlan}
              className="checkbox"
              onChange={handleChangeSubCheck}
            />
          </Form.Item>
          <Form.Item
            name={`visit-title${idSub}`}
            className="visitList-input-wrap"
            initialValue={sub.subTitle}
            rules={[
              {
                required: true,
                message: '일정을 입력해주세요.',
              },
            ]}
          >
            <Input
              className="visit-list"
              placeholder="일정을 입력하세요."
              allowClear
              onChange={handleChangeSubTitle}
              disabled={disabledPlan}
            />
          </Form.Item>
          <Button onClick={handleAddCheckList} disabled={disabledPlan}>
            <FontAwesomeIcon icon={faListCheck} className="bt-addcheck" />
          </Button>
          <Button onClick={deleteSub}>
            <FontAwesomeIcon icon={faXmark} className="bt-x" />
          </Button>
        </div>
        <ul>
          {sub.checkList.map(check => {
            let id = state && check.idCheck ? check.idCheck : check.id;
            return (
              <CheckList
                key={id}
                state={state}
                idSub={idSub}
                sub={sub}
                subList={subList}
                setSubList={setSubList}
                idCheck={id}
                check={check}
                disabledPlan={disabledPlan}
              />
            );
          })}
        </ul>
      </TodoListLi>
    </>
  );
};

export default TodoList;
