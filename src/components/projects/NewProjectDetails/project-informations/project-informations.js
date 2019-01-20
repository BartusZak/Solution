import React from 'react';
import { calculateProjectState, closed, active } from '../index';
import Button from '../../../common/button/button';
import EmployeeSearcher from '../../../shared/employee-searcher/employee-searcher';
import { AheadClassContext } from '../../../common/fancy-form/type-ahead/index';

import './project-informations.scss';

const { Provider } = AheadClassContext;

const projectInformations = ({project}) => {
  const { name, description, responsiblePerson, owners, status, isDeleted, startDate, estimatedEndDate, client, cloud } = project;
  const projectState = calculateProjectState(status, isDeleted);
  return (
    <div className="project-informations-wrapper flex-column">
    <h2 className="project-name flex-column">
      <span className={`project-state-label ${projectState}`}>{projectState}</span>
      {name}
    </h2>

    <article className="project-description">{description}</article>

    <div className="project-details">
      <div className="detail-label">
        <span className="dcmt-light-color">start date</span>
        <span>{startDate}</span>
      </div>
      <div className="detail-label">
        <span className="dcmt-light-color">estimated end date</span>
        <span>{estimatedEndDate}</span>
      </div>
      <div className="detail-label">
        <span className="dcmt-light-color">client</span>
        <span>{client}</span>
      </div>
    </div>

    <div className="project-operations">
      <Button title="EDIT PROJECT" mainClass="dcmt-main-btn dcmt-light-btn animated-icon-btn">
        <i className="fa fa-edit"></i>
      </Button>

      <Button title="ADD PHASE" mainClass="dcmt-main-btn dcmt-light-btn animated-icon-btn">
        <i className="fa fa-plus"></i>
      </Button>
      <Button title="SHARE PROJECT" mainClass="label-btn dcmt-light-color" />
    </div>

    {cloud &&
      <div className="detail-label">
        <span className="dcmt-light-color">cloud</span>
        <span>{cloud}</span>
      </div>
    }

    <p className="important-par">Responsible person</p>

    <div className="project-details">
      <div className="detail-label">
        <span className="dcmt-light-color">first name</span>
        <span>{responsiblePerson.firstName}</span>
      </div>
      <div className="detail-label">
        <span className="dcmt-light-color">last name</span>
        <span>{responsiblePerson.lastName}</span>
      </div>
      <div className="detail-label">
        <span className="dcmt-light-color">email</span>
        <span>{responsiblePerson.email}</span>
      </div>
      <div className="detail-label">
        <span className="dcmt-light-color">phone number</span>
        <span>{responsiblePerson.phoneNumber}</span>
      </div>
    </div>

    <p className="important-par">Project owners ({owners.length})</p>

    <Provider value="field-block circle-searcher">
      <EmployeeSearcher placeholder="EmployeeSearcherOwnersPlaceholder" />
    </Provider>

    <div className="project-owners flex-row-center carousel element-scroll">

      {owners.map(({id, fullName}) => (
        <div key={id} className="owner flex-row-center">
          <div className="user-avatar-medium">
            <img src="https://dev.dcmtbillennium.com/ProfiledPhotos/bploszynski.jpg" />
          </div>

          <div className="owner-details">
            <span>{fullName}</span>
          </div>
        </div>
      ))}

    </div>

    <div className="project-operations">
      {(isDeleted || status !== active) &&
        <Button title="ACTIVATE PROJECT" mainClass="dcmt-main-btn dcmt-light-btn animated-icon-btn">
          <i className="fa fa-check"></i>
        </Button>
      }
      {!isDeleted &&
        <Button title="DELETE PROJECT" mainClass="dcmt-main-btn dcmt-danger-btn animated-icon-btn">
          <i className="fa fa-trash"></i>
        </Button>
      }
      {(isDeleted || status !== closed) &&
        <Button title="CLOSE PROJECT" mainClass="dcmt-main-btn dcmt-grey-btn animated-icon-btn">
          <i className="fa fa-times"></i>
        </Button>
      }
    </div>

  </div>
  );
};

export default projectInformations;
