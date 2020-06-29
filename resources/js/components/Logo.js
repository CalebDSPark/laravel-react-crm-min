import React from 'react';

function Logo(props) {
  return (
    <img alt="Logo" width="180" height="70"
      //src="/static/logo.svg"
      src="/static/react.png"
      {...props}
    />
  );
}

export default Logo;
