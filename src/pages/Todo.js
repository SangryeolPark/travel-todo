import React from 'react';
import TodoInput from '../components/todo/TodoInput';
import CreateTravel from './../components/todo/CreateTravel';
import { Input } from 'antd';
import TodoList from '../components/todo/TodoList';

const { TextArea } = Input;

const Todo = ({ data, setData }) => {
  return (
    <div>
      <CreateTravel data={data} setData={setData} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ textAlign: 'start' }}>
          <h2>Travel Plan</h2>
          <TodoList data={data} setData={setData} />
          <TodoInput data={data} setData={setData} />
        </div>

        <div style={{ width: '50%', textAlign: 'start', paddingLeft: 15 }}>
          <h2>Travel Review</h2>
          <TextArea rows={4} style={{ marginTop: 10 }} />
        </div>
      </div>
    </div>
  );
};

export default Todo;
