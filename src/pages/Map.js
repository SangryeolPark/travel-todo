import React, { useEffect, useState } from 'react';
import {
  Link,
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBorderTopLeft,
  faChevronDown,
  faChevronRight,
  faDroplet,
  faPencil,
  faSquareCheck,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

import { ColorPicker } from 'antd';
import axios from 'axios';

import { STATUS_LOADING, STATUS_SERVER_ERROR } from '../App';
import {
  ColorPickerContainer,
  MapContainer,
  MapImage,
  MapInfo,
  TravelListFilter,
  TravelListContainer,
  TravelItemCollapse,
} from '../styles/MapStyle';

import TravelTodo from '../components/map/TravelTodo';
import moment from 'moment';

const Map = () => {
  const navigate = useNavigate();
  const { region, regionDetail } = useParams();
  const [searchParam, setSearchParam] = useSearchParams();
  const filter = searchParam.get('filter');
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
          if (travel.key == idTitle) {
            return {
              ...travel,
              children: <span>{STATUS_LOADING}</span>,
            };
          } else {
            return { ...travel };
          }
        });
        setTravelList(loading);

        // 로딩 완료
        const { data } = await axios.get(`/api/map/sub/${idTitle}`);
        const newData = data.map(item => {
          return {
            key: item.idSub,
            label: (
              <>
                {item.finishYn ? (
                  <FontAwesomeIcon icon={faSquareCheck} />
                ) : (
                  <FontAwesomeIcon icon={faSquare} />
                )}
                {item.subTitle}
              </>
            ),
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
                  <span className="no-todo">등록된 할 일이 없습니다.</span>
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

  const handleRemove = async idTitle => {
    try {
      await axios.delete(`/api/todo/${idTitle}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (region && region !== 36 && !filter) {
      searchParam.set('filter', 'plan');
      setSearchParam(searchParam);
    }

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
        if (filter === 'plan' || !region) {
          const filteredData = data.filter(
            item =>
              item.startDate >= moment(Date.now()).format('YYYY-MM-DD') ||
              item.endDate >= moment(Date.now()).format('YYYY-MM-DD')
          );
          const result = filteredData.map(item => {
            return {
              key: item.idTitle,
              label: item.title,
              extra: (
                <>
                  <span>{`${item.startDate} ~ ${item.endDate}`}</span>
                  <div>
                    <FontAwesomeIcon
                      // onClick={() =>
                      //   navigate(`/todo/${item.idTitle}`, { state: item.idTitle })
                      // }
                      icon={faPencil}
                    />
                    <FontAwesomeIcon
                      /* onClick={() => handleRemove(item.idTitle)} */ icon={faTrashCan}
                    />
                  </div>
                </>
              ),
            };
          });
          setTravelList(result);
        } else if (filter == 'finish') {
          const filteredData = data.filter(
            item => item.endDate < moment(Date.now()).format('YYYY-MM-DD')
          );
          const result = filteredData.map(item => {
            return {
              key: item.idTitle,
              label: item.title,
              extra: (
                <>
                  <span>{`${item.startDate} ~ ${item.endDate}`}</span>
                  <div>
                    <FontAwesomeIcon icon={faPencil} />
                    <FontAwesomeIcon icon={faTrashCan} />
                  </div>
                </>
              ),
            };
          });
          setTravelList(result);
        }
      } catch (error) {
        console.log(error);
        setTravelListLoading(STATUS_SERVER_ERROR);
      }
    };

    getData();
  }, [region, regionDetail, filter]);

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

      const findRegionCount = item => {
        if (!region) {
          return regionData.region.find(data => data.idRegion == item.id).count;
        } else {
          if (region === '36') {
            return regionData.region.find(data => data.idRegion == 36).count;
          }
          return regionData.regionDetail.find(data => data.idRegionDetail == item.id).count;
        }
      };

      const findRegionTotalCount = () => {
        if (!region || region === '36') {
          return regionData.totalCount;
        } else {
          return regionData.region.find(data => data.idRegion == region).count;
        }
      };

      // Map hover 효과
      const hoverItem = item => {
        item.onmouseenter = () => {
          item.style.filter = 'brightness(1.2)';
        };
        item.onmouseout = () => {
          item.style.filter = 'none';
        };
      };

      mapData.forEach(item => {
        item.innerHTML = `<title>${findRegionName(item)}</title>`;
        // 방문 비율
        const visitRate = (findRegionCount(item) / findRegionTotalCount()) * 100;

        let opacityValue;
        if (!visitRate || visitRate < 5) {
          opacityValue = 0.4;
        } else if (visitRate < 20) {
          opacityValue = 0.6;
        } else if (visitRate < 35) {
          opacityValue = 0.8;
        } else {
          opacityValue = 1.0;
        }

        item.style.fill = mapColor[0];
        item.style.stroke = mapColor[1];
        item.style.fillOpacity = opacityValue;
        item.style.transition = 'filter 0.2s ease-in-out';

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
            items={[
              {
                title:
                  filter === 'plan' ? '예정된 일정' : <Link to="?filter=plan">예정된 일정</Link>,
              },
              {
                title:
                  filter === 'finish' ? (
                    '완료된 일정'
                  ) : (
                    <Link to="?filter=finish">완료된 일정</Link>
                  ),
              },
            ]}
          />
        ) : (
          <span className="list-filter-title">예정된 일정</span>
        )}
        {travelList ? (
          travelList.length !== 0 ? (
            <TravelItemCollapse
              accordion
              expandIcon={({ isActive }) => (
                <FontAwesomeIcon icon={faChevronDown} rotation={isActive ? 180 : 0} />
              )}
              collapsible="icon"
              onChange={idTitle => handleTodoList(idTitle[0])}
              items={travelList}
            />
          ) : (
            <span className="loading-msg">등록된 일정이 없습니다.</span>
          )
        ) : (
          <span className="loading-msg">{travelListLoading}</span>
          // <TravelItemLoading>
          //   <div className="item-loading" />
          //   <div className="item-loading" />
          //   <div className="item-loading" />
          //   <div className="item-loading" />
          //   <div className="item-loading" />
          //   <div className="item-loading" />
          // </TravelItemLoading>
        )}
      </TravelListContainer>
    </MapContainer>
  );
};

export default Map;
