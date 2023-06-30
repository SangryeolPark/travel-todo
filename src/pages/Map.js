import React, { useEffect, useState } from 'react';
import {
  ColorPickerContainer,
  MapContainer,
  MapImage,
  MapInfo,
  TravelList,
} from '../styles/MapStyle';
import { Link, Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderTopLeft, faChevronRight, faDroplet } from '@fortawesome/free-solid-svg-icons';
import { ColorPicker } from 'antd';
import { render } from '@fullcalendar/core/preact';

const Map = () => {
  const navigate = useNavigate();
  const { region, regionDetail } = useParams();
  const { regionCode } = useOutletContext();
  const [mapData, setMapData] = useState([]);
  const [mapColor, setMapColor] = useState(['#fff', '#000']);
  const [regionInfo, setRegionInfo] = useState([]);

  // MapContainer 세팅
  const renderMapContainer = () => {
    // 지명 Tooltip
    const findRegionName = item => {
      if (!region) {
        return regionCode.region.find(data => data.idRegion == item.id).region;
      } else {
        if (region === '36') {
          return '세종시';
        } else {
          return regionCode.regionDetail.find(data => data.idRegionDetail == item.id).regionDetail;
        }
      }
    };

    // Map hover 효과
    const hoverItem = item => {
      item.onmouseenter = () => {
        item.style.filter = 'brightness(0.9)';
      };
      item.onmouseout = () => {
        item.style.filter = 'none';
      };
    };

    mapData.forEach(item => {
      item.innerHTML = `<title>${findRegionName(item)}</title>`;
      item.style.fill = mapColor[0];
      item.style.stroke = mapColor[1];
      item.style.transition = 'all 0.2s ease-in-out';
      item.onclick = () => {
        if (!region) {
          navigate(item.id);
        } else {
          region === '36' ? null : navigate(`${region}/${item.id}`);
        }
      };
      hoverItem(item);
    });

    if (regionDetail) {
      setRegionInfo([
        { title: <Link to="/map">대한민국</Link> },
        {
          title: (
            <Link to={region}>
              {regionCode.region.find(item => item.idRegion === parseInt(region)).region}
            </Link>
          ),
        },
        {
          title: regionCode.regionDetail.find(
            item => item.idRegionDetail === parseInt(regionDetail)
          ).regionDetail,
        },
      ]);
    } else {
      if (!region) {
        setRegionInfo([{ title: '대한민국' }]);
      } else {
        setRegionInfo([
          { title: <Link to="/map">대한민국</Link> },
          {
            title: regionCode.region.find(item => item.idRegion === parseInt(region)).region,
          },
        ]);
      }
    }
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
  // };

  useEffect(() => {
    setMapData(document.querySelectorAll('g > path'));
  }, [region, regionDetail]);

  useEffect(() => {
    if (regionCode) {
      renderMapContainer();
    }
  }, [mapData, mapColor, regionCode]);

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
        <Outlet context={{ regionCode, region, regionDetail, setMapData }} />
      </MapImage>
      <TravelList>List</TravelList>
    </MapContainer>
  );
};

export default Map;
