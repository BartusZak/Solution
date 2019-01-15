import React from 'react';

const fancyTypeAndSelect = ({listName, listData, valueKey, displayValueKey, ...rest}) => (
  <div className="data-list-container">
      <input {...rest} list={listName} autoComplete="off"/>
      <datalist id={listName}>
          {listData.map(item => (
              <option key={item[valueKey]} value={item[valueKey]} id={item[valueKey]}>
                {item[displayValueKey]}
              </option>
            ))
          }
      </datalist>
  </div>
);

fancyTypeAndSelect.defaultProps = {
  valueKey: 'value',
  displayValueKey: 'displayValue'
}

export default fancyTypeAndSelect;

