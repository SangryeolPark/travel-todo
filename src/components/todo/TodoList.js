import { Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faListCheck } from '@fortawesome/free-solid-svg-icons';
import CheckList from './CheckList';
import { TodoListLi } from '../../styles/TodoStyle';

const TodoList = ({ index, visitList, data, setData }) => {
  const [visitValue, setVisitValue] = useState(visitList.title);
  // 체크리스트 추가
  const handleAddCheckList = _id => {
    const newCheckList = {
      id: Date.now(),
      title: '',
      complete: false,
    };
    const newCheckListData = [...visitList.checkList, newCheckList];
    const newVisitList = data.visitList.map(item => {
      if (item.id === _id) {
        item = { ...item, checkList: newCheckListData };
      }
      return item;
    });
    const newData = { ...data, visitList: newVisitList };
    setData(newData);
  };

  // 일정 삭제
  const deleteVisitList = _id => {
    const newVisitList = data.visitList.filter(item => item.id !== _id);
    console.log(newVisitList);
    setVisitValue(newVisitList.title);
    const newData = { ...data, visitList: newVisitList };
    setData(newData);
  };

  return (
    <>
      <TodoListLi>
        <div>
          <Form.Item className="checkbox" name={`visit-complete${index}`} valuePropName="checked">
            <Checkbox defaultChecked={visitList.complete} />
          </Form.Item>
          <Form.Item name={`visit-title${index}`} className="visitList-input">
            <Input placeholder="일정을 입력하세요." value={visitValue} />
          </Form.Item>
          <button onClick={() => handleAddCheckList(visitList.id)}>
            <FontAwesomeIcon icon={faListCheck} className="bt-addcheck" />
          </button>
          <button onClick={() => deleteVisitList(visitList.id)}>
            <FontAwesomeIcon icon={faXmark} className="bt-x" />
          </button>
        </div>
        <ul>
          {visitList.checkList.map((item, index) => {
            return (
              <CheckList
                key={index}
                index={index}
                checkList={item}
                visitList={visitList}
                data={data}
                setData={setData}
                visitListId={item.id}
              />
            );
          })}
        </ul>
      </TodoListLi>
    </>
  );
};

export default TodoList;
