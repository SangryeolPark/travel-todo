import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const TodoCheck = ({ data }) => {
  return data.map(item => (
    <div
      key={item.idCheck}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 7,
      }}
    >
      {item.finishYn ? (
        <FontAwesomeIcon icon={faSquareCheck} />
      ) : (
        <FontAwesomeIcon icon={faSquare} />
      )}
      <span>{item.checkTitle}</span>
    </div>
  ));
};

export default TodoCheck;
