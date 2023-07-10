import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { TravelReviewDiv } from '../../styles/TodoStyle';

const TravelReview = () => {
  return (
    <TravelReviewDiv>
      <Form.Item name="travel-review" className="review-wrap">
        <TextArea
          placeholder="여행에 대한 리뷰를 남겨주세요."
          maxLength="500"
          showCount
          className="textarea"
          rows={16}
          style={{ resize: 'none' }}
        />
      </Form.Item>
    </TravelReviewDiv>
  );
};

export default TravelReview;
