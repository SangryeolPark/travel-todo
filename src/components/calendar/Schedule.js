import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Checkbox, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Link } from 'react-router-dom';
import { DetailScheduleDiv } from '../../styles/CalendarStyle';
import axios from 'axios';

const Schedule = ({
  setOpen,
  selectTitle,
  selectStartDate,
  selectEndDate,
  selectReview,
  todoData,
}) => {
  // 닫기 버튼
  // const onClose = () => {
  //   setOpen(false);
  // };

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
          {todoData.map(item => (
            <div key={item.idSub}>
              <div className="visit-list">
                <Checkbox className="checkbox" disabled={true} defaultChecked={item.finishYn} />
                <Input className="input" disabled={true} value={item.subTitle} />
              </div>
              {item.checkList.map(item => (
                <div key={item.idCheck} className="check-list">
                  <Checkbox className="checkbox" disabled={true} defaultChecked={item.finishYn} />
                  <Input className="input" disabled={true} value={item.checkList} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="travel-review">
        <h2>Travel Review</h2>
        <TextArea className="text-area" value={selectReview} disabled={true} rows={5} />
      </div>
    </DetailScheduleDiv>
  );
};
export default Schedule;
