import React, { useState } from 'react';
import TodoCheckList from './TodoCheckList';

const TodoListItem = ({ item, data, setData }) => {
  const checkList = item.checkList;

  const addCheckList = _id => {
    const newCheckList = {
      id: Date.now(),
      title: '',
      complete: false,
    };
    const checkList = [...item.checkList, newCheckList];
    const newVisitList = { ...item, checkList: checkList };
    const newVisitListData = data.visitList.map(item => {
      if (item.id === newVisitList.id) {
        item = newVisitList;
      }
      return item;
    });
    const newData = { ...data, visitList: newVisitListData };
    setData(newData);
  };

  const [inputValue, setInputValue] = useState(item.title);
  const handleInput = e => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <input type="checkbox" defaultChecked={item.complete} />
      <input
        type="text"
        value={inputValue}
        onChange={handleInput}
        style={{ border: 'none', background: 'transparent', fontSize: 16, fontWeight: 600 }}
      />
      <button onClick={() => addCheckList(item.id)}>준비추가</button>
      <button>일정삭제</button>
      <div style={{ marginLeft: 15 }}>
        {checkList &&
          checkList.map((item, index) => <TodoCheckList key={index} checkList={item} />)}
      </div>
    </div>
  );
};

export default TodoListItem;
