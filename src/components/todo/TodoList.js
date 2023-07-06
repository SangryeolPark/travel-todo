import { Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faListCheck } from '@fortawesome/free-solid-svg-icons';
import CheckList from './CheckList';
import { TodoListLi } from '../../styles/TodoStyle';

const TodoList = ({ sub, subList, setSubList }) => {
  const [subTitle, setSubTitle] = useState(sub.subTitle);

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
  // const handleAddCheckList = _id => {
  //   const newCheckList = {
  //     id: Date.now(),
  //     checkTitle: '',
  //   };
  //   const newCheckListData = [...sub.checkList, newCheckList];
  //   const newSubList = subList.map(item => {
  //     if (item.id === _id) {
  //       item = { ...item, checkList: newCheckListData };
  //     }
  //     return item;
  //   });
  //   setSubList(newSubList);
  // };

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
          {/* <button onClick={() => handleAddCheckList(visitList.id)}>
            <FontAwesomeIcon icon={faListCheck} className="bt-addcheck" />
          </button> */}
          <button onClick={deleteSub}>
            <FontAwesomeIcon icon={faXmark} className="bt-x" />
          </button>
        </div>
        <ul>
          {/* {visitList.checkList.map((item, index) => {
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
          })} */}
        </ul>
      </TodoListLi>
    </>
  );
};

export default TodoList;
