import React, { useEffect, useState } from 'react';
import {
  ColorPickerContainer,
  MapContainer,
  MapImage,
  MapInfo,
  TravelListFilter,
  TravelListContainer,
} from '../styles/MapStyle';
import { Link, Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderTopLeft, faChevronRight, faDroplet } from '@fortawesome/free-solid-svg-icons';
import { Collapse, ColorPicker } from 'antd';
import axios from 'axios';

import { STATUS_LOADING, STATUS_SERVER_ERROR } from '../App';

import TravelTodo from '../components/map/TravelTodo';

const Map = () => {
  const navigate = useNavigate();
  const { region, regionDetail } = useParams();
  const { regionData, regionDataLoading } = useOutletContext();
  const [mapData, setMapData] = useState([]);
  const colorData = JSON.parse(localStorage.getItem('map-color'));
  const [mapColor, setMapColor] = useState(colorData ? colorData : ['#fff', '#000']);
  const [regionInfo, setRegionInfo] = useState([]);
  const [travelList, setTravelList] = useState(null);
  const [travelListLoading, setTravelListLoading] = useState(STATUS_LOADING);

  const handleTodoList = idTitle => {
    const getTodoList = async () => {
      try {
        // 로딩 중 상태
        const loading = travelList.map(travel => {
          return {
            ...travel,
            children: <span>{STATUS_LOADING}</span>,
          };
        });
        setTravelList(loading);

        // 로딩 완료
        const { data } = await axios.get(`/api/map/sub?idTitle=${idTitle}`);
        const newData = data.map(item => {
          return {
            key: item.idSub,
            label: item.subTitle,
            complete: JSON.stringify(item.finishYn),
          };
        });

        const result = travelList.map(travel => {
          if (travel.key == idTitle) {
            return {
              ...travel,
              children:
                newData.length !== 0 ? (
                  <TravelTodo items={newData} />
                ) : (
                  <span>등록된 할 일이 없습니다.</span>
                ),
            };
          }
          return travel;
        });
        setTravelList(result);
      } catch (error) {
        // 서버 에러
        console.log(error);
        const result = travelList.map(travel => {
          return {
            ...travel,
            children: <span>{STATUS_SERVER_ERROR}</span>,
          };
        });
        setTravelList(result);
      }
    };

    if (idTitle) {
      getTodoList();
    }
  };

  useEffect(() => {
    // GET 여행 일정 데이터
    const getData = async () => {
      setTravelList(null);
      let url;
      if (regionDetail) {
        url = `/${region}/${regionDetail}`;
      } else {
        if (!region) {
          url = '';
        } else {
          url = `/${region}`;
        }
      }

      try {
        const { data } = await axios.get(`/api/map${url}`);
        const result = data.map(item => {
          return {
            key: item.idTitle,
            label: item.title,
            extra: <span>{`${item.startDate} ~ ${item.endDate}`}</span>,
          };
        });
        setTravelList(result);
      } catch (error) {
        console.log(error);
        setTravelListLoading(STATUS_SERVER_ERROR);
      }
    };

    getData();
  }, [region, regionDetail]);

  useEffect(() => {
    localStorage.setItem('map-color', JSON.stringify(mapColor));
  }, [mapColor]);

  useEffect(() => {
    setMapData(document.querySelectorAll('g > path'));
  }, [region, regionDetail, regionData]);

  useEffect(() => {
    // MapContainer 세팅
    const renderMapContainer = () => {
      // 지명 Tooltip
      const findRegionName = item => {
        if (!region) {
          return regionData.region.find(data => data.idRegion == item.id).region;
        } else {
          if (region === '36') {
            return '세종시';
          } else {
            return regionData.regionDetail.find(data => data.idRegionDetail == item.id)
              .regionDetail;
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

      // Breadcrumb
      if (regionDetail) {
        setRegionInfo([
          { title: <Link to="/map">대한민국</Link> },
          {
            title: (
              <Link to={region}>
                {regionData.region.find(item => item.idRegion === parseInt(region)).region}
              </Link>
            ),
          },
          {
            title: regionData.regionDetail.find(
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
              title: regionData.region.find(item => item.idRegion === parseInt(region)).region,
            },
          ]);
        }
      }
    };

    if (regionData) {
      renderMapContainer();
    }
  }, [mapData, mapColor, regionData]);

  return (
    <MapContainer>
      <MapImage>
        {regionData ? (
          <>
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
          </>
        ) : (
          <span>{regionDataLoading}</span>
        )}
      </MapImage>
      <TravelListContainer>
        {region ? (
          <TravelListFilter
            separator=" "
            items={[{ title: <Link>예정</Link> }, { title: <Link>완료</Link> }]}
          />
        ) : (
          <TravelListFilter separator=" " items={[{ title: <Link>예정</Link> }]} />
        )}
        {travelList ? (
          travelList.length !== 0 ? (
            <Collapse
              accordion
              onChange={idTitle => handleTodoList(idTitle[0])}
              items={travelList}
            />
          ) : (
            <span>등록된 할 일이 없습니다.</span>
          )
        ) : (
          <span style={{ display: 'block', height: '100%', justifyContent: 'center' }}>
            {travelListLoading}
          </span>
        )}
      </TravelListContainer>
    </MapContainer>
  );
};

export default Map;
