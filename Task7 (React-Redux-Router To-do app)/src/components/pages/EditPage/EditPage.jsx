import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EditList from '../../EditList';
import EditWindow from '../../EditWindow';
import './EditPage.scss';
import { connect } from 'react-redux';

class EditPage extends Component {
  render() {
    const { currentItem: item } = this.props;
    return (
      <main className='main'>
        <h1>{item.name}</h1>
        <div className='content'>
          <EditList />
          <EditWindow id={item.id} />
        </div>
      </main>
    );
  }
}

EditPage.propTypes = {
  currentItem: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentItem: state.itemReducer.filter(item => item.id === ownProps.match.params.item)[0]
  };
};

export default connect(mapStateToProps)(EditPage);
