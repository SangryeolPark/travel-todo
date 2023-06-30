import React, { useEffect, useState } from 'react';
import {
  ColorPickerContainer,
  MapContainer,
  MapImage,
  MapInfo,
  TravelList,
} from '../styles/MapStyle';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderTopLeft, faChevronRight, faDroplet } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { tempRegionData } from '../assets/tempData';
import { ColorPicker } from 'antd';

const Map = () => {
  const { region, regionDetail } = useParams();
  const navigate = useNavigate();
  const [mapData, setMapData] = useState([]);
  const [mapColor, setMapColor] = useState(['#fff', '#000']);
  const [fetchData, setFetchData] = useState({});
  const [regionInfo, setRegionInfo] = useState([]);

  // Map hover 효과
  const hoverItem = item => {
    item.onmouseenter = () => {
      item.style.filter = 'brightness(0.9)';
    };
    item.onmouseout = () => {
      item.style.filter = 'none';
    };
  };

  // 지명 tooltip
  const findRegionName = item => {
    if (!region) {
      return fetchData.region.find(data => data.idRegion == item.id).region;
    } else {
      if (region === '36') {
        return '세종시';
      } else {
        return fetchData.regionDetail.find(data => data.idRegionDetail == item.id).regionDetail;
      }
    }
  };

  // GET 지역 코드 데이터 & Breadcrumb 세팅
  const getRegionCode = async () => {
    // const { data } = await axios.get('/api/todo'); // 백엔드 서버 있을 때만 작동
    const data = tempRegionData;

    // breadcrumb 세팅
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

    setFetchData(data);
  };

  // GET 여행 일정 데이터
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
  //   const { data2 } await
  // };

  useEffect(() => {}, [mapColor]);

  useEffect(() => {
    // getData();

    getRegionCode();
    setMapData(document.querySelectorAll('g > path'));
  }, [region, regionDetail]);

  useEffect(() => {
    mapData.forEach(item => {
      item.innerHTML = `<title>${findRegionName(item)}</title>`;
      item.style.fill = mapColor[0];
      item.style.stroke = mapColor[1];
      item.onclick = () => {
        if (!region) {
          navigate(item.id);
        } else {
          region === '36' ? null : navigate(`${region}/${item.id}`);
        }
      };
      hoverItem(item);
    });
  }, [mapData, mapColor]);

  return (
    <MapContainer>
      <MapImage>
        <MapInfo separator={<FontAwesomeIcon icon={faChevronRight} />} items={regionInfo} />
        <ColorPickerContainer>
          <div>
            <FontAwesomeIcon icon={faDroplet} />
            <ColorPicker
              allowClear={true}
              arrow={true}
              styles={{ popup: { background: 'black' } }}
              value={mapColor[0]}
              onChange={color => setMapColor([color.toHexString(), mapColor[1]])}
              onClear={() => setMapColor(['#fff', mapColor[1]])}
            />
          </div>
          <div>
            <FontAwesomeIcon icon={faBorderTopLeft} />
            <ColorPicker
              allowClear={true}
              value={mapColor[1]}
              onChange={color => setMapColor([mapColor[0], color.toHexString()])}
              onClear={() => setMapColor([mapColor[0], '#000'])}
            />
          </div>
        </ColorPickerContainer>
        <Outlet context={{ region, regionDetail, setMapData }} />
      </MapImage>
      <TravelList>List</TravelList>
    </MapContainer>
  );
};

export default Map;
