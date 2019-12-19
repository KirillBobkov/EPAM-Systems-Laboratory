import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Button } from '../../primitives';
import { moveTaskToCategory } from '../../../store/Tasks';
import EditList from '../EditList';

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.handleMoveCategory = this.handleMoveCategory.bind(this);
  }

  handleMoveCategory() {
    const { category, location } = this.props;
    const path = location.pathname.split('/');
    this.props.moveTaskToCategory(path[path.length - 1], category.id);
    this.props.push(`/edit/${category.id}/${path[path.length - 1]}`);
  }

  render() {
    const { category } = this.props;
    const buttonPlace = window.location.pathname.includes(category.id)
      ? <span />
      : <Button onClick={this.handleMoveCategory} className='fas fa-arrow-circle-left' />;
    const classNames = window.location.pathname.includes(category.id) ? 'category-item checked' : 'category-item';

    return (
      <>
        <div className={classNames} id={category.id}>
          <div>
            <span className='category-name'>{category.name}</span>
          </div>
          {buttonPlace}
        </div>
        <EditList className parentId={category.id} />
      </>
    );
  }
}

EditItem.propTypes = {
  category: PropTypes.object,
  name: PropTypes.string,
  push: PropTypes.func,
  moveTaskToCategory: PropTypes.func,
  location: PropTypes.object
};

const mapStateToProps = state => ({
  location: state.router.location
});

const mapDispatchToProps = {
  push, moveTaskToCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
