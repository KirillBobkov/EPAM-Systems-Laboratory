
import React, { Component } from 'react';
import { Checkbox } from '../../components/primitives/Checkbox';
import { Input } from '../../components/primitives/Input';
import { Button } from '../../components/primitives/Button';
import './Toolbar.scss';

export class Toolbar extends Component {
  render () {
    return (
      <div className='search-bar'>
        <label><Checkbox id='search' className='checkbox' />Show done</label>
        <div>
          <Input type='search' placeholder='Search' />
          <Button className='fa fa-times' />
        </div>
      </div>
    );
  }
}
