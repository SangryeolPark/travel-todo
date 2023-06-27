import React, { useEffect, useState } from 'react';
import { MapContainer, MapImage, TravelList } from '../styles/MapStyle';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const Map = () => {
  const { region } = useParams();
  const navigate = useNavigate();
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    setMapData(document.querySelectorAll('path'));
  }, [region]);

  useEffect(() => {
    mapData.forEach(item => {
      item.onclick = e => {
        if (!region) {
          e.target.id === '36' ? alert(e.target.id) : navigate(e.target.id); // 세종시는 상세 지도 X
        } else {
          alert(e.target.id);
        }
      };
    });
  }, [mapData]);

  return (
    <MapContainer>
      <MapImage>
        <Outlet context={{ region, setMapData }} />
      </MapImage>
      <TravelList>
        <h1>List</h1>
      </TravelList>
    </MapContainer>
  );
};

export default Map;
