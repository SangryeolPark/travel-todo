import { Checkbox, Form, Input } from 'antd';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faListCheck } from '@fortawesome/free-solid-svg-icons';
import CheckList from './CheckList';

const TodoList = ({ index, visitList, data, setData }) => {
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
    const newData = { ...data, visitList: newVisitList };
    setData(newData);
  };

  return (
    <>
      <li style={{ marginBottom: 15 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Form.Item name={`visit-complete${index}`} valuePropName="checked">
            <Checkbox style={{ marginRight: 10 }} defaultChecked={visitList.complete} />
          </Form.Item>
          <Form.Item name={`visit-title${index}`}>
            <Input
              placeholder="일정을 입력하세요."
              style={{ marginRight: 10 }}
              defaultValue={visitList.title}
            />
          </Form.Item>
          <button
            style={{ border: 'none', background: 'none', marginRight: 10, cursor: 'pointer' }}
            onClick={() => handleAddCheckList(visitList.id)}
          >
            <FontAwesomeIcon icon={faListCheck} style={{ fontSize: 15, color: '#575757' }} />
          </button>
          <button
            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
            onClick={() => deleteVisitList(visitList.id)}
          >
            <FontAwesomeIcon icon={faXmark} style={{ fontSize: 18, color: '#575757' }} />
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
      </li>
    </>
  );
};

export default TodoList;
