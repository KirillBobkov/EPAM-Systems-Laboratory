import React from 'react';

import { Button, Checkbox } from '../../primitives';
import './TodoItem.scss';

export function TodoItem(props) {
  return (
    <div className='todo-item-container'>
      <div>
        <label>
          <Checkbox className='checkbox checkbox--margin' />
          <span className='todo-item-name'>{props.item.name}</span>
        </label>
      </div>
      <Button className='fas fa-edit' />
    </div>
  );
}
