import React from 'react';
import { MapContainer, MapImage, TravelList } from '../styles/MapStyle';
import Korea from '../components/map/Korea';
import { useParams } from 'react-router-dom';

const Map = () => {
  // const { region } = useParams();

  return (
    <MapContainer>
      <MapImage>{<Korea />}</MapImage>
      <TravelList>
        <h1>Test</h1>
      </TravelList>
    </MapContainer>
  );
};

export default Map;
