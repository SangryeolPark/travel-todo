import React, { useState } from 'react';
import TodoCheck from './TodoCheck';
import axios from 'axios';

import { STATUS_LOADING, STATUS_SERVER_ERROR } from '../../App';
import { TodoItemCollapse } from '../../styles/MapStyle';

const TravelTodo = ({ items }) => {
  const [todoList, setTodoList] = useState(items);

  const handleCheckList = idSub => {
    const getCheckList = async () => {
      try {
        // 로딩 중 상태
        const loading = todoList.map(todo => {
          if (todo.key == idSub) {
            return {
              ...todo,
              children: <span>{STATUS_LOADING}</span>,
            };
          } else {
            return { ...todo };
          }
        });
        setTodoList(loading);

        // 로딩 완료
        const { data } = await axios.get(`/api/map/check/${idSub[0]}`);
        const result = todoList.map(todo => {
          if (todo.key == idSub) {
            return {
              ...todo,
              children:
                data.length !== 0 ? (
                  <TodoCheck data={data} />
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

  return (
    <TodoItemCollapse
      accordion
      onChange={handleCheckList}
      items={todoList}
      expandIconPosition="end"
    />
  );
};

export default TravelTodo;
