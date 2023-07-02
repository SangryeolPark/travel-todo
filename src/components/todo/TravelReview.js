import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

const TravelReview = () => {
  return (
    <div style={{ height: '100%' }}>
      <Form.Item name="travel-review" style={{ height: '100%', resize: 'none' }}>
        <TextArea
          placeholder="여행에 대한 리뷰를 남겨주세요."
          style={{ height: '35vh', resize: 'none' }}
        />
      </Form.Item>
    </div>
  );
};

export default TravelReview;
