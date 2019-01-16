import React from 'react';

const Select = ({listData, children, placeholder, ...rest}) => (
  <div className="field-block">
    <select {...rest}>
      {listData.length === 0 ?
        <option value="" disabled>{placeholder}</option> :

        listData.map(({displayValue, value, key}) => (
          <option key={key} value={value}>
              {displayValue}
          </option>
        ))
      }
    </select>
    {children}
  </div>

);

export default Select;
