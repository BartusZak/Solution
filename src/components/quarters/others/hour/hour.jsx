import React from 'react'
import './hour.scss';

const hour = ({item, setPlanHour}) =>
    <div 
        onClick={(e) => setPlanHour(e.currentTarget.textContent)} 
        className={"hour-label clickable"}>
        {item.name}
    </div>

export default hour;