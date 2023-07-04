import React from 'react';

const CheckList = ({ data }) => {
  return data.map(item => <div key={item.idCheck}>{item.checkList}</div>);
};

export default CheckList;
