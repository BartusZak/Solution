import React from 'react'
import './calendarItem.scss';
import { polishPlural } from '../../../../services/methods';

const calendarItem = ({item, minutes, from, to, language}) => (
<div key={item.date + item.time} className="date">
    <p>
        <span><b>{item.date}</b> {item.monthName} ({item.dayName})</span>
    </p>
    <p>
        <span>{from}: <b>{item.time}</b></span> 
        <span>{to}: <b>{item.willLastTo}</b></span> 
    </p>
    <p>
        <span><i className="fa fa-stopwatch"></i> {item.length} {language === 'pl' ? polishPlural('minuta', 'minuty', 'minut', item.length) : minutes} </span>
    </p>
</div>
);

export default calendarItem;