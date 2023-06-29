import React, { useEffect, useState } from 'react';
import { MapContainer, MapImage, TravelList } from '../styles/MapStyle';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb } from 'antd';
// import axios from 'axios';

const Map = () => {
  const { region, regionDetail } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mapData, setMapData] = useState([]);
  const [mapColor, setMapColor] = useState('yellow');
  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
    setMapData(document.querySelectorAll('g > path'));
  }, [region]);

  useEffect(() => {
    const pathData = pathname.split('/');
    switch (pathData.length) {
      case 2:
        setBreadcrumb([{ title: <Link to="/map">대한민국</Link> }]);
        break;
      case 3:
        setBreadcrumb([
          { title: <Link to="/map">대한민국</Link> },
          { title: <Link to={`${pathData[2]}`}>{pathData[2]}</Link> },
        ]);
        break;
      case 4:
        setBreadcrumb([
          { title: <Link to="/map">대한민국</Link> },
          { title: <Link to={`${pathData[2]}`}>{pathData[2]}</Link> },
          { title: pathData[3] },
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
        <Breadcrumb items={breadcrumb} />
        <Outlet context={{ region, regionDetail, /* getData, */ setMapData }} />
      </MapImage>
      <TravelList>
        <h1>List</h1>
      </TravelList>
    </MapContainer>
  );
};

export default Map;
