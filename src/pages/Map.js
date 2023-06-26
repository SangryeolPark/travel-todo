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
          navigate(e.target.id);
        } else {
          console.log(e.target.id);
        }
      };
    });
  }, [mapData]);

  return (
    <MapContainer>
      <MapImage>
        <Outlet context={{ region, mapData, setMapData }} />
      </MapImage>
      <TravelList>
        <h1>Test</h1>
      </TravelList>
    </MapContainer>
  );
};

export default Map;
