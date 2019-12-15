
import React, { Component } from 'react';
import { Checkbox } from '../primitives/Checkbox';
import { Input } from '../primitives/Input';
import { Button } from '../primitives/Button';
import './Header.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { findTodoItem } from '../../store/Tasks/actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleInputSearch = this.handleInputSearch.bind(this);
    this.handleClearSearchInput = this.handleClearSearchInput.bind(this);
    this.handleShowDone = this.handleShowDone.bind(this);
    this.state = {
      inputSearchValue: ''
    };
  }

  handleClearSearchInput() {
    this.setState({
      inputSearchValue: ''
    });
  }

  handleInputSearch(event) {
    const { value } = event.target;
    this.setState({
      inputSearchValue: value
    },
    () => this.props.findTodoItem(this.state.inputSearchValue)
    );
  }

  handleShowDone() {
    console.log('show All');
  }

  render () {
    return (
      <header className='header'>
        <h1 className='title'>To-do list</h1>
        <div className='search-bar'>
          <label><Checkbox id='search' className='checkbox' onChange={this.handleShowDone} />Show done</label>
          <div>
            <Input type='search' placeholder='Search' onChange={this.handleInputSearch} value={this.state.inputSearchValue} />
            <Button className='fa fa-times search-button' onClick={this.handleClearSearchInput} />
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = {
  findTodoItem
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
  findTodoItem: PropTypes.func
};
