
import React, { Component } from 'react';
import { Checkbox } from '../primitives/Checkbox';
import { Input } from '../primitives/Input';
import { Button } from '../primitives/Button';
import './Header.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import URI from 'urijs';
import { push } from 'connected-react-router';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleInputSearch = this.handleInputSearch.bind(this);
    this.handleClearSearchInput = this.handleClearSearchInput.bind(this);
    this.handleShowDone = this.handleShowDone.bind(this);
    this.state = {};
  }

  componentDidMount() {
    const { location, push } = this.props;
    const currentURI = new URI(location.pathname + location.search);
    const searchParameters = { ...currentURI.search(true), ...this.state };
    push(currentURI.search(searchParameters).toString());
    this.setState({
      checked: searchParameters.checked,
      searchTo: searchParameters.searchTo
    });
  }

  handleClearSearchInput() {
    const { location, push } = this.props;
    const currentURI = new URI(location.pathname + location.search);
    const searchParameters = { ...currentURI.search(true) };
    delete searchParameters.searchTo;
    this.setState({
      searchTo: ''
    },
    () => push(currentURI.search(searchParameters).toString()));
  }

  handleInputSearch(event) {
    const { location, push } = this.props;
    const { value } = event.target;
    this.setState({
      searchTo: value
    },
    () => {
      const currentURI = new URI(location.pathname + location.search);
      const searchParameters = { ...currentURI.search(true), ...this.state };
      searchParameters.searchTo
        ? push(currentURI.search(searchParameters).toString())
        : push(currentURI.search(searchParameters).removeSearch('searchTo').toString());
    }
    );
  }

  handleShowDone() {
    const { location, push } = this.props;
    this.setState({
      checked: !this.state.checked
    },
    () => {
      const currentURI = new URI(location.pathname);
      const searchParameters = { ...currentURI.search(true), ...this.state };
      searchParameters.checked
        ? push(currentURI.search(searchParameters).toString())
        : push(currentURI.search(searchParameters).removeSearch('checked').toString());
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
            <Input type='search' placeholder='Search' onChange={this.handleInputSearch} value={this.state.searchTo} />
            <Button className='fa fa-times search-button' onClick={this.handleClearSearchInput} />
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  push: PropTypes.func,
  location: PropTypes.object
};

const mapStateToProps = state => ({
  location: state.router.location
});

const mapDispatchToProps = {
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
