import React from 'react';
import title from '../assets/logotitle.png';
import logoImg from '../assets/logoimg.png';
import { HomeDiv } from '../styles/HomeStyle';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <HomeDiv>
      <img src={title} className="title" />
      <div className="bottom">
        <Link to="/map">
          <Button type="primary">Get Started!</Button>
        </Link>
        <img src={logoImg} alt="" className="logoImg" />
      </div>
    </HomeDiv>
  );
};

export default Home;
