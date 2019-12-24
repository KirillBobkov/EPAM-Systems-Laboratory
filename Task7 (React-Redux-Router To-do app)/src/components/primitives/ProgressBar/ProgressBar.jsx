import './ProgressBar.scss';
import React, { Component } from 'react';

export class ProgressBar extends Component {
  render () {
    return (
      <section className='progressBar'>
        <div className='progressBar-loaded' />
      </section>
    );
  }
}
