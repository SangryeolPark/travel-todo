import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Checkbox, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Link } from 'react-router-dom';

const Schedule = ({ setOpen, selectTitle, selectStartDate, selectEndDate }) => {
  // 닫기 버튼
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        style={{
          paddingTop: 30,
          position: 'relative',
        }}
      >
        <div
          style={{
            color: '#575757',
            position: 'absolute',
            right: -5,
            top: -10,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link to="/todo">
            <FontAwesomeIcon
              icon={faPencil}
              style={{ fontSize: 20, marginRight: 15, cursor: 'pointer' }}
            />
          </Link>
          <FontAwesomeIcon
            icon={faXmark}
            style={{
              fontSize: 27,
            }}
            onClick={onClose}
          />
        </div>
      </div>
      <div style={{ marginBottom: 35 }}>
        <h2 style={{ color: '#1e88e5', fontSize: 18, marginBottom: 6 }}>Travel Schedule</h2>
        <h3 style={{ marginBottom: 0, fontSize: 24 }}>{selectTitle}</h3>
        <span style={{ fontSize: 20 }}>{`${selectStartDate} ~ ${selectEndDate}`}</span>
      </div>
      <div style={{ marginBottom: 35 }}>
        <h2 style={{ color: '#1e88e5', fontSize: 18 }}>Travel Plan</h2>
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox style={{ background: 'none' }} disabled={true} defaultChecked="true" />
            <Input
              style={{
                border: 'none',
                background: 'none',
                color: '#000',
                fontSize: 20,
                fontWeight: 600,
              }}
              disabled={true}
              value="월영교 산책"
            />
          </div>
          <div style={{ marginLeft: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', height: 27 }}>
              <Checkbox style={{ background: 'none' }} disabled={true} defaultChecked="true" />
              <Input
                style={{
                  border: 'none',
                  background: 'none',
                  color: '#000',
                  fontSize: 17,
                  padding: 'none',
                }}
                disabled={true}
                value="카메라 챙기기"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: 27 }}>
              <Checkbox style={{ background: 'none' }} disabled={true} defaultChecked="true" />
              <Input
                style={{
                  border: 'none',
                  background: 'none',
                  color: '#000',
                  fontSize: 17,
                }}
                disabled={true}
                value="근처 맛집 찾아보기"
              />
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox style={{ background: 'none' }} disabled={true} defaultChecked="true" />
            <Input
              style={{
                border: 'none',
                background: 'none',
                color: '#000',
                fontSize: 20,
                fontWeight: 600,
              }}
              disabled={true}
              value="안동 시장 구경"
            />
          </div>
          <div style={{ marginLeft: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', height: 27 }}>
              <Checkbox style={{ background: 'none' }} disabled={true} defaultChecked="true" />
              <Input
                style={{
                  border: 'none',
                  background: 'none',
                  color: '#000',
                  fontSize: 17,
                  padding: 'none',
                }}
                disabled={true}
                value="인근 주차장 검색"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: 27 }}>
              <Checkbox style={{ background: 'none' }} disabled={true} defaultChecked="true" />
              <Input
                style={{
                  border: 'none',
                  background: 'none',
                  color: '#000',
                  fontSize: 17,
                }}
                disabled={true}
                value="시장 맛집 찾아보기"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 style={{ color: '#1e88e5', fontSize: 18, marginBottom: 10 }}>Travel Review</h2>
        <TextArea
          style={{ resize: 'none', background: 'none', color: '#000' }}
          value="참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. 참 재미있었다. "
          disabled={true}
          rows={5}
        />
      </div>
    </div>
  );
};
export default Schedule;
