import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faListCheck } from '@fortawesome/free-solid-svg-icons';
import CheckList from './CheckList';
import { TodoListLi } from '../../styles/TodoStyle';

const TodoList = ({ state, idSub, sub, subList, setSubList }) => {
  // 일정 이름 변경
  const handleChangeSubTitle = e => {
    const newSubList = subList.map(sub => {
      if (state && sub.idSub ? sub.idSub : sub.id === idSub) {
        sub.subTitle = e.target.value;
      }
      return sub;
    });
    setSubList(newSubList);
  };

  //일정 삭제
  const deleteSub = () => {
    const newSubList = subList.filter(sub => (state && sub.idSub ? sub.idSub : sub.id) !== idSub);
    setSubList(newSubList);
  };

  // 체크리스트 추가
  const handleAddCheckList = () => {
    const newCheckList = {
      id: Date.now(),
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
          <Form.Item className="checkbox" name={`visit-complete${idSub}`} valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item
            name={`visit-title${idSub}`}
            className="visitList-input"
            initialValue={sub.subTitle}
            rules={[
              {
                required: true,
                message: '일정을 입력해주세요.',
              },
            ]}
          >
            <Input placeholder="일정을 입력하세요." allowClear onChange={handleChangeSubTitle} />
          </Form.Item>
          <Button onClick={handleAddCheckList}>
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
              />
            );
          })}
        </ul>
      </TodoListLi>
    </>
  );
};

export default TodoList;
