import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { DetailScheduleDiv } from '../../styles/CalendarStyle';
import { useState } from 'react';

const Schedule = ({ selectTitle, selectStartDate, selectEndDate, selectReview, todoData }) => {
  // 일정 삭제 모달창
  const { confirm } = Modal;
  const showModal = () => {
    confirm({
      title: '일정 삭제',
      content: (
        <>
          <p>삭제한 일정은 복구할 수 없습니다.</p>
          <p>정말 삭제하시겠습니까?</p>
        </>
      ),
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      centered: true,
      // async onOk() {
      //   try {
      //     await axios.patch(`/api/todo/${idTitle}`);
      //     setForceRender(!forceRender);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
    });
  };

  return (
    <DetailScheduleDiv>
      <div className="btns">
        <Link to="/todo">
          <FontAwesomeIcon icon={faPencil} className="bt-pencil" />
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
        {todoData.length === 0 ? (
          '등록된 일정이 없습니다.'
        ) : (
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
        )}
      </div>
      <div className="travel-review">
        <h2>Travel Review</h2>
        {selectReview ? (
          <TextArea className="text-area" value={selectReview} disabled={true} rows={5} />
        ) : (
          '등록된 리뷰가 없습니다.'
        )}
      </div>
      <div>
        {/* <Modal
          centered
          title="확인"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className="modal"
        >
          <p>삭제한 일정은 복구할 수 없습니다.</p>
          <p>정말 삭제하시겠습니까?</p>
        </Modal> */}
      </div>
    </DetailScheduleDiv>
  );
};
export default Schedule;
