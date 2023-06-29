import React, { useEffect, useState } from 'react';
import { Cascader, Form, Input, DatePicker, ColorPicker, Button, Checkbox } from 'antd';
import { TodoDiv } from '../styles/TodoStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faListCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const rangeConfig = {
  // rules: [
  //   {
  //     type: 'array',
  //     required: true,
  //     message: 'Please select time!',
  //   },
  // ],
};

const onFinish = fieldsValue => {
  console.log(fieldsValue);

  const rangeValue = fieldsValue['date-picker'];
  const colorValue =
    fieldsValue['color'] === '#1677FF' ? '#1677FF' : fieldsValue['color'].toHexString();

  const values = {
    ...fieldsValue,
    'date-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
    color: colorValue,
  };
  console.log('Received values of form: ', values);
};

const Todo = () => {
  const [color, setColor] = useState('#1677ff');
  const [regionData, setRegionData] = useState([]);

  useEffect(() => {
    const getRegion = async setRegionData => {
      try {
        const res = await axios.get('/api/todo');
        const result = res.data;
        setRegionData(result);
        console.log(result);

        const data = regionData.region;
        console.log(data);

        const newRegion = data.map(item => ({
          value: item.idRegion,
          label: item.region,
        }));
        console.log(newRegion);

        const regionDetail = regionData.regionDetail;

        console.log(regionDetail);
        // console.log(regionDetail[0].idRegion);
        // console.log(regionDetail[0].idRegionDetail);

        const newRegionDetail = regionDetail.filter(item => item.idRegion === data[0].idRegion);
        console.log(newRegionDetail);

        // console.log(data.filter(item => item.idRegion === 48));

        const newChildren = newRegionDetail.map(item => ({
          value: item.idRegionDetail,
          label: item.regionDetail,
        }));
        console.log(newChildren);

        const newdata = newRegion[0];
        const test = newRegion.map(item => ({ ...item, childeren: 'hello' }));
        console.log(test);
        const new1 = { ...newdata, childeren: 'hello' };
        console.log(new1);

        const test2 = test.forEach(region => {
          const test3 = regionDetail.filter(item => item.idRegion === region.idRegion);
          console.log(test3);
        });

        const test4 = regionDetail.filter(item => console.log(item));
        console.log(test2);
      } catch (err) {
        console.log(err);
      }
    };
    getRegion(setRegionData);
  }, []);

  return (
    <TodoDiv>
      <Form
        name="time_related_controls"
        layout="horizontal"
        onFinish={onFinish}
        initialValues={{
          color: '#1677FF',
        }}
      >
        <h2>Travel Schedule</h2>
        <div className="addTravelWrap">
          <div className="inputTravel">
            <Form.Item name="city">
              <Cascader
                options={[
                  {
                    value: '1',
                    label: '대구광역시',
                    children: [
                      {
                        value: '11',
                        label: '중구',
                      },
                      {
                        value: '12',
                        label: '동구',
                      },
                      {
                        value: '13',
                        label: '서구',
                      },
                      {
                        value: '14',
                        label: '남구',
                      },
                      {
                        value: '15',
                        label: '북구',
                      },
                      {
                        value: '16',
                        label: '수성구',
                      },
                      {
                        value: '17',
                        label: '달서구',
                      },
                      {
                        value: '18',
                        label: '달성군',
                      },
                    ],
                  },
                  {
                    value: '2',
                    label: '경상북도',
                    children: [
                      {
                        value: '21',
                        label: '포항시',
                      },
                      {
                        value: '22',
                        label: '경주시',
                      },
                      {
                        value: '23',
                        label: '안동시',
                      },
                      {
                        value: '24',
                        label: '상주시',
                      },
                      {
                        value: '25',
                        label: '영천시',
                      },
                      {
                        value: '26',
                        label: '문경시',
                      },
                      {
                        value: '27',
                        label: '청도군',
                      },
                    ],
                  },
                ]}
                style={{ width: '200px', marginRight: 10 }}
                placeholder="여행 지역 선택"
              />
            </Form.Item>
            <Form.Item name="date-picker" {...rangeConfig}>
              <RangePicker placeholder={['시작일', '종료일']} style={{ marginRight: 10 }} />
            </Form.Item>
            <Form.Item name="color">
              <ColorPicker value={color} />
            </Form.Item>
          </div>
          <div className="addTravelBtn">
            <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
              저장
            </Button>
            <Button>취소</Button>
          </div>
        </div>
      </Form>
      <div className="detailPlanWrap">
        <div className="travelPlan">
          <div style={{ textAlign: 'start', width: '100%' }}>
            <h2>Travel Plan</h2>
            <ul style={{ height: 480 }}>
              <li style={{ marginBottom: 15 }}>
                <ul>
                  <li style={{ display: 'flex' }}>
                    <Checkbox style={{ marginRight: 10 }} />
                    <Input placeholder="일정을 입력하세요." style={{ marginRight: 10 }} />
                    <button style={{ border: 'none', background: 'none', marginRight: 10 }}>
                      <FontAwesomeIcon
                        icon={faListCheck}
                        style={{ fontSize: 15, color: '#575757' }}
                      />
                    </button>
                    <button style={{ border: 'none', background: 'none' }}>
                      <FontAwesomeIcon icon={faXmark} style={{ fontSize: 18, color: '#575757' }} />
                    </button>
                  </li>
                  <li style={{ display: 'flex', margin: '10px 0 0 20px' }}>
                    <Checkbox style={{ marginRight: 10 }} />
                    <Input placeholder="준비물을 입력하세요." style={{ marginRight: 10 }} />
                    <button style={{ border: 'none', background: 'none' }}>
                      <FontAwesomeIcon icon={faXmark} style={{ fontSize: 18, color: '#575757' }} />
                    </button>
                  </li>
                  <li style={{ display: 'flex', margin: '10px 0 0 20px' }}>
                    <Checkbox style={{ marginRight: 10 }} />
                    <Input placeholder="준비물을 입력하세요." style={{ marginRight: 10 }} />
                    <button style={{ border: 'none', background: 'none' }}>
                      <FontAwesomeIcon icon={faXmark} style={{ fontSize: 18, color: '#575757' }} />
                    </button>
                  </li>
                </ul>
              </li>
              <li style={{ marginBottom: 15 }}>
                <ul>
                  <li style={{ display: 'flex' }}>
                    <Checkbox style={{ marginRight: 10 }} />
                    <Input placeholder="일정을 입력하세요." style={{ marginRight: 10 }} />
                    <button style={{ border: 'none', background: 'none', marginRight: 10 }}>
                      <FontAwesomeIcon
                        icon={faListCheck}
                        style={{ fontSize: 15, color: '#575757' }}
                      />
                    </button>
                    <button style={{ border: 'none', background: 'none' }}>
                      <FontAwesomeIcon icon={faXmark} style={{ fontSize: 18, color: '#575757' }} />
                    </button>
                  </li>
                  <li style={{ display: 'flex', margin: '10px 0 0 20px' }}>
                    <Checkbox style={{ marginRight: 10 }} />
                    <Input placeholder="준비물을 입력하세요." style={{ marginRight: 10 }} />
                    <button style={{ border: 'none', background: 'none' }}>
                      <FontAwesomeIcon icon={faXmark} style={{ fontSize: 18, color: '#575757' }} />
                    </button>
                  </li>
                  <li style={{ display: 'flex', margin: '10px 0 0 20px' }}>
                    <Checkbox style={{ marginRight: 10 }} />
                    <Input placeholder="준비물을 입력하세요." style={{ marginRight: 10 }} />
                    <button style={{ border: 'none', background: 'none' }}>
                      <FontAwesomeIcon icon={faXmark} style={{ fontSize: 18, color: '#575757' }} />
                    </button>
                  </li>
                </ul>
              </li>
              <li style={{ marginBottom: 15 }}>
                <ul>
                  <li style={{ display: 'flex' }}>
                    <Checkbox style={{ marginRight: 10 }} />
                    <Input placeholder="일정을 입력하세요." style={{ marginRight: 10 }} />
                    <button style={{ border: 'none', background: 'none', marginRight: 10 }}>
                      <FontAwesomeIcon
                        icon={faListCheck}
                        style={{ fontSize: 15, color: '#575757' }}
                      />
                    </button>
                    <button style={{ border: 'none', background: 'none' }}>
                      <FontAwesomeIcon icon={faXmark} style={{ fontSize: 18, color: '#575757' }} />
                    </button>
                  </li>
                  <li style={{ display: 'flex', margin: '10px 0 0 20px' }}>
                    <Checkbox style={{ marginRight: 10 }} />
                    <Input placeholder="준비물을 입력하세요." style={{ marginRight: 10 }} />
                    <button style={{ border: 'none', background: 'none' }}>
                      <FontAwesomeIcon icon={faXmark} style={{ fontSize: 18, color: '#575757' }} />
                    </button>
                  </li>
                  <li style={{ display: 'flex', margin: '10px 0 0 20px' }}>
                    <Checkbox style={{ marginRight: 10 }} />
                    <Input placeholder="준비물을 입력하세요." style={{ marginRight: 10 }} />
                    <button style={{ border: 'none', background: 'none' }}>
                      <FontAwesomeIcon icon={faXmark} style={{ fontSize: 18, color: '#575757' }} />
                    </button>
                  </li>
                </ul>
              </li>
              <li>
                <Button type="primary" className="addPlanBtn">
                  일정 추가
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="travelReview">
          <h2>Travel Review</h2>
          <TextArea
            maxLength={100}
            style={{ height: 480, resize: 'none' }}
            // onChange={onChange}
            placeholder="여행에 대한 리뷰를 남겨주세요"
          />
        </div>
      </div>
    </TodoDiv>
  );
};

export default Todo;
