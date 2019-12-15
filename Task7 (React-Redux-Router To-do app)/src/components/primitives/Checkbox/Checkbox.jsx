import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.scss';

export function Checkbox(props) {
  return (
    <span className={props.className}>
      <input
        type='checkbox'
        onChange={props.onChange}
        id={props.id}
        checked={props.done}
      />
      <label htmlFor={props.id} />
    </span>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  done: PropTypes.boolean,
  onChange: PropTypes.function
};
