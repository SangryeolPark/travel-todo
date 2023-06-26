import React, { useState } from 'react';

const TodoItem = ({ data }) => {
  const [inputValue, setInputValue] = useState(data[0].visitList[0].title);
  const handleInput = e => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <h2>TodoItem</h2>
      <input type="checkbox" defaultChecked={data[0].visitList[0].complete} />
      <input type="text" value={inputValue} onChange={handleInput} />
    </div>
  );
};

export default TodoItem;
