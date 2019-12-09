import React, { Component } from 'react';
import './TodoAdd.scss';
import { Button, Input } from '../../primitives';

export class TodoAdd extends Component {
  render () {
    return (
      <div className='todo-add'>
        <Input type='text' placeholder='Enter to-do name' />
        <Button text='Add' className='button--with-border' />
      </div>
    );
  }
}
