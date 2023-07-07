import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { CheckListLi } from '../../styles/TodoStyle';

const CheckList = ({ sub, subList, setSubList, checkList }) => {
  // checklist 삭제
  const deleteCheckList = () => {
    const newCheckList = sub.checkList.filter(item => item.id !== checkList.id);
    const newSubList = subList.map(item => {
      if (item.id === sub.id) {
        item.checkList = newCheckList;
      }
      return item;
    });
    setSubList(newSubList);
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
        <Form.Item className="checkListInput" name={`check-title${checkList.id}`}>
          <Input placeholder="준비물을 입력해주세요." onChange={handleCheckInput} />
        </Form.Item>
        <Button onClick={deleteCheckList}>
          <FontAwesomeIcon icon={faXmark} className="bt-x" />
        </Button>
      </CheckListLi>
    </>
  );
};

export default CheckList;
