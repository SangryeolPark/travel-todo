import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ data, setData }) => {
  const visitList = data.visitList;
  return (
    <div>
      {visitList.map((item, index) => (
        <TodoListItem key={index} item={item} data={data} setData={setData} />
      ))}
    </div>
  );
};

export default TodoList;
