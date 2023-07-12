import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';

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

import { ColorPicker, Modal, Result, Skeleton } from 'antd';

import PacmanLoader from 'react-spinners/PacmanLoader';

import moment from 'moment';
import axios from 'axios';

import {
  ColorPickerContainer,
  MapContainer,
  MapImage,
  MapInfo,
  TravelListFilter,
  TravelListContainer,
  TravelItemCollapse,
  TodoItemCollapse,
  TravelItemLoading,
  NoMapInfo,
} from '../styles/MapStyle';

import TodoCheck from '../components/map/TodoCheck';
import TextArea from 'antd/es/input/TextArea';

const Map = ({ isDataChanged, setIsDataChanged }) => {
  const navigate = useNavigate();
  const { region, regionDetail } = useParams();
  const [searchParam, setSearchParam] = useSearchParams();
  const filter = searchParam.get('filter');
  const [mapData, setMapData] = useState([]);
  const colorData = JSON.parse(localStorage.getItem('map-color'));
  const [mapColor, setMapColor] = useState(colorData ? colorData : ['#fff', '#000']);
  const [regionData, setRegionData] = useState(null);
  const [regionDataLoading, setRegionDataLoading] = useState('loading');
  const [regionInfo, setRegionInfo] = useState([]);
  const [travelList, setTravelList] = useState(null);
  const [dataLoading, setDataLoading] = useState('loading');
  const { confirm } = Modal;

  const todayDate = moment(Date.now()).format('YYYY-MM-DD');

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
  }, [region, regionDetail, filter]);

  // GET 지역 정보 데이터
  useEffect(() => {
    const getRegionData = async () => {
      try {
        const { data } = await axios.get('/api/map/count');
        setRegionData(data);
      } catch (error) {
        console.log(error);
        setRegionDataLoading('fail');
      }
    };

    getRegionData();
  }, [isDataChanged]);

  // GET 여행 일정 데이터
  useEffect(() => {
    setDataLoading('loading');
    setTravelList(null);
    const getData = async () => {
      let url = regionDetail ? `/${region}/${regionDetail}` : region ? `/${region}` : '';

      try {
        const { data } = await axios.get(`/api/map${url}`);
        let filteredData;
        if (filter === 'plan' || !region) {
          filteredData = data.filter(
            item => item.startDate >= todayDate || item.endDate >= todayDate
          );
        } else if (filter === 'finish') {
          filteredData = data.filter(item => item.endDate < todayDate);
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
                    <span>{item.subTitle}</span>
                  </>
                ),
                children:
                  item.checkList.length !== 0 ? (
                    <TodoCheck data={item.checkList} />
                  ) : (
                    <span>등록된 체크 리스트가 없습니다.</span>
                  ),
              };
            });

            return {
              key: item.detail.idTitle,
              label: (
                <>
                  <span>{item.title}</span>
                  <span className="item-count">
                    {item.detail.subList.length !== 0
                      ? item.detail.subList.filter(item => item.finishYn).length + ' / '
                      : null}
                    {item.detail.subList.length}
                  </span>
                </>
              ),
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
              children: (
                <>
                  {todoData.length !== 0 ? (
                    <TodoItemCollapse accordion items={todoData} expandIconPosition="end" />
                  ) : (
                    <span className="no-todo">등록된 할 일이 없습니다.</span>
                  )}
                  {item.detail.startDate <= todayDate ? (
                    <TextArea
                      style={{
                        marginTop: 15,
                        padding: '9px 13px',
                        resize: 'none',
                        background: 'none',
                        color: '#494949',
                        cursor: 'default',
                      }}
                      className="text-area"
                      value={
                        item.detail.travelReview
                          ? item.detail.travelReview
                          : '등록된 리뷰가 없습니다.'
                      }
                      disabled={true}
                      rows={5}
                    />
                  ) : null}
                </>
              ),
            };
          });
          setDataLoading('success');
          setTravelList(newTravelList);
        }
      } catch (error) {
        setDataLoading('fail');
        console.log(error);
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

  // 지도 렌더링
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

        item.style.fillOpacity = opacityValue;

        item.onclick = () => {
          if (!region) {
            navigate(item.id);
          } else if (region !== '36') {
            navigate(`${region}/${item.id}`);
          }
        };
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
  }, [mapData, regionData, isDataChanged]);

  return (
    <MapContainer>
      <MapImage color={mapColor[0]} stroke={mapColor[1]}>
        {regionData ? (
          <MapInfo separator={<FontAwesomeIcon icon={faChevronRight} />} items={regionInfo} />
        ) : (
          <NoMapInfo>
            {regionDataLoading !== 'fail' ? (
              <PacmanLoader color="#ecf8ff" />
            ) : (
              <Result
                status="error"
                title="서버 통신 실패"
                subTitle="데이터를 불러오는 데 실패하였습니다."
              />
            )}
          </NoMapInfo>
        )}
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
                  filter === 'finish' ? '지난 일정' : <Link to="?filter=finish">지난 일정</Link>,
              },
            ]}
          />
        ) : (
          <span className="list-filter-title">예정된 일정</span>
        )}
        {dataLoading === 'success' ? (
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
          <TravelItemLoading>
            {dataLoading === 'loading' ? (
              [1, 2, 3, 4, 5, 6].map(item => (
                <div key={item} className="item-loading">
                  <Skeleton.Input
                    active={true}
                    style={{ minWidth: 110, width: '40%', height: 23 }}
                  />
                  <Skeleton.Input
                    active={true}
                    style={{ minWidth: 170, width: '60%', height: 16 }}
                  />
                  <FontAwesomeIcon style={{ marginTop: 1.5 }} icon={faChevronDown} />
                </div>
              ))
            ) : (
              <span className="loading-msg">
                <Result
                  status="error"
                  title="서버 통신 실패"
                  subTitle="데이터를 불러오는 데 실패하였습니다."
                />
              </span>
            )}
          </TravelItemLoading>
        )}
      </TravelListContainer>
    </MapContainer>
  );
};

export default Map;
