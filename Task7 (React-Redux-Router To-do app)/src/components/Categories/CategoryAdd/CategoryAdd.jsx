import React, { Component } from 'react';
import { Button, Input } from '../../primitives';
import './CategoryAdd.scss';
import { addCategory } from '../../../store/Categories/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CategoryAdd extends Component {
  constructor(props) {
    super(props);
    this.handleInputCategory = this.handleInputCategory.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.state = {
      inputCategoryValue: ''
    };
  }

  handleAddCategory() {
    const { inputCategoryValue } = this.state;

    if (inputCategoryValue) {
      this.props.addCategory(inputCategoryValue);
      this.setState({
        inputCategoryValue: ''
      });
    }
  }

  handleInputCategory(event) {
    const { value } = event.target;
    this.setState({
      inputCategoryValue: value
    });
  }

  render() {
    return (
      <div className='category-input'>
        <Input
          id='categoryInputAdd'
          type='text'
          placeholder='Enter category name'
          onChange={this.handleInputCategory}
          value={this.state.inputCategoryValue}
        />
        <Button
          id='categoryButtonAdd'
          onClick={this.handleAddCategory}
          text='Add'
          className='button--with-border'
        />
      </div>
    );
  }
}

CategoryAdd.propTypes = {
  addCategory: PropTypes.func
};

const mapDispatchToProps = {
  addCategory
};

export default connect(null, mapDispatchToProps)(CategoryAdd);
