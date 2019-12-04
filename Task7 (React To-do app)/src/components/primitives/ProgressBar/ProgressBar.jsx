import React, { Component } from 'react';
import './ProgressBar.scss';

export class ProgressBar extends Component {
  render () {
    return (
      <div className='progressBar'>
        <div className='progressBar-loaded' />
      </div>
    );
  }
}
