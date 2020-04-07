import React from 'react';

export default (props) => {
  return (
    <button
      className="box"
      onClick={props.onclick}
      disabled={props.disabled}
      id={props.id}
    >
      {props.vlaue}
    </button>
  );
};
