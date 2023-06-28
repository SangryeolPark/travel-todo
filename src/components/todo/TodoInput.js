import React from 'react';

const TodoInput = ({ data, setData }) => {
  const handleInput = () => {
    const newVisitList = {
      id: Date.now(),
      title: '',
      complete: false,
      checkList: [],
    };
    const visitList = [...data.visitList, newVisitList];
    const newTodo = { ...data, visitList: visitList };
    setData(newTodo);
  };
  return (
    <div>
      <button onClick={handleInput}>+ 할일추가</button>
    </div>
  );
};

export default TodoInput;
