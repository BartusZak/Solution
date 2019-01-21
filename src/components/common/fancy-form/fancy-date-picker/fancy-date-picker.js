import React from 'react';
import DatePicker from 'react-datepicker';
import './fancy-date-picker.scss';

const fancyDatePicker = ({classOfInput, ...rest}) => (
    <DatePicker {...rest} className={classOfInput} 

    />
);

fancyDatePicker.defaultProps = {
    classOfInput: 'field'
};

export default fancyDatePicker;