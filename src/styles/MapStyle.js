import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Breadcrumb } from 'antd';

const commonStyle = `
  height: 100%;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px -2px rgba(0, 0, 0, 0.5);
`;

const fromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const mapAni = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const MapContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  gap: 15px;
  animation: ${fromLeft} 0.5s ease-in-out;
`;

const MapImage = styled.div`
  position: relative;
  overflow: auto;
  display: grid;
  place-items: center;
  /* flex-basis: 750px; */
  flex-basis: 40%;
  flex-shrink: 0;
  ${commonStyle};
  padding: 90px 30px;
  > svg,
  div {
    animation: ${mapAni} 0.5s ease-in-out;
  }
`;

const MapInfo = styled(Breadcrumb)`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 22px;
  font-weight: bold;
  ol {
    align-items: center;
  }
  .ant-breadcrumb-separator {
    font-size: 14px;
  }
  .ant-breadcrumb-link > a {
    height: 100%;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: #1e88e5;
      background: rgba(30, 136, 229, 0.2);
    }
  }
`;

const ColorPickerContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 30px;
  > div {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    .ant-color-picker-clear {
      &::after {
        display: none;
      }
    }
    &:nth-of-type(1) {
      .ant-color-picker-clear {
        background: #fff;
      }
    }
    &:nth-of-type(2) {
      .ant-color-picker-clear {
        background: #000;
      }
    }
  }
`;

const TravelList = styled.div`
  ${commonStyle};
  flex-basis: 60%;
`;

const GyeongbukContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const UlreungSVG = styled.svg`
  position: absolute;
  top: 5%;
  right: 0;
  max-width: 70px;
  max-height: 70px;
  width: 100%;
  height: 100%;
  border: 1.5px solid #000;
  padding-left: 16px;
  padding-top: 18px;
`;

export {
  commonStyle,
  fromLeft,
  mapAni,
  MapContainer,
  MapImage,
  MapInfo,
  ColorPickerContainer,
  TravelList,
  GyeongbukContainer,
  UlreungSVG,
};
