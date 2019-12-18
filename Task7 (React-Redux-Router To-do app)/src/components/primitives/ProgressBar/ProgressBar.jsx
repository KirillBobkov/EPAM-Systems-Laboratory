import './ProgressBar.scss';
import React, { Component } from 'react';

export class ProgressBar extends Component {
  render () {
    return (
      <div className='progressBar'>
        <div className='progressBar-loaded' />
      </div>
    );
  }
}
