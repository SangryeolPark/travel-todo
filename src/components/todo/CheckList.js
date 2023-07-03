import { Checkbox, Form, Input } from 'antd';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { CheckListLi } from '../../styles/TodoStyle';

const CheckList = ({ index, checkList, visitList, data, visitListId, setData }) => {
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
      <CheckListLi>
        <Form.Item name={`${checkList.title}-${index}`} valuePropName="checked">
          <Checkbox className="checkbox" checked={checkList.complete} />
        </Form.Item>
        <Form.Item name={`${checkList.title}-${index}-title`} className="checkListInput">
          <Input placeholder="준비물을 입력해주세요." className="input" value={checkList.title} />
        </Form.Item>
        <button onClick={() => deleteCheckList(checkList.id)}>
          <FontAwesomeIcon icon={faXmark} className="bt-x" />
        </button>
      </CheckListLi>
    </>
  );
};

export default CheckList;
