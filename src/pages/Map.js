import React, { useEffect, useState } from 'react';
import { MapContainer, MapImage, MapInfo, TravelList } from '../styles/MapStyle';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { tempRegionData } from '../assets/tempData';

const Map = () => {
  const { region, regionDetail } = useParams();
  const navigate = useNavigate();
  const [mapData, setMapData] = useState([]);
  const [mapColor, setMapColor] = useState('yellow');
  const [regionInfo, setRegionInfo] = useState([]);

  const hoverItem = item => {
    item.onmouseenter = () => {
      item.style.filter = 'brightness(0.9)';
    };
    item.onmouseout = () => {
      item.style.filter = 'none';
    };
  };

  // const getData = async () => {
  //   let url;
  //   if (regionDetail) {
  //     url = `/${region}/${regionDetail}`;
  //   } else {
  //     if (!region) {
  //       url = '';
  //     } else {
  //       url = `/${region}`;
  //     }
  //   }
  //   const { data } = await axios.get(`/api/map${url}`);
  // };

  useEffect(() => {
    // getData();

    const getRegionCode = async () => {
      // const { data } = await axios.get('/api/todo'); // 백엔드 서버 있을 때만 작동
      const data = tempRegionData;

      if (regionDetail) {
        setRegionInfo([
          { title: <Link to="/map">대한민국</Link> },
          {
            title: (
              <Link to={region}>
                {data.region.find(item => item.idRegion === parseInt(region)).region}
              </Link>
            ),
          },
          {
            title: data.regionDetail.find(item => item.idRegionDetail === parseInt(regionDetail))
              .regionDetail,
          },
        ]);
      } else {
        if (!region) {
          setRegionInfo([{ title: '대한민국' }]);
        } else {
          setRegionInfo([
            { title: <Link to="/map">대한민국</Link> },
            {
              title: data.region.find(item => item.idRegion === parseInt(region)).region,
            },
          ]);
        }
      }
    };

    getRegionCode();
    setMapData(document.querySelectorAll('g > path'));
  }, [region, regionDetail]);

  useEffect(() => {
    mapData.forEach(item => {
      item.innerHTML = `<title>${item.id}</title>`;
      item.style.fill = mapColor;
      item.onclick = () => {
        if (!region) {
          navigate(item.id);
        } else {
          region === '36' ? null : navigate(`${region}/${item.id}`);
        }
      };
      hoverItem(item);
    });
  }, [mapData]);

  return (
    <MapContainer>
      <MapImage>
        <MapInfo separator={<FontAwesomeIcon icon={faChevronRight} />} items={regionInfo} />
        <Outlet context={{ region, regionDetail, setMapData }} />
      </MapImage>
      <TravelList>
        <h1>List</h1>
      </TravelList>
    </MapContainer>
  );
};

export default Map;
