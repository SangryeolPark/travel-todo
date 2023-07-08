import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { CheckListLi } from '../../styles/TodoStyle';

const CheckList = ({ state, idSub, sub, subList, setSubList, idCheck, check, disabledPlan }) => {
  // checklist 삭제
  const deleteCheckList = () => {
    const newCheckList = sub.checkList.filter(
      check => (state && check.idCheck ? check.idCheck : check.id) !== idCheck
    );
    const newSubList = subList.map(sub => {
      if ((state && sub.idSub ? sub.idSub : sub.id) === idSub) {
        sub.checkList = newCheckList;
      }
      return sub;
    });
    setSubList(newSubList);
  };

  // 체크리스트 내용 변경
  const handleCheckInput = e => {
    const newCheckList = sub.checkList.map(check => {
      if ((state && check.idCheck ? check.idCheck : check.id) === idCheck) {
        check.checkTitle = e.target.value;
      }
      return check;
    });
    const newSubList = subList.map(sub => {
      if ((state && sub.idSub ? sub.idSub : sub.id) === idSub) {
        sub.checkList = newCheckList;
      }
      return sub;
    });
    setSubList(newSubList);
  };
  return (
    <>
      <CheckListLi>
        <Form.Item valuePropName="checked" name={`check-complete${idCheck}`}>
          <Checkbox className="checkbox" disabled={disabledPlan} />
        </Form.Item>
        <Form.Item
          className="checkList-input-wrap"
          name={`check-title${idCheck}`}
          initialValue={check.checkTitle}
        >
          <Input
            className="input"
            placeholder="준비물을 입력해주세요."
            onChange={handleCheckInput}
            disabled={disabledPlan}
          />
        </Form.Item>
        <Button onClick={deleteCheckList}>
          <FontAwesomeIcon icon={faXmark} className="bt-x" />
        </Button>
      </CheckListLi>
    </>
  );
};

export default CheckList;
