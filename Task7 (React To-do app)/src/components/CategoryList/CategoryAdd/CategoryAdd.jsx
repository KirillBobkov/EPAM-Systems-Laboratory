import React, { Component } from 'react';
import { Button, Input } from '../../primitives';
import './CategoryAdd.css';

export class CategoryAdd extends Component {
  render () {
    return (
      <div className='category-input'>
        <Input type='text' placeholder='Enter category name' />
        <Button text='Add' className='button--with-border' />
      </div>
    );
  }
}
