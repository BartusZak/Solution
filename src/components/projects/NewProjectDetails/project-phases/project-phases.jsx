import React from 'react';
import { calculateProjectState } from '../index';

import './project-phases.scss';
const projectPhases = ({phases, push}) => {
  const phasesCount = phases.length;
  return (
  <div className="phases-wrapper flex-column">
    <p className="important-par">Project phases ({phasesCount})</p>

    {phasesCount === 0 ?
    <div className="empty-list-comunicate">
      <p>Phases list is already empty. Click here for add new one</p>
      <i className="fas fa-briefcase fa-lg "></i>
    </div> :
    <ul className="phases carousel element-scroll flex-row-center">
    {phases.map(({id, name, description, startDate, estimatedEndDate, isDeleted, status}) => (
      <li onClick={() => push(id)}
        className="phase clickable" key={id}>
        <p className="phase-name">{name}</p>
        <article className="phase-description">
          {description}
        </article>
        <div className="phase-details flex-row-center">
          <div className="detail-label">
            <span className="dcmt-light-color">start date</span>
            <span>{startDate}</span>
          </div>
          <div className="detail-label">
            <span className="dcmt-light-color">status</span>
            <span>{calculateProjectState(status, isDeleted)}</span>
          </div>
          <div className="detail-label">
            <span className="dcmt-light-color">estimated end date</span>
            <span>{estimatedEndDate}</span>
          </div>
        </div>
      </li>
    ))}
    </ul>
    }
  </div>
  );
}
export default projectPhases;
