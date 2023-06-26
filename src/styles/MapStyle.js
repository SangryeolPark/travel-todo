import styled from '@emotion/styled';

const commonStyle = `
  height: 100%;
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.5);
`;

const MapContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;
`;

const MapImage = styled.div`
  overflow: auto;
  display: grid;
  place-items: center;
  width: 55%;
  ${commonStyle};
`;

const TravelList = styled.div`
  width: 45%;
  ${commonStyle};
`;

export { MapContainer, MapImage, TravelList };
