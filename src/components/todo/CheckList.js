import { Checkbox, Form, Input } from 'antd';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const CheckList = ({ index, checkList, visitList, data, visitListId, setData }) => {
  console.log(checkList.title);
  // checklist 삭제
  const deleteCheckList = _id => {
    const newCheckList = visitList.checkList.filter(item => item.id !== _id);
    const newCheckListData = { ...visitList, checkList: newCheckList };
    const newVisitList = data.visitList.map(item => {
      if (item.id === newCheckListData.id) {
        item = newCheckListData;
      }
      return item;
    });
    const newData = { ...data, visitList: newVisitList };
    setData(newData);
  };

  return (
    <>
      <li style={{ display: 'flex', margin: '10px 0 0 20px' }}>
        <Form.Item name={`${checkList.title}-${index}`} valuePropName="checked">
          <Checkbox style={{ marginRight: 10 }} checked={checkList.complete} />
        </Form.Item>
        <Form.Item name={`${checkList.title}-${index}-title`} className="checkListInput">
          <Input
            placeholder="준비물을 입력해주세요."
            style={{ marginRight: 10 }}
            defaultValue={checkList.title}
          />
        </Form.Item>
        <button
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          onClick={() => deleteCheckList(checkList.id)}
        >
          <FontAwesomeIcon icon={faXmark} style={{ fontSize: 18, color: '#575757' }} />
        </button>
      </li>
    </>
  );
};

export default CheckList;
