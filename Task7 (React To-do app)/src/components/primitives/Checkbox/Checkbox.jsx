import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.scss';

export function Checkbox(props) {
  return (
    <span className={props.className}>
      <input type='checkbox' id={props.id} />
      <label htmlFor={props.id} />
    </span>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string
};
