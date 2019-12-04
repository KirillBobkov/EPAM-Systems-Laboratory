import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

export function Input(props) {
  return (
    <input
      type={props.type}
      className='input'
      placeholder={props.placeholder}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string
};
