import React, { useEffect, useState } from 'react';
import { Link, Navigate, useOutletContext } from 'react-router-dom';
import { BackButton } from '../../styles/MapStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import regionComponentData from '../../assets/regionComponentData';

const MapDetail = () => {
  const { region, regionDetail, /* getData, */ setMapData, breadcrumb, setBreadcrumb } =
    useOutletContext();
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

  return (
    <>
      {/* <BackButton>
        <FontAwesomeIcon icon={faChevronLeft} />
      </BackButton> */}
      {regionComponent}
    </>
  );
};

export default MapDetail;
