
import React, { Component } from 'react';
import { Checkbox } from '../primitives/Checkbox';
import { Input } from '../primitives/Input';
import { Button } from '../primitives/Button';
import './Header.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { findTodoItem, showDoneTasks } from '../../store/Tasks/actions';
import URI from 'urijs';
import { push } from 'connected-react-router';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleInputSearch = this.handleInputSearch.bind(this);
    this.handleClearSearchInput = this.handleClearSearchInput.bind(this);
    this.handleShowDone = this.handleShowDone.bind(this);
    this.state = {
      inputSearchValue: '',
      checked: false
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
    () => {
      const currUri = new URI(window.location.pathname + window.location.search);
      const searchObj = { ...currUri.search(true), ...this.state };
      searchObj.input
        ? this.props.push(currUri.search(searchObj).toString())
        : this.props.push(currUri.search(searchObj).removeSearch('input').toString());
    }
    );
  }

  handleShowDone() {
    this.setState({
      checked: !this.state.checked
    },
    () => {
      const currUri = new URI(window.location.pathname);
      const searchObj = { ...currUri.search(true), ...this.state };
      searchObj.checked
        ? this.props.push(currUri.search(searchObj).toString())
        : this.props.push(currUri.search(searchObj).removeSearch('checked').toString());
    }
    );
  }

  render () {
    return (
      <header className='header'>
        <h1 className='title'>To-do list</h1>
        <div className='search-bar'>
          <label><Checkbox id='search' className='checkbox' onChange={this.handleShowDone} done={this.state.checked} />Show done</label>
          <div>
            <Input type='search' placeholder='Search' onChange={this.handleInputSearch} value={this.state.inputSearchValue} />
            <Button className='fa fa-times search-button' onClick={this.handleClearSearchInput} />
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  findTodoItem: PropTypes.func,
  push: PropTypes.func
};

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = {
  findTodoItem, showDoneTasks, push
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
