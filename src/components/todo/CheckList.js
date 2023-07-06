import { Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { CheckListLi } from '../../styles/TodoStyle';

const CheckList = ({ sub, subList, setSubList, checkList, setCheckList }) => {
  const [checkTitle, setCheckTitle] = useState(checkList.checkTitle);
  console.log(subList);
  console.log(checkList);
  console.log(checkTitle);
  // checklist 삭제
  const deleteCheckList = () => {
    const newCheckList = sub.checkList.filter(item => item.id !== checkList.id);
    console.log(newCheckList);
    const newSubList = subList.map(item => {
      if (item.id === sub.id) {
        item.checkList = newCheckList;
      }
      return item;
    });
    console.log(newSubList);
    setSubList(newSubList);

    //   const newCheckList = visitList.checkList.filter(item => item.id !== _id);
    //   const newCheckListData = { ...visitList, checkList: newCheckList };
    //   const newVisitList = data.visitList.map(item => {
    //     if (item.id === newCheckListData.id) {
    //       item = newCheckListData;
    //     }
    //     return item;
    //   });
    //   const newData = { ...data, visitList: newVisitList };
    //   setData(newData);
  };

  // 체크리스트 내용 변경
  const handleCheckInput = e => {
    const newCheckList = sub.checkList.map(item => {
      if (item.id === checkList.id) {
        item.checkTitle = e.target.value;
      }
      return item;
    });
    const newSubList = subList.map(item => {
      if (item.id === sub.id) {
        item.checkList = newCheckList;
      }
      return item;
    });
    setSubList(newSubList);
  };
  return (
    <>
      <CheckListLi>
        <Form.Item valuePropName="checked" name={`check-complete${checkList.id}`}>
          <Checkbox className="checkbox" />
        </Form.Item>
        <Form.Item className="checkListInput" name={`check-input${checkList.id}`}>
          <Input
            placeholder="준비물을 입력해주세요."
            onChange={handleCheckInput}
            value={checkTitle}
          />
        </Form.Item>
        <button onClick={deleteCheckList}>
          <FontAwesomeIcon icon={faXmark} className="bt-x" />
        </button>
      </CheckListLi>
    </>
  );
};

export default CheckList;
