import React from 'react';
import { calculateProjectState, reactivating, closing, deleting } from '../index';
import { closed, active } from '../../../../constants';
import { deleteProject, reactivateProject, closeProject, addOwnerToProject } from '../../../../actions/projectsActions';
import { connect } from 'react-redux';
import { translate } from 'react-translate';
import Button from '../../../common/button/button';
import EmployeeSearcher from '../../../shared/employee-searcher/employee-searcher';
import { AheadClassContext } from '../../../common/fancy-form/type-ahead/index';

import './project-informations.scss';

const { Provider } = AheadClassContext;

class ProjectInformations extends React.Component {
  state = {
    isAddingOwner: false,
    currentChangeStatusOperationName: ''
  }

  clearOperation = () => this.setState({currentChangeStatusOperationName: ''});

  deleteProject = id => {
    this.setState({currentChangeStatusOperationName: deleting});
    this.props.deleteProject(id,
      () => this.clearOperation(),
      () => this.clearOperation())
  }

  reactivateProject = id => {
    this.setState({currentChangeStatusOperationName: reactivating});
    this.props.reactivateProject(id,
      () => this.clearOperation(),
      () => this.clearOperation());
  }

  closeProject = id => {
    this.setState({currentChangeStatusOperationName: closing});
    this.props.closeProject(id,
      () => this.clearOperation(),
      () => this.clearOperation());
  }

  addOwner = (projectId, employee) => {
    this.setState({isAddingOwner: true});
    this.props.addOwnerToProject(projectId, employee,
      () => this.setState({isAddingOwner: false}),
      () => this.setState({isAddingOwner: false}));
  }

  render() {
    const { currentChangeStatusOperationName: operationName, isAddingOwner } = this.state;
    const { project, togleEditForm, toglePhaseForm, t, redirectToSharingProject, match } = this.props;
    const { id, name, description, responsiblePerson, owners, status, isDeleted, startDate, estimatedEndDate, client, cloud, parentId } = project;
    const projectState = calculateProjectState(status, isDeleted);
    const disableStatusButtons = operationName !== '';
    return (
      <div className="project-informations-wrapper flex-column">

        <h2 className="project-name flex-column">
          <span className={`project-state-label ${projectState}`}>{t(projectState)}</span>
          {name}
        </h2>

        <article className="project-description">{description}</article>

        <div className="project-details">
          <div className="detail-label">
            <span className="dcmt-light-color">{t("StartDate")}</span>
            <span>{startDate}</span>
          </div>
          <div className="detail-label">
            <span className="dcmt-light-color">{t("EstimatedEndDate")}</span>
            <span>{estimatedEndDate}</span>
          </div>
          <div className="detail-label">
            <span className="dcmt-light-color">{t("Client")}</span>
            <span>{client}</span>
          </div>
          {cloud &&
            <div className="detail-label">
              <span className="dcmt-light-color">{t("Cloud")}}</span>
              <span>{cloud}</span>
            </div>
          }
        </div>

        <p className="important-par">{t("ResponsiblePerson")}</p>

        <div className="project-details">
          <div className="detail-label">
            <span className="dcmt-light-color">{t("FirstName")}</span>
            <span>{responsiblePerson.firstName}</span>
          </div>
          <div className="detail-label">
            <span className="dcmt-light-color">{t("LastName")}</span>
            <span>{responsiblePerson.lastName}</span>
          </div>
          <div className="detail-label">
            <span className="dcmt-light-color">email</span>
            <span>{responsiblePerson.email}</span>
          </div>
          <div className="detail-label">
            <span className="dcmt-light-color">{t("PhoneNumber")}</span>
            <span>{responsiblePerson.phoneNumber}</span>
          </div>
        </div>

        <p className="important-par">{t("ProjectOwners")} ({owners.length})</p>

        <Provider value={{isLoadingByParent: isAddingOwner}}>
          <EmployeeSearcher
            employeeFilter={{ hasAccount: true, capacity: 0 }}
            emitEmployeeClick={employee => this.addOwner(id, employee)}
            placeholder="EmployeeSearcherOwnersPlaceholder" />
        </Provider>

        <div className="project-owners flex-row-center carousel element-scroll">

          {owners.map(({id, fullName}) => (
            <div key={id} className="name-and-avatar">
              <div className="user-avatar-medium">
                <img src="https://dev.dcmtbillennium.com/ProfiledPhotos/bploszynski.jpg" />
              </div>

              <div className="details">
                <span>{fullName}</span>
              </div>
            </div>
          ))}

        </div>

        <div className="project-operations">
          <Button onClick={togleEditForm} title={t("EditProject")} mainClass="dcmt-main-btn dcmt-light-btn animated-icon-btn">
            <i className="fa fa-edit"></i>
          </Button>

          {!parentId &&
            <Button onClick={toglePhaseForm} title={t("AddPhase")} mainClass="dcmt-main-btn dcmt-light-btn animated-icon-btn">
              <i className="fa fa-plus"></i>
            </Button>
          }

          {window.location.href.search('share') === -1 &&
            <Button onClick={redirectToSharingProject} title={t("ShareProject")} mainClass="dcmt-main-btn dcmt-light-btn animated-icon-btn">
              <i className="fa fa-share-alt-square"></i>
            </Button>
          }

          {(isDeleted || status !== active) &&
            <Button disable={disableStatusButtons} onClick={() => this.reactivateProject(id)}
              isLoading={operationName === reactivating} title={t("ActivateProject")} mainClass="dcmt-main-btn dcmt-light-btn animated-icon-btn">
              <i className="fa fa-check"></i>
            </Button>
          }
          {!isDeleted &&
            <Button disable={disableStatusButtons} isLoading={operationName === deleting} onClick={() => this.deleteProject(id)}
              title={t("DeleteProject")} mainClass="dcmt-main-btn dcmt-danger-btn animated-icon-btn">
              <i className="fa fa-trash"></i>
            </Button>
          }
          {(!isDeleted && status !== closed) &&
            <Button onClick={() => this.closeProject(id)}
              disable={disableStatusButtons} isLoading={operationName === closing} title={t("CloseProject")} mainClass="dcmt-main-btn dcmt-grey-btn animated-icon-btn">
              <i className="fa fa-times"></i>
            </Button>
          }
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteProject: (id, succ, err) => dispatch(deleteProject(id, succ, err)),
    reactivateProject: (id, succ, err) => dispatch(reactivateProject(id, succ, err)),
    closeProject: (id, succ, err) => dispatch(closeProject(id, succ, err)),
    addOwnerToProject: (projectId, employee, succ, err) => dispatch(addOwnerToProject(projectId, employee, succ, err))
  };
};

export default translate("ProjectInformations")(connect(null, mapDispatchToProps)(ProjectInformations));
