import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Link } from 'react-router-dom';
import { DetailScheduleDiv } from '../../styles/CalendarStyle';

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

  const textBlue = {
    color: '#1e88e5',
  };

  const textBlack = {
    color: '#666',
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
          {todoData.map(item => (
            <div key={item.idSub}>
              <div className="visit-list">
                <FontAwesomeIcon
                  icon={item.finishYn ? faSquareCheck : faSquare}
                  className="checkbox"
                />
                <Input className="input" disabled={true} value={item.subTitle} />
              </div>
              <div className="checkList-wrap">
                {item.checkList.map(item => (
                  <div key={item.idCheck} className="check-list">
                    <FontAwesomeIcon
                      icon={item.finishYn ? faSquareCheck : faSquare}
                      className="checkbox"
                    />
                    <Input className="input" disabled={true} value={item.checkList} />
                  </div>
                ))}
              </div>
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
