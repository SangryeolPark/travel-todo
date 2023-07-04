import { faChevronDown, faChevronUp, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { TravelItemContainer } from '../../styles/MapStyle';
import { Collapse } from 'antd';
import CheckList from './CheckList';
import axios from 'axios';

const TravelItem = ({ info }) => {
  const [expand, setExpand] = useState(false);
  const [todoList, setTodoList] = useState(null);

  const handleExpand = () => {
    const getTodo = async () => {
      try {
        const { data } = await axios.get(`/api/map/sub?idTitle=${info.idTitle}`);
        const result = data.map(item => {
          return {
            key: item.idSub,
            label: item.subTitle,
            complete: JSON.stringify(item.finishYn),
          };
        });
        setTodoList(result);
      } catch (error) {
        console.log(error);
      }
    };
    getTodo();
    setExpand(true);
  };

  const handleCheckList = idSub => {
    const temp = todoList.map(todo => {
      return {
        ...todo,
        children: <span>로딩 중...</span>,
      };
    });
    setTodoList(temp);

    const getCheckList = async () => {
      try {
        const { data } = await axios.get(`/api/map/check?idSub=${idSub[0]}`);
        const result = todoList.map(todo => {
          if (todo.key == idSub) {
            return {
              ...todo,
              children: <CheckList data={data} />,
            };
          }
          return todo;
        });
        setTodoList(result);
      } catch (error) {
        console.log(error);
      }
    };

    if (idSub.length !== 0) {
      getCheckList();
    }
  };

  return (
    info && (
      <TravelItemContainer>
        <div className="title-container">
          <span className="travel-title">{info.title}</span>
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>
        <span className="travel-date">{`${info.startDate} ~ ${info.endDate}`}</span>
        {expand &&
          (todoList ? (
            todoList.length !== 0 ? (
              <Collapse
                accordion
                expandIconPosition="end"
                onChange={idSub => handleCheckList(idSub)}
                items={todoList}
              />
            ) : (
              <span>등록된 할 일이 없습니다.</span>
            )
          ) : (
            <span>로딩 중...</span>
          ))}
        <div className="expand-btn">
          <FontAwesomeIcon
            onClick={expand ? () => setExpand(false) : handleExpand}
            icon={expand ? faChevronUp : faChevronDown}
          />
        </div>
      </TravelItemContainer>
    )
  );
};

export default TravelItem;
