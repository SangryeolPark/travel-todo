import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Checkbox, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Link } from 'react-router-dom';
import { DetailScheduleDiv } from '../../styles/CalendarStyle';

const Schedule = ({ setOpen, selectTitle, selectStartDate, selectEndDate }) => {
  // 닫기 버튼
  const onClose = () => {
    setOpen(false);
  };

  return (
    <DetailScheduleDiv>
      <div className="btns">
        <Link to="/todo">
          <FontAwesomeIcon icon={faPencil} className="bt-pencil" />
        </Link>
        <FontAwesomeIcon icon={faTrashCan} className="bt-trash" /*onClick={onClose}*/ />
      </div>
      <div className="travel-schedule">
        <h2>Travel Schedule</h2>
        <h3>{selectTitle}</h3>
        <span>{`${selectStartDate} ~ ${selectEndDate}`}</span>
      </div>
      <div className="travel-plan">
        <h2>Travel Plan</h2>
        <div className="detail-plan">
          <div className="visit-list">
            <Checkbox className="checkbox" disabled={true} defaultChecked="true" />
            <Input className="input" disabled={true} value="월영교 산책" />
          </div>
          <div className="check-list">
            <div>
              <Checkbox className="checkbox" disabled={true} defaultChecked="true" />
              <Input className="input" disabled={true} value="카메라 챙기기" />
            </div>
            <div>
              <Checkbox className="checkbox" disabled={true} defaultChecked="true" />
              <Input className="input" disabled={true} value="근처 맛집 찾아보기" />
            </div>
          </div>
        </div>
        <div className="detail-plan">
          <div className="visit-list">
            <Checkbox className="checkbox" disabled={true} defaultChecked="true" />
            <Input className="input" disabled={true} value="안동 시장 구경" />
          </div>
          <div className="check-list">
            <div>
              <Checkbox className="checkbox" disabled={true} defaultChecked="true" />
              <Input className="input" disabled={true} value="인근 주차장 검색" />
            </div>
            <div>
              <Checkbox className="checkbox" disabled={true} defaultChecked="true" />
              <Input className="input" disabled={true} value="시장 맛집 찾아보기" />
            </div>
          </div>
        </div>
      </div>
      <div className="travel-review">
        <h2>Travel Review</h2>
        <TextArea
          className="text-area"
          value="참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. "
          disabled={true}
          rows={5}
        />
      </div>
    </DetailScheduleDiv>
  );
};
export default Schedule;
