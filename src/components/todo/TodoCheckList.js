import React, { useState } from 'react';

const TodoCheckList = ({ checkList, data, setData, visitList }) => {
  //체크리스트 삭제
  const deleteCheckList = _id => {
    const newCheckList = visitList.checkList.filter(item => item.id !== _id);
    const newVisitList = { ...visitList, checkList: newCheckList };
    const newVisitListData = data.visitList.map(item => {
      if (item.id === visitList.id) {
        item = newVisitList;
      }
      return item;
    });
    const newData = { ...data, visitList: newVisitListData };
    setData(newData);
  };

  return (
    <div>
      <input type="checkbox" defaultChecked={checkList.complete} />
      <input
        type="text"
        defaultValue={checkList.title}
        // onChange={handleInput}
        style={{ border: 'none', background: 'transparent', fontSize: 14 }}
      />
      <button onClick={() => deleteCheckList(checkList.id)}>준비 삭제</button>
    </div>
  );
};

export default TodoCheckList;
