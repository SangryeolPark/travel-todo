import { Collapse } from 'antd';
import React, { useState } from 'react';
import CheckList from './CheckList';
import axios from 'axios';

import { STATUS_LOADING, STATUS_SERVER_ERROR } from '../../App';

const TravelTodo = ({ items }) => {
  const [todoList, setTodoList] = useState(items);
  const [checkListLoading, setCheckListLoading] = useState(STATUS_LOADING);

  const handleCheckList = idSub => {
    const getCheckList = async () => {
      try {
        // 로딩 중 상태
        const loading = todoList.map(todo => {
          return {
            ...todo,
            children: <span>{STATUS_LOADING}</span>,
          };
        });
        setTodoList(loading);

        // 로딩 완료
        const { data } = await axios.get(`/api/map/check?idSub=${idSub[0]}`);
        const result = todoList.map(todo => {
          if (todo.key == idSub) {
            return {
              ...todo,
              children:
                data.length !== 0 ? (
                  <CheckList data={data} />
                ) : (
                  <span>등록된 체크 리스트가 없습니다</span>
                ),
            };
          }
          return todo;
        });
        setTodoList(result);
      } catch (error) {
        // 서버 에러
        console.log(error);
        const result = todoList.map(todo => {
          return {
            ...todo,
            children: <span>{STATUS_SERVER_ERROR}</span>,
          };
        });
        setTodoList(result);
      }
    };

    if (idSub.length !== 0) {
      getCheckList();
    }
  };

  return <Collapse accordion items={todoList} onChange={handleCheckList} />;
};

export default TravelTodo;
