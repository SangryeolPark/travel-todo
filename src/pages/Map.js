import React, { useEffect, useState } from 'react';
import { MapContainer, MapImage, TravelList } from '../styles/MapStyle';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const Map = () => {
  const { region } = useParams();
  const navigate = useNavigate();
  const [mapData, setMapData] = useState([]);
  const [mapColor, setMapColor] = useState('yellow');

  useEffect(() => {
    setMapData(document.querySelectorAll('g > path'));
  }, [region]);

  const hoverItem = item => {
    item.onmouseenter = e => {
      e.target.style.filter = 'brightness(0.9)';
    };
    item.onmouseout = e => {
      e.target.style.filter = 'none';
    };
  };

  useEffect(() => {
    mapData.forEach(item => {
      item.style.fill = mapColor;
      item.onclick = e => {
        if (!region) {
          // 상세 지역 아닐 때
          e.target.id === '36' ? alert(e.target.id) : navigate(e.target.id); // 세종시는 상세 지도 X
        } else {
          alert(e.target.id);
        }
      };
      hoverItem(item);
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
