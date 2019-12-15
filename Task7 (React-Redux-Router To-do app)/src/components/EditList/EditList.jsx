import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditItem from './EditItem';
import { connect } from 'react-redux';

class EditList extends Component {
  render() {
    const { categories } = this.props;
    const categoryElements = categories.map((category) =>
      <li key={category.id}>
        <EditItem category={category} />
      </li>
    );

    return (
      <div className='category-list-container'>
        <ul className='category-list'>
          {categoryElements}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categoryReducer
  };
};

export default connect(mapStateToProps)(EditList);

EditList.propTypes = {
  categories: PropTypes.array
};
