import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { DetailScheduleDiv } from '../../styles/CalendarStyle';
import { useState } from 'react';

const Schedule = ({ selectTitle, selectStartDate, selectEndDate, selectReview, todoData }) => {
  const navigate = useNavigate();
  // 일정 삭제 모달창
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {};

  return (
    <DetailScheduleDiv>
      <div className="btns">
        <Link to="/todo">
          <FontAwesomeIcon icon={faPencil} className="bt-pencil" onClick={handleEdit} />
        </Link>
        <FontAwesomeIcon icon={faTrashCan} className="bt-trash" onClick={showModal} />
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
            <div key={item.idSub} className="visit-list-wrap">
              <div className="visit-list">
                <FontAwesomeIcon
                  icon={item.finishYn ? faSquareCheck : faSquare}
                  className="checkbox"
                />
                <Input className="input" disabled={true} value={item.subTitle} />
              </div>
              {item.checkList.length !== 0 ? (
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
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="travel-review">
        <h2>Travel Review</h2>
        <TextArea className="text-area" value={selectReview} disabled={true} rows={5} />
      </div>
      <div>
        <Modal
          title="확인"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className="modal"
          // style={{
          //   position: 'absolute',
          //   top: '50%',
          //   width: '520px',
          //   transform: 'translate(-50%, -50%)',
          //   left: '50%',
          // }}
        >
          <p>삭제한 일정은 복구할 수 없습니다.</p>
          <p>정말 삭제하시겠습니까?</p>
        </Modal>
      </div>
    </DetailScheduleDiv>
  );
};
export default Schedule;
