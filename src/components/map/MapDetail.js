import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import regionData from '../../assets/regionData';

const MapDetail = () => {
  const { region, setMapData } = useOutletContext();
  const navigate = useNavigate();
  const [regionComponent, setRegionComponent] = useState(null);

  useEffect(() => {
    if (regionData[region]) {
      setRegionComponent(regionData[region]);
    } else {
      alert('잘못된 접근입니다.');
      navigate('/map');
    }
  }, []);

  useEffect(() => {
    setMapData(document.querySelectorAll('path'));
  }, [regionComponent]);

  return <>{regionComponent}</>;
};

export default MapDetail;
