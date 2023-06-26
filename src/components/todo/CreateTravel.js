import React, { useState } from 'react';
import moment from 'moment';
// import dayjs from 'dayjs';
import { Select, DatePicker, theme, ColorPicker, Button } from 'antd';

const provinceData = ['시/도', '대구광역시', '경상북도'];

const cityData = {
  '시/도': ['시/군/구'],
  대구광역시: ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'],
  경상북도: [
    '포항시',
    '경주시',
    '김천시',
    '안동시',
    '구미시',
    '영주시',
    '영천시',
    '상주시',
    '문경시',
    '경산시',
    '군위군',
    '의성군',
    '청송군',
    '영양군',
    '영덕군',
    '청도군',
    '고령군',
    '성주군',
    '칠곡군',
    '예천군',
    '봉화군',
    '울진군',
    '울릉군',
  ],
};

const { RangePicker } = DatePicker;
const CreateTravel = ({ data, setData }) => {
  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [detailCity, setDetailCity] = useState(cityData[provinceData[0]][0]);
  const [city, setCity] = useState(provinceData[0]);

  const { token } = theme.useToken();
  const [color, setColor] = useState(token.colorPrimary);
  const [startDate, setStartDate] = useState(data[0].startDate);
  const [endDate, setEndDate] = useState(data[0].endDate);
  const dateValue = [null, null];
  // const dateValue = [dayjs(Date.now()), dayjs(Date.now())];

  const handleProvinceChange = value => {
    console.log(value);
    setCity(value);
    setCities(cityData[value]);
    setDetailCity(cityData[value][0]);
  };
  const onDetailCityChange = value => {
    setDetailCity(value);
  };

  const handleChangeColor = value => {
    const r = parseInt(value.metaColor.r);
    const g = parseInt(value.metaColor.g);
    const b = parseInt(value.metaColor.b);
    let newColor;
    function ColorToHex(color) {
      const hexadecimal = color.toString(16);
      return hexadecimal.length == 1 ? '0' + hexadecimal : hexadecimal;
    }
    function ConvertRGBtoHex(red, green, blue) {
      newColor = '#' + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
      return newColor;
    }
    ConvertRGBtoHex(r, g, b);
    setColor(newColor);
  };

  const handleSaveClick = () => {
    const newData = {
      id: Date.now(),
      city: city,
      detailCity: detailCity,
      color: color,
      startDate: startDate,
      endDate: endDate,
    };
    console.log(newData);
    setData([...data, newData]);
  };

  const handleDate = value => {
    console.log(value);
    const startDate = moment(value[0].$d).format('YYYY-MM-DD');
    const endDate = moment(value[1].$d).format('YYYY-MM-DD');
    console.log(startDate, endDate);
    setStartDate(startDate);
    setEndDate(endDate);
  };
  return (
    <div style={{ width: 1000, margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* <span style={{ marginRight: 10 }}>여행지 추가</span> */}
          <Select
            style={{
              width: 120,
              marginRight: 10,
            }}
            value={city}
            onChange={handleProvinceChange}
            options={provinceData.map(province => ({
              label: province,
              value: province,
            }))}
          />
          <Select
            style={{
              width: 120,
              marginRight: 10,
            }}
            value={detailCity}
            onChange={onDetailCityChange}
            options={cities.map(city => ({
              label: city,
              value: city,
            }))}
          />
          <RangePicker
            defaultValue={dateValue}
            onChange={handleDate}
            format="YYYY-MM-DD"
            style={{
              marginRight: 10,
            }}
          />
          <ColorPicker value={color} onChange={handleChangeColor} />
        </div>
        <div>
          <Button style={{ marginRight: 10 }} onClick={handleSaveClick}>
            저장
          </Button>
          <Button>취소</Button>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexFlow: 'column',
            width: '50%',
            paddingRight: 15,
            borderRight: '1px solid #000',
            position: 'relative',
          }}
        ></div>
      </div>
    </div>
  );
};

export default CreateTravel;
