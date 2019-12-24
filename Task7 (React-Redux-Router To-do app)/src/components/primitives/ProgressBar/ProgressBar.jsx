import './ProgressBar.scss';
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ProgressBar extends Component {
  handleCountPersent() {
    const {
      itemsOfCategory,
      doneItemsOfCategory,
      doneItems,
      items,
      category
    } = this.props;

    if (category) {
      return (itemsOfCategory.length)
        ? (doneItemsOfCategory.length / itemsOfCategory.length * 100).toFixed(1)
        : 0;
    } else {
      return (items.length)
        ? (doneItems.length / items.length * 100).toFixed(1)
        : 0;
    }
  }

  render () {
    const persent = this.handleCountPersent();

    return (
      <section className='progressBar'>
        <div className='progressBar-loaded' style={{ width: `${persent}%` }}>
          {`Completed ${persent}% tasks`}
        </div>
      </section>
    );
  }
}

ProgressBar.propTypes = {
  doneItemsOfCategory: PropTypes.array,
  itemsOfCategory: PropTypes.array,
  doneItems: PropTypes.array,
  items: PropTypes.array,
  category: PropTypes.object
};

const mapStateToProps = (state) => {
  const { location } = state.router;
  const path = location.pathname.split('/');
  return {
    items: state.itemReducer,
    doneItems: state.itemReducer.filter(item => item.done === true),
    category: state.categoryReducer.filter(category => category.id === path[path.length - 1])[0],
    itemsOfCategory: state.itemReducer.filter(item => item.categoryId === path[path.length - 1]),
    doneItemsOfCategory: state.itemReducer.filter(item => item.categoryId === path[path.length - 1] && item.done === true)
  };
};

export default connect(mapStateToProps)(ProgressBar);
