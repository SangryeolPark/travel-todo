import React from 'react';
import TodoInput from '../components/todo/TodoInput';
import TodoItem from '../components/todo/TodoItem';
import CreateTravel from './../components/todo/CreateTravel';
import { Input } from 'antd';

const { TextArea } = Input;

const Todo = ({ data, setData }) => {
  return (
    <div>
      <CreateTravel data={data} setData={setData} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ textAlign: 'start' }}>
          <div>Travel Plan</div>
          <TodoItem data={data} setData={setData} />
          <TodoInput data={data} setData={setData} />
        </div>

        <div style={{ width: '50%', textAlign: 'start', paddingLeft: 15 }}>
          <div>Travel Review</div>
          <TextArea rows={4} style={{ marginTop: 10 }} />
        </div>
      </div>
    </div>
  );
};

export default Todo;
