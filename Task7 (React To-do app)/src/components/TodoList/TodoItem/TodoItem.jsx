import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox } from '../../primitives';
import './TodoItem.scss';

export function TodoItem(props) {
  const { item } = props;

  return (
    <div className='todo-item-container'>
      <div>
        <Checkbox className='checkbox' />
        <span>{item.name}</span>
      </div>
      <Button className='fas fa-edit' />
    </div>
  );
}

TodoItem.propTypes = {
  item: PropTypes.object,
  name: PropTypes.string
};
