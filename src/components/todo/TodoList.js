import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faListCheck } from '@fortawesome/free-solid-svg-icons';
import CheckList from './CheckList';
import { TodoListLi } from '../../styles/TodoStyle';

const TodoList = ({ id, sub, subList, setSubList }) => {
  console.log(id);
  console.log(sub);
  console.log(subList);
  const [subTitle, setSubTitle] = useState(sub.subTitle);
  const [checkList, setCheckList] = useState(sub.checkList);

  // 일정 이름 변경
  const handleChangeSubTitle = e => {
    setSubTitle(e.target.value);
    const newSubList = subList.map(item => {
      if (item.id === sub.id) {
        sub.subTitle = e.target.value;
      }
      return item;
    });
    setSubList(newSubList);
  };

  //일정 삭제
  const deleteSub = () => {
    const newSubList = subList.filter(item => item.id !== sub.id);
    setSubList(newSubList);
  };

  // 체크리스트 추가
  const handleAddCheckList = subId => {
    const newCheckList = {
      id: Date.now(),
      checkTitle: '',
    };
    const newCheckListData = [...sub.checkList, newCheckList];
    const newSubList = subList.map(sub => {
      if (sub.id === subId) {
        const item = { ...sub, checkList: newCheckListData };
        return item;
      }
    });
    setSubList(newSubList);
  };

  return (
    <>
      <TodoListLi>
        <div>
          <Form.Item className="checkbox" name={`visit-complete${sub.id}`} valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item
            name={`visit-title${sub.id}`}
            className="visitList-input"
            rules={[
              {
                required: true,
                message: '일정을 입력해주세요.',
              },
            ]}
          >
            <Input
              placeholder="일정을 입력하세요."
              value={subTitle}
              allowClear
              onChange={handleChangeSubTitle}
            />
          </Form.Item>
          <Button onClick={() => handleAddCheckList(sub.id)}>
            <FontAwesomeIcon icon={faListCheck} className="bt-addcheck" />
          </Button>
          <Button onClick={deleteSub}>
            <FontAwesomeIcon icon={faXmark} className="bt-x" />
          </Button>
        </div>
        <ul>
          {sub.checkList.map(checkList => {
            return (
              <CheckList
                key={checkList.id}
                sub={sub}
                subList={subList}
                setSubList={setSubList}
                checkList={checkList}
                setCheckList={setCheckList}
              />
            );
          })}
        </ul>
      </TodoListLi>
    </>
  );
};

export default TodoList;
