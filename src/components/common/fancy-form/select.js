import React from 'react';

const Select = ({listData, ...rest}) => (
    <select {...rest}>
        {listData.map(item => (
            <option key={item}>
                {item}
            </option>
        ))}
    </select>
);

export default Select;
