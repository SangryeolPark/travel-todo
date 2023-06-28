import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const commonStyle = `
  height: 100%;
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.5);
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
  padding: 30px;
  > svg,
  div {
    animation: ${mapAni} 0.5s ease-in-out;
  }
`;

// const BackButton = styled(Link)`
//   position: absolute;
//   top: 30px;
//   left: 30px;
//   border: none;
//   background: none;
//   font-size: 30px;
//   color: #1e88e5;
//   transition: all 0.2s ease-in-out;
//   &:hover {
//     color: #1e88e5;
//     filter: brightness(0.5);
//   }
// `;

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
  top: 10%;
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
  TravelList,
  GyeongbukContainer,
  UlreungSVG,
};
