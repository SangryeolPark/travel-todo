import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

const TravelReview = () => {
  return (
    <div>
      <Form.Item name="travel-review">
        <TextArea
          maxLength={100}
          style={{ height: 480, resize: 'none' }}
          placeholder="여행에 대한 리뷰를 남겨주세요."
        />
      </Form.Item>
    </div>
  );
};

export default TravelReview;
