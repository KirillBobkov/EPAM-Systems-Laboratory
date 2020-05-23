
import React, { Component } from 'react';
import { Checkbox } from '../primitives/Checkbox';
import { Input } from '../primitives/Input';
import { Button } from '../primitives/Button';
import './Navigation.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import URI from 'urijs';
import { push } from 'connected-react-router';

class Navigation extends Component {
  state = {
    checked: false,
    searchTo: ''
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

  handleClearSearchInput = () => {
    const { location, push } = this.props;
    const searchPath = location.pathname.replace(/\/search/g, '');
    const currentURI = new URI(searchPath + location.search);
    const searchParameters = { ...currentURI.search(true) };

    delete searchParameters.searchTo;
    this.setState({
      searchTo: ''
    },
    () => push(currentURI.search(searchParameters).toString()));
  }

  handleInputSearch = (event) => {
    const { location, push } = this.props;
    const { value } = event.target;
    let searchPath = location.pathname.includes('search')
      ? location.pathname
      : location.pathname + '/search';

    if (value === '') searchPath = location.pathname.replace(/\/search/g, '');

    this.setState({
      searchTo: value
    },
    () => {
      const currentURI = new URI(searchPath + location.search);
      const searchParameters = { ...currentURI.search(true), ...this.state };

      if (!searchParameters.checked) delete searchParameters.checked;
      searchParameters.searchTo
        ? push(currentURI.search(searchParameters).toString())
        : push(currentURI.search(searchParameters).removeSearch('searchTo').toString());
    }
    );
  }

  handleShowDone = () => {
    const { location, push } = this.props;
    this.setState({
      checked: !this.state.checked
    },
    () => {
      const currentURI = new URI(location.pathname);
      const searchParameters = { ...currentURI.search(true), ...this.state };
      if (searchParameters.searchTo === '') delete searchParameters.searchTo;
      searchParameters.checked
        ? push(currentURI.search(searchParameters).toString())
        : push(currentURI.search(searchParameters).removeSearch('checked').toString());
    }
    );
  }

  render () {
    return (
      <nav className='navigation'>
        <h1 className='title'>To-do list</h1>
        <section className='search-bar'>
          <label>
            <Checkbox
              id='search'
              className='checkbox'
              onChange={this.handleShowDone}
              done={this.state.checked}
            />
            Show done
          </label>
          <div>
            <Input
              type='search'
              placeholder='Search'
              onChange={this.handleInputSearch}
              value={this.state.searchTo}
            />
            <Button
              className='fa fa-times search-button'
              onClick={this.handleClearSearchInput}
            />
          </div>
        </section>
      </nav>
    );
  }
}

Navigation.propTypes = {
  push: PropTypes.func,
  location: PropTypes.object
};

const mapStateToProps = state => ({
  location: state.router.location
});

const mapDispatchToProps = {
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
