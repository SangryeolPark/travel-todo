import React, { useEffect, useState } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import regionComponentData from '../../assets/regionComponentData';

const MapDetail = () => {
  const { region, regionDetail, /* getData, */ setMapData } = useOutletContext();
  const [regionComponent, setRegionComponent] = useState(null);

  useEffect(() => {
    if (regionComponentData[region]) {
      setRegionComponent(regionComponentData[region]);
      // getData(region, regionDetail);
    } else {
      alert('잘못된 접근입니다.');
      setRegionComponent(<Navigate to="/map" />);
    }
  }, [region, regionDetail]);

  useEffect(() => {
    setMapData(document.querySelectorAll('g > path'));
  }, [regionComponent]);

  return <>{regionComponent}</>;
};

export default MapDetail;
