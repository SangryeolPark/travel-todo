import React, { useEffect, useState } from 'react';
import { Cascader, Form, Input, DatePicker, ColorPicker, Button, Checkbox } from 'antd';
import { TodoDiv } from '../styles/TodoStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faListCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { tempRegionData } from '../assets/tempData';
import { useNavigate } from 'react-router-dom';

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
    fieldsValue['color'] === '#1E88E5' ? '#1E88E5' : fieldsValue['color'].toHexString();

  const values = {
    ...fieldsValue,
    'date-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
    color: colorValue,
  };
  console.log('Received values of form: ', values);
};

const Todo = () => {
  const origindata = {
    region: [
      {
        idRegion: 11,
        region: '서울특별시',
      },
      {
        idRegion: 26,
        region: '부산광역시',
      },
      {
        idRegion: 27,
        region: '대구광역시',
      },
      {
        idRegion: 28,
        region: '인천광역시',
      },
      {
        idRegion: 29,
        region: '광주광역시',
      },
      {
        idRegion: 30,
        region: '대전광역시',
      },
      {
        idRegion: 31,
        region: '울산광역시',
      },
      {
        idRegion: 36,
        region: '세종시',
      },
      {
        idRegion: 41,
        region: '경기도',
      },
      {
        idRegion: 42,
        region: '강원도',
      },
      {
        idRegion: 43,
        region: '충청북도',
      },
      {
        idRegion: 44,
        region: '충청남도',
      },
      {
        idRegion: 45,
        region: '전라북도',
      },
      {
        idRegion: 46,
        region: '전라남도',
      },
      {
        idRegion: 47,
        region: '경상북도',
      },
      {
        idRegion: 48,
        region: '경상남도',
      },
      {
        idRegion: 50,
        region: '제주도',
      },
    ],
    regionDetail: [
      {
        idRegionDetail: 11110,
        idRegion: 11,
        regionDetail: '종로구',
      },
      {
        idRegionDetail: 11140,
        idRegion: 11,
        regionDetail: '중구',
      },
      {
        idRegionDetail: 11170,
        idRegion: 11,
        regionDetail: '용산구',
      },
      {
        idRegionDetail: 11200,
        idRegion: 11,
        regionDetail: '성동구',
      },
      {
        idRegionDetail: 11215,
        idRegion: 11,
        regionDetail: '광진구',
      },
      {
        idRegionDetail: 11230,
        idRegion: 11,
        regionDetail: '동대문구',
      },
      {
        idRegionDetail: 11260,
        idRegion: 11,
        regionDetail: '중랑구',
      },
      {
        idRegionDetail: 11290,
        idRegion: 11,
        regionDetail: '성북구',
      },
      {
        idRegionDetail: 11305,
        idRegion: 11,
        regionDetail: '강북구',
      },
      {
        idRegionDetail: 11320,
        idRegion: 11,
        regionDetail: '도봉구',
      },
      {
        idRegionDetail: 11350,
        idRegion: 11,
        regionDetail: '노원구',
      },
      {
        idRegionDetail: 11380,
        idRegion: 11,
        regionDetail: '은평구',
      },
      {
        idRegionDetail: 11410,
        idRegion: 11,
        regionDetail: '서대문구',
      },
      {
        idRegionDetail: 11440,
        idRegion: 11,
        regionDetail: '마포구',
      },
      {
        idRegionDetail: 11470,
        idRegion: 11,
        regionDetail: '양천구',
      },
      {
        idRegionDetail: 11500,
        idRegion: 11,
        regionDetail: '강서구',
      },
      {
        idRegionDetail: 11530,
        idRegion: 11,
        regionDetail: '구로구',
      },
      {
        idRegionDetail: 11545,
        idRegion: 11,
        regionDetail: '금천구',
      },
      {
        idRegionDetail: 11560,
        idRegion: 11,
        regionDetail: '영등포구',
      },
      {
        idRegionDetail: 11590,
        idRegion: 11,
        regionDetail: '동작구',
      },
      {
        idRegionDetail: 11620,
        idRegion: 11,
        regionDetail: '관악구',
      },
      {
        idRegionDetail: 11650,
        idRegion: 11,
        regionDetail: '서초구',
      },
      {
        idRegionDetail: 11680,
        idRegion: 11,
        regionDetail: '강남구',
      },
      {
        idRegionDetail: 11710,
        idRegion: 11,
        regionDetail: '송파구',
      },
      {
        idRegionDetail: 11740,
        idRegion: 11,
        regionDetail: '강동구',
      },
      {
        idRegionDetail: 26110,
        idRegion: 26,
        regionDetail: '중구',
      },
      {
        idRegionDetail: 26140,
        idRegion: 26,
        regionDetail: '서구',
      },
      {
        idRegionDetail: 26170,
        idRegion: 26,
        regionDetail: '동구',
      },
      {
        idRegionDetail: 26200,
        idRegion: 26,
        regionDetail: '영도구',
      },
      {
        idRegionDetail: 26230,
        idRegion: 26,
        regionDetail: '부산진구',
      },
      {
        idRegionDetail: 26260,
        idRegion: 26,
        regionDetail: '동래구',
      },
      {
        idRegionDetail: 26290,
        idRegion: 26,
        regionDetail: '남구',
      },
      {
        idRegionDetail: 26320,
        idRegion: 26,
        regionDetail: '북구',
      },
      {
        idRegionDetail: 26350,
        idRegion: 26,
        regionDetail: '해운대구',
      },
      {
        idRegionDetail: 26380,
        idRegion: 26,
        regionDetail: '사하구',
      },
      {
        idRegionDetail: 26410,
        idRegion: 26,
        regionDetail: '금정구',
      },
      {
        idRegionDetail: 26440,
        idRegion: 26,
        regionDetail: '강서구',
      },
      {
        idRegionDetail: 26470,
        idRegion: 26,
        regionDetail: '연제구',
      },
      {
        idRegionDetail: 26500,
        idRegion: 26,
        regionDetail: '수영구',
      },
      {
        idRegionDetail: 26530,
        idRegion: 26,
        regionDetail: '사상구',
      },
      {
        idRegionDetail: 26710,
        idRegion: 26,
        regionDetail: '기장군',
      },
      {
        idRegionDetail: 27110,
        idRegion: 27,
        regionDetail: '중구',
      },
      {
        idRegionDetail: 27140,
        idRegion: 27,
        regionDetail: '동구',
      },
      {
        idRegionDetail: 27170,
        idRegion: 27,
        regionDetail: '서구',
      },
      {
        idRegionDetail: 27200,
        idRegion: 27,
        regionDetail: '남구',
      },
      {
        idRegionDetail: 27230,
        idRegion: 27,
        regionDetail: '북구',
      },
      {
        idRegionDetail: 27260,
        idRegion: 27,
        regionDetail: '수성구',
      },
      {
        idRegionDetail: 27290,
        idRegion: 27,
        regionDetail: '달서구',
      },
      {
        idRegionDetail: 27710,
        idRegion: 27,
        regionDetail: '달성군',
      },
      {
        idRegionDetail: 28110,
        idRegion: 28,
        regionDetail: '중구',
      },
      {
        idRegionDetail: 28140,
        idRegion: 28,
        regionDetail: '동구',
      },
      {
        idRegionDetail: 28177,
        idRegion: 28,
        regionDetail: '미추홀구',
      },
      {
        idRegionDetail: 28185,
        idRegion: 28,
        regionDetail: '연수구',
      },
      {
        idRegionDetail: 28200,
        idRegion: 28,
        regionDetail: '남동구',
      },
      {
        idRegionDetail: 28237,
        idRegion: 28,
        regionDetail: '부평구',
      },
      {
        idRegionDetail: 28245,
        idRegion: 28,
        regionDetail: '계양구',
      },
      {
        idRegionDetail: 28260,
        idRegion: 28,
        regionDetail: '서구',
      },
      {
        idRegionDetail: 28710,
        idRegion: 28,
        regionDetail: '강화군',
      },
      {
        idRegionDetail: 28720,
        idRegion: 28,
        regionDetail: '옹진군',
      },
      {
        idRegionDetail: 29110,
        idRegion: 29,
        regionDetail: '동구',
      },
      {
        idRegionDetail: 29140,
        idRegion: 29,
        regionDetail: '서구',
      },
      {
        idRegionDetail: 29155,
        idRegion: 29,
        regionDetail: '남구',
      },
      {
        idRegionDetail: 29170,
        idRegion: 29,
        regionDetail: '북구',
      },
      {
        idRegionDetail: 29200,
        idRegion: 29,
        regionDetail: '광산구',
      },
      {
        idRegionDetail: 30110,
        idRegion: 30,
        regionDetail: '동구',
      },
      {
        idRegionDetail: 30140,
        idRegion: 30,
        regionDetail: '중구',
      },
      {
        idRegionDetail: 30170,
        idRegion: 30,
        regionDetail: '서구',
      },
      {
        idRegionDetail: 30200,
        idRegion: 30,
        regionDetail: '유성구',
      },
      {
        idRegionDetail: 30230,
        idRegion: 30,
        regionDetail: '대덕구',
      },
      {
        idRegionDetail: 31110,
        idRegion: 31,
        regionDetail: '중구',
      },
      {
        idRegionDetail: 31140,
        idRegion: 31,
        regionDetail: '남구',
      },
      {
        idRegionDetail: 31170,
        idRegion: 31,
        regionDetail: '동구',
      },
      {
        idRegionDetail: 31200,
        idRegion: 31,
        regionDetail: '북구',
      },
      {
        idRegionDetail: 31710,
        idRegion: 31,
        regionDetail: '울주군',
      },
      {
        idRegionDetail: 36110,
        idRegion: 36,
        regionDetail: ' ',
      },
      {
        idRegionDetail: 41110,
        idRegion: 41,
        regionDetail: '수원시',
      },
      {
        idRegionDetail: 41130,
        idRegion: 41,
        regionDetail: '성남시',
      },
      {
        idRegionDetail: 41150,
        idRegion: 41,
        regionDetail: '의정부시',
      },
      {
        idRegionDetail: 41170,
        idRegion: 41,
        regionDetail: '안양시',
      },
      {
        idRegionDetail: 41190,
        idRegion: 41,
        regionDetail: '부천시',
      },
      {
        idRegionDetail: 41210,
        idRegion: 41,
        regionDetail: '광명시',
      },
      {
        idRegionDetail: 41220,
        idRegion: 41,
        regionDetail: '평택시',
      },
      {
        idRegionDetail: 41250,
        idRegion: 41,
        regionDetail: '동두천시',
      },
      {
        idRegionDetail: 41270,
        idRegion: 41,
        regionDetail: '안산시',
      },
      {
        idRegionDetail: 41280,
        idRegion: 41,
        regionDetail: '고양시',
      },
      {
        idRegionDetail: 41290,
        idRegion: 41,
        regionDetail: '과천시',
      },
      {
        idRegionDetail: 41310,
        idRegion: 41,
        regionDetail: '구리시',
      },
      {
        idRegionDetail: 41360,
        idRegion: 41,
        regionDetail: '남양주시',
      },
      {
        idRegionDetail: 41370,
        idRegion: 41,
        regionDetail: '오산시',
      },
      {
        idRegionDetail: 41390,
        idRegion: 41,
        regionDetail: '시흥시',
      },
      {
        idRegionDetail: 41410,
        idRegion: 41,
        regionDetail: '군포시',
      },
      {
        idRegionDetail: 41430,
        idRegion: 41,
        regionDetail: '의왕시',
      },
      {
        idRegionDetail: 41450,
        idRegion: 41,
        regionDetail: '하남시',
      },
      {
        idRegionDetail: 41460,
        idRegion: 41,
        regionDetail: '용인시',
      },
      {
        idRegionDetail: 41480,
        idRegion: 41,
        regionDetail: '파주시',
      },
      {
        idRegionDetail: 41500,
        idRegion: 41,
        regionDetail: '이천시',
      },
      {
        idRegionDetail: 41550,
        idRegion: 41,
        regionDetail: '안성시',
      },
      {
        idRegionDetail: 41570,
        idRegion: 41,
        regionDetail: '김포시',
      },
      {
        idRegionDetail: 41590,
        idRegion: 41,
        regionDetail: '화성시',
      },
      {
        idRegionDetail: 41610,
        idRegion: 41,
        regionDetail: '광주시',
      },
      {
        idRegionDetail: 41630,
        idRegion: 41,
        regionDetail: '양주시',
      },
      {
        idRegionDetail: 41650,
        idRegion: 41,
        regionDetail: '포천시',
      },
      {
        idRegionDetail: 41670,
        idRegion: 41,
        regionDetail: '여주시',
      },
      {
        idRegionDetail: 41800,
        idRegion: 41,
        regionDetail: '연천군',
      },
      {
        idRegionDetail: 41820,
        idRegion: 41,
        regionDetail: '가평군',
      },
      {
        idRegionDetail: 41830,
        idRegion: 41,
        regionDetail: '양평군',
      },
      {
        idRegionDetail: 42110,
        idRegion: 42,
        regionDetail: '춘천시',
      },
      {
        idRegionDetail: 42130,
        idRegion: 42,
        regionDetail: '원주시',
      },
      {
        idRegionDetail: 42150,
        idRegion: 42,
        regionDetail: '강릉시',
      },
      {
        idRegionDetail: 42170,
        idRegion: 42,
        regionDetail: '동해시',
      },
      {
        idRegionDetail: 42190,
        idRegion: 42,
        regionDetail: '태백시',
      },
      {
        idRegionDetail: 42210,
        idRegion: 42,
        regionDetail: '속초시',
      },
      {
        idRegionDetail: 42230,
        idRegion: 42,
        regionDetail: '삼척시',
      },
      {
        idRegionDetail: 42720,
        idRegion: 42,
        regionDetail: '홍천군',
      },
      {
        idRegionDetail: 42730,
        idRegion: 42,
        regionDetail: '횡성군',
      },
      {
        idRegionDetail: 42750,
        idRegion: 42,
        regionDetail: '영월군',
      },
      {
        idRegionDetail: 42760,
        idRegion: 42,
        regionDetail: '평창군',
      },
      {
        idRegionDetail: 42770,
        idRegion: 42,
        regionDetail: '정선군',
      },
      {
        idRegionDetail: 42780,
        idRegion: 42,
        regionDetail: '철원군',
      },
      {
        idRegionDetail: 42790,
        idRegion: 42,
        regionDetail: '화천군',
      },
      {
        idRegionDetail: 42800,
        idRegion: 42,
        regionDetail: '양구군',
      },
      {
        idRegionDetail: 42810,
        idRegion: 42,
        regionDetail: '인제군',
      },
      {
        idRegionDetail: 42820,
        idRegion: 42,
        regionDetail: '고성군',
      },
      {
        idRegionDetail: 42830,
        idRegion: 42,
        regionDetail: '양양군',
      },
      {
        idRegionDetail: 43110,
        idRegion: 43,
        regionDetail: '청주시',
      },
      {
        idRegionDetail: 43130,
        idRegion: 43,
        regionDetail: '충주시',
      },
      {
        idRegionDetail: 43150,
        idRegion: 43,
        regionDetail: '제천시',
      },
      {
        idRegionDetail: 43720,
        idRegion: 43,
        regionDetail: '보은군',
      },
      {
        idRegionDetail: 43730,
        idRegion: 43,
        regionDetail: '옥천군',
      },
      {
        idRegionDetail: 43740,
        idRegion: 43,
        regionDetail: '영동군',
      },
      {
        idRegionDetail: 43745,
        idRegion: 43,
        regionDetail: '증평군',
      },
      {
        idRegionDetail: 43750,
        idRegion: 43,
        regionDetail: '진천군',
      },
      {
        idRegionDetail: 43760,
        idRegion: 43,
        regionDetail: '괴산군',
      },
      {
        idRegionDetail: 43770,
        idRegion: 43,
        regionDetail: '음성군',
      },
      {
        idRegionDetail: 43800,
        idRegion: 43,
        regionDetail: '단양군',
      },
      {
        idRegionDetail: 44130,
        idRegion: 44,
        regionDetail: '천안시',
      },
      {
        idRegionDetail: 44150,
        idRegion: 44,
        regionDetail: '공주시',
      },
      {
        idRegionDetail: 44180,
        idRegion: 44,
        regionDetail: '보령시',
      },
      {
        idRegionDetail: 44200,
        idRegion: 44,
        regionDetail: '아산시',
      },
      {
        idRegionDetail: 44210,
        idRegion: 44,
        regionDetail: '서산시',
      },
      {
        idRegionDetail: 44230,
        idRegion: 44,
        regionDetail: '논산시',
      },
      {
        idRegionDetail: 44250,
        idRegion: 44,
        regionDetail: '계룡시',
      },
      {
        idRegionDetail: 44270,
        idRegion: 44,
        regionDetail: '당진시',
      },
      {
        idRegionDetail: 44710,
        idRegion: 44,
        regionDetail: '금산군',
      },
      {
        idRegionDetail: 44760,
        idRegion: 44,
        regionDetail: '부여군',
      },
      {
        idRegionDetail: 44770,
        idRegion: 44,
        regionDetail: '서천군',
      },
      {
        idRegionDetail: 44790,
        idRegion: 44,
        regionDetail: '청양군',
      },
      {
        idRegionDetail: 44800,
        idRegion: 44,
        regionDetail: '홍성군',
      },
      {
        idRegionDetail: 44810,
        idRegion: 44,
        regionDetail: '예산군',
      },
      {
        idRegionDetail: 44825,
        idRegion: 44,
        regionDetail: '태안군',
      },
      {
        idRegionDetail: 45110,
        idRegion: 45,
        regionDetail: '전주시',
      },
      {
        idRegionDetail: 45130,
        idRegion: 45,
        regionDetail: '군산시',
      },
      {
        idRegionDetail: 45140,
        idRegion: 45,
        regionDetail: '익산시',
      },
      {
        idRegionDetail: 45180,
        idRegion: 45,
        regionDetail: '정읍시',
      },
      {
        idRegionDetail: 45190,
        idRegion: 45,
        regionDetail: '남원시',
      },
      {
        idRegionDetail: 45210,
        idRegion: 45,
        regionDetail: '김제시',
      },
      {
        idRegionDetail: 45710,
        idRegion: 45,
        regionDetail: '완주군',
      },
      {
        idRegionDetail: 45720,
        idRegion: 45,
        regionDetail: '진안군',
      },
      {
        idRegionDetail: 45730,
        idRegion: 45,
        regionDetail: '무주군',
      },
      {
        idRegionDetail: 45740,
        idRegion: 45,
        regionDetail: '장수군',
      },
      {
        idRegionDetail: 45750,
        idRegion: 45,
        regionDetail: '임실군',
      },
      {
        idRegionDetail: 45770,
        idRegion: 45,
        regionDetail: '순창군',
      },
      {
        idRegionDetail: 45790,
        idRegion: 45,
        regionDetail: '고창군',
      },
      {
        idRegionDetail: 45800,
        idRegion: 45,
        regionDetail: '부안군',
      },
      {
        idRegionDetail: 46110,
        idRegion: 46,
        regionDetail: '목포시',
      },
      {
        idRegionDetail: 46130,
        idRegion: 46,
        regionDetail: '여수시',
      },
      {
        idRegionDetail: 46150,
        idRegion: 46,
        regionDetail: '순천시',
      },
      {
        idRegionDetail: 46170,
        idRegion: 46,
        regionDetail: '나주시',
      },
      {
        idRegionDetail: 46230,
        idRegion: 46,
        regionDetail: '광양시',
      },
      {
        idRegionDetail: 46710,
        idRegion: 46,
        regionDetail: '담양군',
      },
      {
        idRegionDetail: 46720,
        idRegion: 46,
        regionDetail: '곡성군',
      },
      {
        idRegionDetail: 46730,
        idRegion: 46,
        regionDetail: '구례군',
      },
      {
        idRegionDetail: 46770,
        idRegion: 46,
        regionDetail: '고흥군',
      },
      {
        idRegionDetail: 46780,
        idRegion: 46,
        regionDetail: '보성군',
      },
      {
        idRegionDetail: 46790,
        idRegion: 46,
        regionDetail: '화순군',
      },
      {
        idRegionDetail: 46800,
        idRegion: 46,
        regionDetail: '장흥군',
      },
      {
        idRegionDetail: 46810,
        idRegion: 46,
        regionDetail: '강진군',
      },
      {
        idRegionDetail: 46820,
        idRegion: 46,
        regionDetail: '해남군',
      },
      {
        idRegionDetail: 46830,
        idRegion: 46,
        regionDetail: '영암군',
      },
      {
        idRegionDetail: 46840,
        idRegion: 46,
        regionDetail: '무안군',
      },
      {
        idRegionDetail: 46860,
        idRegion: 46,
        regionDetail: '함평군',
      },
      {
        idRegionDetail: 46870,
        idRegion: 46,
        regionDetail: '영광군',
      },
      {
        idRegionDetail: 46880,
        idRegion: 46,
        regionDetail: '장성군',
      },
      {
        idRegionDetail: 46890,
        idRegion: 46,
        regionDetail: '완도군',
      },
      {
        idRegionDetail: 46900,
        idRegion: 46,
        regionDetail: '진도군',
      },
      {
        idRegionDetail: 46910,
        idRegion: 46,
        regionDetail: '신안군',
      },
      {
        idRegionDetail: 47110,
        idRegion: 47,
        regionDetail: '포항시',
      },
      {
        idRegionDetail: 47130,
        idRegion: 47,
        regionDetail: '경주시',
      },
      {
        idRegionDetail: 47150,
        idRegion: 47,
        regionDetail: '김천시',
      },
      {
        idRegionDetail: 47170,
        idRegion: 47,
        regionDetail: '안동시',
      },
      {
        idRegionDetail: 47190,
        idRegion: 47,
        regionDetail: '구미시',
      },
      {
        idRegionDetail: 47210,
        idRegion: 47,
        regionDetail: '영주시',
      },
      {
        idRegionDetail: 47230,
        idRegion: 47,
        regionDetail: '영천시',
      },
      {
        idRegionDetail: 47250,
        idRegion: 47,
        regionDetail: '상주시',
      },
      {
        idRegionDetail: 47280,
        idRegion: 47,
        regionDetail: '문경시',
      },
      {
        idRegionDetail: 47290,
        idRegion: 47,
        regionDetail: '경산시',
      },
      {
        idRegionDetail: 47720,
        idRegion: 47,
        regionDetail: '군위군',
      },
      {
        idRegionDetail: 47730,
        idRegion: 47,
        regionDetail: '의성군',
      },
      {
        idRegionDetail: 47750,
        idRegion: 47,
        regionDetail: '청송군',
      },
      {
        idRegionDetail: 47760,
        idRegion: 47,
        regionDetail: '영양군',
      },
      {
        idRegionDetail: 47770,
        idRegion: 47,
        regionDetail: '영덕군',
      },
      {
        idRegionDetail: 47820,
        idRegion: 47,
        regionDetail: '청도군',
      },
      {
        idRegionDetail: 47830,
        idRegion: 47,
        regionDetail: '고령군',
      },
      {
        idRegionDetail: 47840,
        idRegion: 47,
        regionDetail: '성주군',
      },
      {
        idRegionDetail: 47850,
        idRegion: 47,
        regionDetail: '칠곡군',
      },
      {
        idRegionDetail: 47900,
        idRegion: 47,
        regionDetail: '예천군',
      },
      {
        idRegionDetail: 47920,
        idRegion: 47,
        regionDetail: '봉화군',
      },
      {
        idRegionDetail: 47930,
        idRegion: 47,
        regionDetail: '울진군',
      },
      {
        idRegionDetail: 47940,
        idRegion: 47,
        regionDetail: '울릉군',
      },
      {
        idRegionDetail: 48120,
        idRegion: 48,
        regionDetail: '창원시',
      },
      {
        idRegionDetail: 48170,
        idRegion: 48,
        regionDetail: '진주시',
      },
      {
        idRegionDetail: 48220,
        idRegion: 48,
        regionDetail: '통영시',
      },
      {
        idRegionDetail: 48240,
        idRegion: 48,
        regionDetail: '사천시',
      },
      {
        idRegionDetail: 48250,
        idRegion: 48,
        regionDetail: '김해시',
      },
      {
        idRegionDetail: 48270,
        idRegion: 48,
        regionDetail: '밀양시',
      },
      {
        idRegionDetail: 48310,
        idRegion: 48,
        regionDetail: '거제시',
      },
      {
        idRegionDetail: 48330,
        idRegion: 48,
        regionDetail: '양산시',
      },
      {
        idRegionDetail: 48720,
        idRegion: 48,
        regionDetail: '의령군',
      },
      {
        idRegionDetail: 48730,
        idRegion: 48,
        regionDetail: '함안군',
      },
      {
        idRegionDetail: 48740,
        idRegion: 48,
        regionDetail: '창녕군',
      },
      {
        idRegionDetail: 48820,
        idRegion: 48,
        regionDetail: '고성군',
      },
      {
        idRegionDetail: 48840,
        idRegion: 48,
        regionDetail: '남해군',
      },
      {
        idRegionDetail: 48850,
        idRegion: 48,
        regionDetail: '하동군',
      },
      {
        idRegionDetail: 48860,
        idRegion: 48,
        regionDetail: '산청군',
      },
      {
        idRegionDetail: 48870,
        idRegion: 48,
        regionDetail: '함양군',
      },
      {
        idRegionDetail: 48880,
        idRegion: 48,
        regionDetail: '거창군',
      },
      {
        idRegionDetail: 48890,
        idRegion: 48,
        regionDetail: '합천군',
      },
      {
        idRegionDetail: 50110,
        idRegion: 50,
        regionDetail: '제주시',
      },
      {
        idRegionDetail: 50130,
        idRegion: 50,
        regionDetail: '서귀포시',
      },
    ],
  };
  const [color, setColor] = useState('#1E88E5');
  const [regionData, setRegionData] = useState([]);
  const navigate = useNavigate();

  // 지역 데이터 필터링
  const region = origindata.region;
  const regionDetail = origindata.regionDetail;
  const newRegion = region.map(item => ({
    value: item.idRegion,
    label: item.region,
  }));
  const newRegionData = newRegion.map((newRegionItem, index) => {
    const newregionDetail = regionDetail.filter(item => item.idRegion === region[index].idRegion);
    const newChildren = newregionDetail.map(item => {
      return { value: item.idRegionDetail, label: item.regionDetail };
    });
    return { ...newRegionItem, children: newChildren };
  });

  // 취소 버튼
  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getRegion = async setRegionData => {
      try {
        // const res = await axios.get('/api/todo');
        // const result = res.data; // 백엔드 서버 있을 때만 작동
        const result = tempRegionData;
        setRegionData(result);
        console.log(result);
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
          color: '#1E88E5',
        }}
      >
        <h2>Travel Schedule</h2>
        <div className="addTravelWrap">
          <div className="inputTravel">
            <Form.Item name="city">
              <Cascader
                options={newRegionData}
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
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 10, background: '#1E88E5' }}
            >
              저장
            </Button>
            <Button onClick={handleCancel}>취소</Button>
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
                <Button type="primary" className="addPlanBtn" style={{ background: '#1E88E5' }}>
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
