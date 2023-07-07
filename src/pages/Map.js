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

import { ColorPicker, Modal } from 'antd';
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
  TodoItemCollapse,
} from '../styles/MapStyle';

import moment from 'moment';
import TodoCheck from '../components/map/TodoCheck';

const Map = ({ isDataChanged, setIsDataChanged }) => {
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
  const { confirm } = Modal;

  const handleRemove = idTitle => {
    confirm({
      title: '일정 삭제',
      content: (
        <>
          <p>삭제한 일정은 복구할 수 없습니다.</p>
          <p>정말 삭제하시겠습니까?</p>
        </>
      ),
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      centered: true,
      async onOk() {
        try {
          await axios.patch(`/api/todo/${idTitle}`);
          setIsDataChanged(prevState => !prevState);
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  useEffect(() => {
    if (region && region !== 36 && !filter) {
      searchParam.set('filter', 'plan');
      setSearchParam(searchParam);
    }
  }, [region, regionDetail, searchParam]);

  useEffect(() => {
    // GET 여행 일정 데이터
    const getData = async () => {
      let url = regionDetail ? `/${region}/${regionDetail}` : region ? `/${region}` : '';

      try {
        const { data } = await axios.get(`/api/map${url}`);
        let filteredData;
        if (filter === 'plan' || !region) {
          filteredData = data.filter(
            item =>
              item.startDate >= moment(Date.now()).format('YYYY-MM-DD') ||
              item.endDate >= moment(Date.now()).format('YYYY-MM-DD')
          );
        } else if (filter === 'finish') {
          filteredData = data.filter(
            item => item.endDate < moment(Date.now()).format('YYYY-MM-DD')
          );
        }

        if (filteredData) {
          const result = await Promise.all(
            filteredData.map(async item => {
              return { title: item.title, detail: await getDetailData(item.idTitle) };
            })
          );
          const newTravelList = result.map(item => {
            const todoData = item.detail.subList.map(item => {
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
                children:
                  item.checkList !== 0 ? (
                    <TodoCheck data={item.checkList} />
                  ) : (
                    <span>등록된 체크 리스트가 없습니다.</span>
                  ),
              };
            });

            return {
              key: item.detail.idTitle,
              label: item.title,
              extra: (
                <>
                  <span>{`${item.detail.startDate} ~ ${item.detail.endDate}`}</span>
                  <div>
                    <FontAwesomeIcon
                      onClick={() =>
                        navigate(`/todo/${item.detail.idTitle}`, { state: item.detail.idTitle })
                      }
                      icon={faPencil}
                    />
                    <FontAwesomeIcon
                      onClick={() => handleRemove(item.detail.idTitle)}
                      icon={faTrashCan}
                    />
                  </div>
                </>
              ),
              children:
                todoData.length !== 0 ? (
                  <TodoItemCollapse accordion items={todoData} expandIconPosition="end" />
                ) : (
                  <span className="no-todo">등록된 할 일이 없습니다.</span>
                ),
            };
          });
          setTravelList(newTravelList);
        }
      } catch (error) {
        console.log(error);
        setTravelListLoading(STATUS_SERVER_ERROR);
      }
    };

    const getDetailData = async idTitle => {
      try {
        const { data } = await axios.get(`/api/todo/${idTitle}`);
        return data;
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [region, regionDetail, filter, isDataChanged]);

  useEffect(() => {
    localStorage.setItem('map-color', JSON.stringify(mapColor));
  }, [mapColor]);

  useEffect(() => {
    setMapData(document.querySelectorAll('g > path'));
  }, [region, regionDetail, regionData]);

  useEffect(() => {
    const findRegionName = item => {
      if (!region) {
        return regionData.region.find(data => data.idRegion == item.id).region;
      } else {
        if (region === '36') {
          return '세종시';
        } else {
          return regionData.regionDetail.find(data => data.idRegionDetail == item.id).regionDetail;
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
    // MapContainer 세팅
    const renderMapContainer = () => {
      mapData.forEach(item => {
        // 지명 Tooltip
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
          } else if (region !== '36') {
            navigate(`${region}/${item.id}`);
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
      } else if (!region) {
        setRegionInfo([{ title: '대한민국' }]);
      } else {
        setRegionInfo([
          { title: <Link to="/map">대한민국</Link> },
          {
            title: regionData.region.find(item => item.idRegion === parseInt(region)).region,
          },
        ]);
      }
    };

    if (regionData) {
      renderMapContainer();
    }
  }, [mapData, mapColor, regionData, isDataChanged]);

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
