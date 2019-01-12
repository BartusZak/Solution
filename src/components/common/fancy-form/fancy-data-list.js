import React from 'react';

const fancyTypeAndSelect = ({listName, listData, ...rest}) => (
  <div className="data-list-container">
      <input {...rest} list={listName} autoComplete="off"/>
      <datalist id={listName}>
          {listData.length > 0 && listData.map(({displayValue, value}) => (
              <option key={value} value={value} id={value}>
                {displayValue}
              </option>
            ))
          }
      </datalist>
  </div>
);

export default fancyTypeAndSelect;

