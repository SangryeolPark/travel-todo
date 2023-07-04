import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Breadcrumb, Collapse } from 'antd';

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
  flex-basis: 60%;
  flex-shrink: 0;
  height: 100%;
  padding: 80px 30px;
  > svg {
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

const TravelListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.5);
  flex-basis: 40%;
`;

const TravelListFilter = styled(Breadcrumb)`
  font-size: 22px;
  font-weight: bold;
  padding: 10px;
  /* padding-bottom: 5px; */
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

const TravelItemCollapse = styled(Collapse)`
  background: #fff;
  overflow: auto;
  height: 100%;
  border: none;
  border-radius: 0;
  padding: 5px 10px 10px;
  > .ant-collapse-item {
    margin-bottom: 15px;
    position: relative;
    padding: 15px;
    padding-bottom: 10px;
    border-bottom: none;
    border-radius: 5px;
    box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.3);
    &:last-child {
      border-radius: 5px;
      margin-bottom: 0;
    }
    > .ant-collapse-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      padding: 0;
      position: static;
      padding-inline-start: 0;
      line-height: normal;
      > .ant-collapse-header-text {
        color: #000;
        font-size: 18px;
        font-weight: bold;
      }
      > .ant-collapse-expand-icon {
        order: 1;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-inline-end: 0;
        margin-inline-start: 0;
        margin-top: 5px;
        > svg {
          transition: all 0.2s ease-in-out;
          font-size: 18px;
        }
      }
      > .ant-collapse-extra {
        width: 100%;
        > div {
          display: flex;
          gap: 10px;
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 18px;
        }
      }
    }
    > .ant-collapse-content {
      border-top: none;
      padding: 10px 0 5px;
      > .ant-collapse-content-box {
        padding: 0;
      }
    }
  }
`;

export {
  fromLeft,
  mapAni,
  MapContainer,
  MapImage,
  MapInfo,
  ColorPickerContainer,
  TravelListContainer,
  TravelListFilter,
  TravelItemCollapse,
};
