import React, { useState } from 'react';
import TodoCheckList from './TodoCheckList';

const TodoListItem = ({ item, data, setData }) => {
  console.log(item);
  const checkList = item.checkList;

  // checkList 추가
  const addCheckList = _id => {
    const newCheckList = {
      id: Date.now(),
      title: '',
      complete: false,
    };
    const checkList = [...item.checkList, newCheckList];
    const visitList = { ...item, checkList: checkList };
    const newVisitListData = data.visitList.map(item => {
      if (item.id === visitList.id) {
        item = visitList;
      }
      return item;
    });
    const newData = { ...data, visitList: newVisitListData };
    setData(newData);
  };

  // Todo 삭제
  const deleteTodo = _id => {
    const newVisitListData = data.visitList.filter(item => item.id !== _id);
    console.log(newVisitListData);
    const newData = { ...data, visitList: newVisitListData };
    console.log(newData);
    setData(newData);
  };

  // const [inputValue, setInputValue] = useState(item.title);
  // const handleInput = e => {
  //   setInputValue(e.target.value);
  // };
  return (
    <div>
      <input type="checkbox" defaultChecked={item.complete} />
      <input
        type="text"
        value={item.title}
        // onChange={handleInput}
        style={{ border: 'none', background: 'transparent', fontSize: 16, fontWeight: 600 }}
      />
      <button onClick={() => addCheckList(item.id)}>준비추가</button>
      <button onClick={() => deleteTodo(item.id)}>일정삭제</button>
      <div style={{ marginLeft: 15 }}>
        {checkList &&
          checkList.map((item, index) => <TodoCheckList key={index} checkList={item} />)}
      </div>
    </div>
  );
};

export default TodoListItem;
