import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cascader, Form, DatePicker, ColorPicker, Button } from 'antd';
import TodoList from '../components/todo/TodoList';
import TravelReview from '../components/todo/TravelReview';
import { TodoDiv } from '../styles/TodoStyle';
import axios from 'axios';
import dayjs from 'dayjs';
import moment from 'moment';

const Todo = ({ setIsDataChanged }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const [disabledPlan, setDisabledPlan] = useState('');
  const [disabledReview, setDisabledReview] = useState('');
  const [regionData, setRegionData] = useState(null);
  const [region, setRegion] = useState([]);
  const [color, setColor] = useState('#1E88E5');
  const [subList, setSubList] = useState([]);
  const formRef = useRef(null);

  // 지역 데이터 불러오기
  useEffect(() => {
    const getRegion = async () => {
      try {
        const res = await axios.get('/api/todo');
        const result = res.data;
        setRegionData(result);
      } catch (err) {
        console.log(err);
      }
    };
    getRegion();
  }, []);

  // 지역 데이터 필터링
  useEffect(() => {
    if (regionData) {
      const region = regionData.region;
      const regionDetail = regionData.regionDetail;
      const newRegion = region.map(item => ({
        value: item.idRegion,
        label: item.region,
      }));
      const newRegionData = newRegion.map((newRegionItem, index) => {
        const newregionDetail = regionDetail.filter(
          item => item.idRegion === region[index].idRegion
        );
        const newChildren = newregionDetail.map(item => {
          return { value: item.idRegionDetail, label: item.regionDetail };
        });
        return { ...newRegionItem, children: newChildren };
      });
      setRegion(newRegionData);
    }
  }, [regionData]);

  // 일정 데이터 불러오기
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/todo/${state}`);
      formRef.current.setFieldsValue({
        color: data.calColor,
        city: [data.idRegion, data.idRegionDetail],
        'date-picker': [dayjs(data.startDate, 'YYYY-MM-DD'), dayjs(data.endDate, 'YYYY-MM-DD')],
        'travel-review': data.travelReview,
      });
      setSubList(data.subList);
      setColor(data.calColor);

      // 일정, 리뷰 수정 가능 여부
      const todayDate = moment(Date.now()).format('YYYY-MM-DD');
      const startDate = data.startDate;
      const endDate = data.endDate;

      setDisabledPlan(endDate < todayDate ? true : false);
      setDisabledReview(startDate <= todayDate ? true : false);
    };

    if (state) {
      getData();
    }
  }, [state]);

  // 추가/수정 버튼 클릭시
  const onFinish = fieldsValue => {
    const rangeValue = fieldsValue['date-picker'];
    const colorValue = color;
    const values = {
      ...fieldsValue,
      'date-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      color: colorValue,
    };

    // payload data
    let payloadData = {
      idRegionDetail: values.city[1],
      idRegion: values.city[0],
      startDate: values['date-picker'][0],
      endDate: values['date-picker'][1],
      calColor: values.color.replace('#', ''),
      subList: subList,
      travelReview: values['travel-review'],
    };

    if (state) {
      payloadData = { ...payloadData, idTitle: state };
    }

    saveData(payloadData);
    setIsDataChanged(prevState => !prevState);
    navigate(-1);
  };

  // Tododata 보내기
  const saveData = async payload => {
    try {
      state
        ? await axios.put(`/api/todo/${state}`, payload)
        : await axios.post('/api/todo', payload);
    } catch (err) {
      console.log(err);
    }
  };

  // 취소 버튼 클릭시
  const handleCancel = () => {
    navigate(-1);
  };

  // 일정 추가 버튼 클릭시
  const handleAddSubList = () => {
    const newSub = {
      id: Date.now(),
      idSub: 0,
      subTitle: '',
      checkList: [],
    };
    const newSubList = [...subList, newSub];
    setSubList(newSubList);
  };

  // datepicker 날짜 선택 제한
  const disabledDate = current => {
    return current && current < dayjs().startOf('day');
  };

  return (
    <TodoDiv>
      <Form ref={formRef} name="time_related_controls" layout="horizontal" onFinish={onFinish}>
        <h2>Travel Schedule</h2>
        <div className="travel-schedule-wrap">
          <div className="input-travel">
            <Form.Item
              name="city"
              rules={[
                {
                  required: true,
                  message: '여행 지역을 선택해주세요.',
                },
              ]}
            >
              <Cascader options={region} className="cascader" placeholder="여행 지역 선택" />
            </Form.Item>
            <Form.Item
              name="date-picker"
              rules={[
                {
                  type: 'array',
                  required: true,
                  message: '여행 기간을 선택해주세요.',
                },
              ]}
            >
              <RangePicker
                className="range-picker"
                placeholder={['시작일', '종료일']}
                disabledDate={disabledDate}
              />
            </Form.Item>
            <Form.Item name="color">
              <ColorPicker value={color} onChange={color => setColor(color.toHexString())} />
            </Form.Item>
          </div>
          <div className="add-travel-btn">
            <Button type="primary" htmlType="submit">
              {state ? '수정' : '추가'}
            </Button>
            <Button onClick={handleCancel}>취소</Button>
          </div>
        </div>
        <div className="detail-plan-wrap">
          <div className="travel-plan">
            <div>
              <div className="travel-plan-title">
                <h2>Travel Plan</h2>
                <Button
                  type="primary"
                  htmlType="button"
                  className="add-plan-btn"
                  style={{ background: '#1E88E5' }}
                  onClick={handleAddSubList}
                  disabled={disabledPlan}
                >
                  일정 추가
                </Button>
              </div>
              <ul className="todoList-wrap">
                {subList.map(sub => {
                  let id = state && sub.idSub ? sub.idSub : sub.id;
                  return (
                    <TodoList
                      key={id}
                      state={state}
                      idSub={id}
                      sub={sub}
                      subList={subList}
                      setSubList={setSubList}
                      disabledPlan={disabledPlan}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
          {state && disabledReview ? (
            <div className="travel-review">
              <h2>Travel Review</h2>
              <TravelReview />
            </div>
          ) : null}
        </div>
      </Form>
    </TodoDiv>
  );
};

export default Todo;
