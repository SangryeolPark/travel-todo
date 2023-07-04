import React from 'react';

const CheckList = ({ data }) => {
  return data.length !== 0 ? (
    data.map(item => <div key={item.idCheck}>{item.checkList}</div>)
  ) : (
    <div>등록된 체크 리스트가 없습니다.</div>
  );
};

export default CheckList;
