import './Tasks.scss';
import React, { Component } from 'react';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import Task from './Task';
import { connect } from 'react-redux';
import URI from 'urijs';

class Tasks extends Component {
  render() {
    const { items, category, push, location } = this.props;

    if (!location.pathname.includes('search')) !category.length && push('/main');

    const todoElements = items.length
      ? items.map(item => (
        <li key={item.id}>
          <Task item={item} />
        </li>))
      : <p className='todo-message'>Let's create new task</p>;

    return (
      <div className='todo-list-container'>
        <ul className='todo-list'>
          {todoElements}
        </ul>
      </div>
    );
  }
}

Tasks.propTypes = {
  items: PropTypes.array,
  push: PropTypes.func,
  category: PropTypes.array,
  location: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  const { pathname, search } = state.router.location;
  const currentURI = new URI(pathname + search);
  const searchParameters = { ...currentURI.search(true) };

  return {
    location: state.router.location,
    items: state.itemReducer
      .filter(task => pathname.includes('search') ? true : task.categoryId === ownProps.match.params.id)
      .filter(task => searchParameters.checked ? true : task.done === false)
      .filter(task => searchParameters.searchTo
        ? task.name.toLowerCase().includes(searchParameters.searchTo.toLowerCase())
        : true),
    category: state.categoryReducer.filter(category => category.id === ownProps.match.params.id)
  };
};

const mapDispatchToProps = {
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
