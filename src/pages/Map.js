import React, { useEffect, useState } from 'react';
import { MapContainer, MapImage, MapInfo, TravelList } from '../styles/MapStyle';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// import axios from 'axios';

const Map = () => {
  const { region, regionDetail } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mapData, setMapData] = useState([]);
  const [mapColor, setMapColor] = useState('yellow');
  const [regionCodeData, setRegionCodeData] = useState({});
  const [regionInfo, setRegionInfo] = useState([]);

  useEffect(() => {
    const getRegionData = async () => {
      const { data } = await axios.get('/api/todo');
      setRegionCodeData(data);
    };
    getRegionData();
  }, []);

  useEffect(() => {
    setMapData(document.querySelectorAll('g > path'));
  }, [region]);

  useEffect(() => {
    const pathData = pathname.split('/');
    switch (pathData.length) {
      case 2:
        setRegionInfo([{ title: '대한민국' }]);
        break;
      case 3:
        setRegionInfo([
          { title: <Link to="/map">대한민국</Link> },
          {
            title: regionCodeData.region.find(item => item.idRegion === parseInt(pathData[2]))
              .region,
          },
        ]);
        break;
      case 4:
        setRegionInfo([
          { title: <Link to="/map">대한민국</Link> },
          {
            title: (
              <Link to={`${pathData[2]}`}>
                {regionCodeData.region.find(item => item.idRegion === parseInt(pathData[2])).region}
              </Link>
            ),
          },
          {
            title: regionCodeData.regionDetail.find(
              item => item.idRegionDetail === parseInt(pathData[3])
            ).regionDetail,
          },
        ]);
    }
  }, [pathname]);

  const hoverItem = item => {
    item.onmouseenter = () => {
      item.style.filter = 'brightness(0.9)';
    };
    item.onmouseout = () => {
      item.style.filter = 'none';
    };
  };

  // const getData = async (region, regionDetail) => {
  //   let res;
  //   if (regionDetail) {
  //     res = await axios.get(`/map/${region}/${regionDetail}`);
  //     console.log(res.data);
  //   } else {
  //     res = await axios.get(`/map/${region}`);
  //     console.log(res.data);
  //   }
  // };

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
        <Outlet context={{ region, regionDetail, /* getData, */ setMapData }} />
      </MapImage>
      <TravelList>
        <h1>List</h1>
      </TravelList>
    </MapContainer>
  );
};

export default Map;
