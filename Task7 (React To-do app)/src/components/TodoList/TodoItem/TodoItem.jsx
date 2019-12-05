import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox } from '../../primitives';
import './TodoItem.scss';

export function TodoItem(props) {
  const { item } = props;

  return (
    <div className='todo-item-container'>
      <div>
        <label>
          <Checkbox className='checkbox checkbox--margin' id={item.name} />
          <span>{item.name}</span>
        </label>
      </div>
      <Button className='fas fa-edit' />
    </div>
  );
}

TodoItem.propTypes = {
  item: PropTypes.object,
  name: PropTypes.string
};
