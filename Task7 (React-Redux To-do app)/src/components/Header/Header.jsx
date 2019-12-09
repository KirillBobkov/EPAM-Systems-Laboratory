
import React, { Component } from 'react';
import { Checkbox } from '../primitives/Checkbox';
import { Input } from '../primitives/Input';
import { Button } from '../primitives/Button';
import './Header.scss';

export class Header extends Component {
  render () {
    return (
      <header className='header'>
        <h1 className='title'>To-do list</h1>
        <div className='search-bar'>
          <label><Checkbox id='search' className='checkbox' />Show done</label>
          <div>
            <Input type='search' placeholder='Search' />
            <Button className='fa fa-times search-button' />
          </div>
        </div>
      </header>
    );
  }
}
