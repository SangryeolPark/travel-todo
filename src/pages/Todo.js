import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cascader, Form, DatePicker, ColorPicker, Button } from 'antd';
import TodoList from '../components/todo/TodoList';
import TravelReview from '../components/todo/TravelReview';
import { TodoDiv } from '../styles/TodoStyle';
import axios from 'axios';

const Todo = () => {
  const { state } = useLocation();

  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const [regionData, setRegionData] = useState(null);
  const [region, setRegion] = useState([]);

  const [color, setColor] = useState('#1E88E5');
  const [subList, setSubList] = useState([]);
  console.log(subList);

  // DB 데이터 불러오기
  useEffect(() => {
    const getRegion = async setRegionData => {
      try {
        const res = await axios.get('/api/todo');
        const result = res.data;
        setRegionData(result);
      } catch (err) {
        console.log(err);
      }
    };
    getRegion(setRegionData);
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

  // 저장 버튼 클릭시
  const onFinish = fieldsValue => {
    const rangeValue = fieldsValue['date-picker'];
    const colorValue = color;
    const values = {
      ...fieldsValue,
      'date-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      color: colorValue,
    };

    // DB post data
    const postTitleData = {
      idRegionDetail: values.city[1],
      idRegion: values.city[0],
      startDate: values['date-picker'][0],
      endDate: values['date-picker'][1],
      calColor: values.color.replace('#', ''),
      subList: subList,
    };
    console.log(postTitleData);
    postTitle(postTitleData);
  };

  // Tododata 보내기
  const postTitle = async postTitleData => {
    try {
      const res = await axios.post('/api/todo', postTitleData);
      const result = res.data;
      console.log(result);
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
      subTitle: '',
      checkList: [],
    };
    const newSubList = [...subList, newSub];
    setSubList(newSubList);
    // setSubList([subList]);
    // setSubList();
  };

  return (
    <TodoDiv>
      <Form
        name="time_related_controls"
        layout="horizontal"
        onFinish={onFinish}
        // initialValues={{
        //   color: '#1E88E5',
        //   'visit-complete': false,
        //   city: [11, 11110],
        //   'date-picker': [dayjs('2023-07-04', 'YYYY-MM-DD'), dayjs('2023-07-05', 'YYYY-MM-DD')],
        // }}
      >
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
              <RangePicker className="range-picker" placeholder={['시작일', '종료일']} />
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
              <h2>Travel Plan</h2>
              <ul className="todoList-wrap">
                {subList.map(sub => {
                  console.log(sub);
                  return (
                    <TodoList
                      key={sub.id}
                      id={sub.id}
                      sub={sub}
                      subList={subList}
                      setSubList={setSubList}
                    />
                  );
                })}
                <li>
                  <Button
                    type="primary"
                    className="add-plan-btn"
                    style={{ background: '#1E88E5' }}
                    onClick={handleAddSubList}
                  >
                    일정 추가
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div className="travel-review">
            <h2>Travel Review</h2>
            <TravelReview />
          </div>
        </div>
      </Form>
    </TodoDiv>
  );
};

export default Todo;
