/* eslint-disable react/prop-types */
import React, { Component } from 'react';
// import { Route, Switch } from 'react-router';
import EditList from '../../EditList';
import EditWindow from '../../EditWindow';
import './EditPage.scss';

export default class EditPage extends Component {
  render() {
    console.log(this.props.match.params);
    return (
      <>
        <main className='edit-container'>
          <EditList />
          <EditWindow />
        </main>
      </>
    );
  }
}
