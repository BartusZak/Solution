import React from 'react';
import './checkbox.scss';

const checkbox = ({checked, handleChange, id, width, height}) => (
  <React.Fragment>
    <input type="checkbox" id={id} style={{display: 'none', width: `${width}px`, height: `${height}px`}} checked={checked} onChange={handleChange} />
    <label htmlFor={id} className={`check ${checked ? 'checked' : ''}`}>
      <svg width={`${width}px`} height={`${height}px`} viewBox={`0 0 ${width} ${height}`}>
        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
        <polyline points="1 9 7 14 15 4"></polyline>
      </svg>
    </label>
  </React.Fragment>
);

checkbox.defaultProps = {
  height: '18',
  width: '18'
};

export default checkbox;
