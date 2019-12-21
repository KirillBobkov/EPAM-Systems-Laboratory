import './Tasks.scss';
import React, { Component } from 'react';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import Task from './Task';
import { connect } from 'react-redux';
import URI from 'urijs';

class Tasks extends Component {
  render() {
    const { items, category, push, itemsGlobal, location } = this.props;

    let todoElements;

    if (location.pathname.includes('search')) {
      todoElements = itemsGlobal.map(item => (
        <li key={item.id}>
          <Task item={item} />
        </li>));
    } else {
      todoElements = items.length
        ? items.map(item => (
          <li key={item.id}>
            <Task item={item} />
          </li>))
        : <p className='todo-message'>Let's create new task</p>;

      !category.length && push('/main');
    }

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
  itemsGlobal: PropTypes.array,
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
    category: state.categoryReducer.filter(category => category.id === ownProps.match.params.id),
    items: state.itemReducer
      .filter(task => task.categoryId === ownProps.match.params.id)
      .filter(task => searchParameters.checked ? true : task.done === false)
      .filter(task => searchParameters.searchTo
        ? task.name.toLowerCase().includes(searchParameters.searchTo.toLowerCase())
        : true),
    itemsGlobal: state.itemReducer
      .filter(task => searchParameters.checked ? true : task.done === false)
      .filter(task => searchParameters.searchTo
        ? task.name.toLowerCase().includes(searchParameters.searchTo.toLowerCase())
        : true)
  };
};

const mapDispatchToProps = {
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
