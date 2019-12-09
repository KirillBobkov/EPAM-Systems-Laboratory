import React, { Component } from 'react';
import { Button, Input } from '../../primitives';
import './CategoryAdd.scss';

export class CategoryAdd extends Component {
  render () {
    return (
      <div className='category-input'>
        <Input id='categoryInputAdd' type='text' placeholder='Enter category name' />
        <Button id='categoryButtonAdd' text='Add' className='button--with-border' />
      </div>
    );
  }
}
