import React, { Component } from 'react';
import './EditWindow.scss';
import { connect } from 'react-redux';
import { Button, Input, Checkbox } from '../primitives';

class EditWindow extends Component {
  render() {
    return (
      <div className='edit__window'>
        <div className='edit__control-buttons'>
          <Button
            id='saveButtonEdit'
            text='Save changes'
            className='button--with-border'
          />
          <Button
            id='cancelButtonEdit'
            text='Cancel'
            className='button--with-border'
          />
        </div>
        <div className='edit__input'>
          <Input />
        </div>
        <div className='edit__checkbox'>
          <label><Checkbox id='doneTasks' className='checkbox' onChange={this.handleShowDone} />Show done</label>
        </div>
        <textarea className='edit__text-area' />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state
  };
};

export default connect(mapStateToProps)(EditWindow);
