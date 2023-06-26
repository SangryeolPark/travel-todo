import React from 'react';

const TodoInput = () => {
  const handleInput = () => {
    console.log('안녕');
    return (
      <>
        <input type="checkbox" />
        <input type="text" />
      </>
    );
  };
  return (
    <div>
      <button onClick={handleInput}>+ 할일추가</button>
    </div>
  );
};

export default TodoInput;
