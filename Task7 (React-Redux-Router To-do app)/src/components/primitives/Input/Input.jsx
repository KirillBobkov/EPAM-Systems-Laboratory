import './Input.scss';
import React from 'react';
import PropTypes from 'prop-types';

export function Input(props) {
  return (
    <input
      type={props.type}
      className='input'
      placeholder={props.placeholder}
      id={`${props.id || ''}`}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};
