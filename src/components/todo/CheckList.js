import { Checkbox, Form, Input } from 'antd';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const CheckList = ({ index, checkList }) => {
  return (
    <div>
      <li style={{ display: 'flex', margin: '10px 0 0 20px' }}>
        <Form.Item name={`checkList-complete${index}`}>
          <Checkbox style={{ marginRight: 10 }} checked={checkList.complete} />
        </Form.Item>
        <Form.Item name={`checkList-title${index}`}>
          <Input
            placeholder="준비물을 입력해주세요."
            style={{ marginRight: 10 }}
            // value={item.title}
          />
        </Form.Item>
        <button style={{ border: 'none', background: 'none' }}>
          <FontAwesomeIcon icon={faXmark} style={{ fontSize: 18, color: '#575757' }} />
        </button>
      </li>
    </div>
  );
};

export default CheckList;
