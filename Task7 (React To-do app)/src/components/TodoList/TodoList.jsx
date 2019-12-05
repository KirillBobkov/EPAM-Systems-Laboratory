import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';
import { TodoAdd } from './TodoAdd';
import './TodoList.scss';

export function TodoList(props) {
  const itemElements = props.data.map((item) =>
    <li key={item.id}><TodoItem item={item} /></li>
  );

  return (
    <div className='todo-list-container'>
      <TodoAdd />
      <ul className='todo-list'>
        {itemElements}
      </ul>
    </div>
  );
}

TodoList.propTypes = {
  data: PropTypes.array
};
