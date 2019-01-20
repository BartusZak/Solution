import React from 'react';
import { calculateProjectState } from '../../index';

import './project-phases.scss';
const projectPhases = ({phases}) => (
  <div className="phases-wrapper">
    <p className="important-par">Project phases ({phases.length})</p>
    <ul className="phases carousel element-scroll flex-row-center">
      {phases.map(({id, name, description, startDate, estimatedEndDate, isDeleted, status}) => (
        <li className="phase phase-focused" key={id}>
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
  </div>
);

export default projectPhases;
