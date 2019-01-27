import React from 'react';
import { calculateProjectState } from '../index';
import { translate } from 'react-translate';

import './project-phases.scss';
const ProjectPhases = ({phases, push, openAddingPhase, t}) => {
  const phasesCount = phases.length;
  return (
  <div className={`phases-wrapper flex-column ${phasesCount === 0 ? 'empty-list-bg' : ''}`}>
    <p className="important-par">{t("ProjectPhases")} ({phasesCount})</p>

    {phasesCount === 0 ?
    <div className="empty-list-comunicate">
      <p>{t("EmptyPhases")}</p>
      <i onClick={openAddingPhase} className="fas fa-briefcase fa-lg clickable"></i>
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
            <span className="dcmt-light-color">{t("StartDate")}</span>
            <span>{startDate}</span>
          </div>
          <div className="detail-label">
            <span className="dcmt-light-color">{t("Status")}</span>
            <span>{calculateProjectState(status, isDeleted)}</span>
          </div>
          <div className="detail-label">
            <span className="dcmt-light-color">{t("EstimatedEndDate")}</span>
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
export default translate("ProjectPhases")(ProjectPhases);
