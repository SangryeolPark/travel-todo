import styled from '@emotion/styled';

const commonStyle = `
  height: 100%;
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.5);
`;

const MapContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  gap: 15px;
`;

const MapImage = styled.div`
  overflow: auto;
  display: grid;
  place-items: center;
  flex-basis: 750px;
  flex-shrink: 0;
  ${commonStyle};
  padding: 30px;
`;

const TravelList = styled.div`
  ${commonStyle};
  flex-basis: 100%;
`;

const GyeongbukContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const UlreungSVG = styled.svg`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  display: block;
  border: 1.5px solid #000;
  padding-left: 16px;
  padding-top: 18px;
`;

export { commonStyle, MapContainer, MapImage, TravelList, GyeongbukContainer, UlreungSVG };
