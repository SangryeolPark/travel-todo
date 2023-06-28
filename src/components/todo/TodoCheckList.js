import React, { useState } from 'react';

const TodoCheckList = ({ checkList }) => {
  // const [inputCheckList, setCheckList] = useState(checkList.title);
  // const handleInput = e => {
  //   setCheckList(e.target.value);
  // };
  return (
    <div>
      <input type="checkbox" defaultChecked={checkList.complete} />
      <input
        type="text"
        value={checkList.title}
        // onChange={handleInput}
        style={{ border: 'none', background: 'transparent', fontSize: 14 }}
      />
    </div>
  );
};

export default TodoCheckList;
