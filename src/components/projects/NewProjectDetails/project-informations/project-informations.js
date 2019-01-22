import React from 'react';
import { calculateProjectState, reactivating, closing, deleting } from '../index';
import { closed, active } from '../../../../constants';
import { deleteProject, reactivateProject, closeProject, addOwnerToProject } from '../../../../actions/projectsActions';
import { connect } from 'react-redux';
import Button from '../../../common/button/button';
import EmployeeSearcher from '../../../shared/employee-searcher/employee-searcher';
import ProjectPhaseForm from '../../phase-project-form/phase-project-form';
import { AheadClassContext } from '../../../common/fancy-form/type-ahead/index';

import './project-informations.scss';

const { Provider } = AheadClassContext;

class ProjectInformations extends React.Component {
  state = {
    editProjectForm: false, addPhaseForm: false, isAddingOwner: false,
    currentChangeStatusOperationName: ''
  }

  togleEditForm = () => this.setState({editProjectForm: !this.state.editProjectForm});
  toglePhaseForm = () => this.setState({addPhaseForm: !this.state.addPhaseForm});
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
    const { editProjectForm, addPhaseForm, currentChangeStatusOperationName: operationName, isAddingOwner } = this.state;
    const { project } = this.props;
    const { id, name, description, responsiblePerson, owners, status, isDeleted, startDate, estimatedEndDate, client, cloud, parentId } = project;
    const projectState = calculateProjectState(status, isDeleted);
    const disableStatusButtons = operationName !== '';
    return (
      <div className="project-informations-wrapper flex-column">

        {editProjectForm &&
          <ProjectPhaseForm projectToEdit={project}
            onSubmitSucc={this.togleEditForm}
            close={this.togleEditForm}/>
        }

        {addPhaseForm &&
          <ProjectPhaseForm parentId={id} isPhaseForm
            projectToEdit={{name: '', description: '', client, cloud, responsiblePerson}}
            onSubmitSucc={this.toglePhaseForm}
            close={this.toglePhaseForm} />
        }

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
          {cloud &&
            <div className="detail-label">
              <span className="dcmt-light-color">cloud</span>
              <span>{cloud}</span>
            </div>
          }
        </div>

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

        <Provider value={{isLoadingByParent: isAddingOwner}}>
          <EmployeeSearcher
            employeeFilter={{ hasAccount: true, capacity: 0 }}
            emitEmployeeClick={employee => this.addOwner(id, employee)}
            placeholder="EmployeeSearcherOwnersPlaceholder" />
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
          <Button onClick={this.togleEditForm} title="EDIT PROJECT" mainClass="dcmt-main-btn dcmt-light-btn animated-icon-btn">
            <i className="fa fa-edit"></i>
          </Button>

          {!parentId &&
            <Button onClick={this.toglePhaseForm} title="ADD PHASE" mainClass="dcmt-main-btn dcmt-light-btn animated-icon-btn">
              <i className="fa fa-plus"></i>
            </Button>
          }

          <Button title="SHARE PROJECT" mainClass="dcmt-main-btn dcmt-light-btn animated-icon-btn">
            <i className="fa fa-share-alt-square"></i>
          </Button>

          {(isDeleted || status !== active) &&
            <Button disable={disableStatusButtons} onClick={() => this.reactivateProject(id)}
              isLoading={operationName === reactivating} title="ACTIVATE PROJECT" mainClass="dcmt-main-btn dcmt-light-btn animated-icon-btn">
              <i className="fa fa-check"></i>
            </Button>
          }
          {!isDeleted &&
            <Button disable={disableStatusButtons} isLoading={operationName === deleting} onClick={() => this.deleteProject(id)}
              title="DELETE PROJECT" mainClass="dcmt-main-btn dcmt-danger-btn animated-icon-btn">
              <i className="fa fa-trash"></i>
            </Button>
          }
          {(!isDeleted && status !== closed) &&
            <Button onClick={() => this.closeProject(id)}
              disable={disableStatusButtons} isLoading={operationName === closing} title="CLOSE PROJECT" mainClass="dcmt-main-btn dcmt-grey-btn animated-icon-btn">
              <i className="fa fa-times"></i>
            </Button>
          }
        </div>

      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInformations);
