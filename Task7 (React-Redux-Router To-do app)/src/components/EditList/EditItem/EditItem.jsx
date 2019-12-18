import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Button } from '../../primitives';
import { moveTaskToCategory } from '../../../store/Tasks';

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.handleMoveCategory = this.handleMoveCategory.bind(this);
  }

  handleMoveCategory() {
    const { category } = this.props;
    const path = window.location.pathname.split('/');
    this.props.moveTaskToCategory(path[path.length - 1], category.id);
    this.props.push(`/main/${category.id}`);
  }

  render() {
    const { category } = this.props;

    const buttonPlace = window.location.pathname.includes(category.id)
      ? <span />
      : <Button onClick={this.handleMoveCategory} className='fas fa-level-down-alt' />;

    return (

      <div className='category-item' id={category.id}>
        <div>
          <span className='category-name'>{category.name}</span>
        </div>
        {buttonPlace}
      </div>
    );
  }
}

EditItem.propTypes = {
  category: PropTypes.object,
  name: PropTypes.string,
  push: PropTypes.func,
  moveTaskToCategory: PropTypes.func
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  push, moveTaskToCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
