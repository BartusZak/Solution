import React from 'react';
import Icon from '../common/Icon';
import SmoothTable from '../common/SmoothTable';
import { setActionConfirmation } from './../../actions/asyncActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-translate';
import { withRouter } from 'react-router-dom';
import binaryPermissioner from './../../api/binaryPermissioner';
import specialPermissioner from './../../api/specialPermissioner';
import { bindActionCreators } from 'redux';
import PhaseProjectForm from './phase-project-form/phase-project-form';

import '../../scss/components/projects/ProjectsList.scss';
class ProjectsList extends React.Component {
  state = {
    project: {},
    projectToEdit: null,
    responseBlock: {},
    loading: false,
    openProjectForm: false
  };

  componentDidUpdate = prevProps => {
    if (prevProps.projects !== this.props.projects) {
      this.setState({ projectToEdit: null, openProjectForm: false });
    }
  };

  render() {
    const { openProjectForm, projectToEdit } = this.state;
    const { t, match, history } = this.props;
    const construct = {
      rowClass: 'project-block',
      tableClass: 'projects-list-container',
      keyField: 'id',
      pageChange: this.props.pageChange,
      defaultSortField: 'name',
      defaultSortAscending: true,
      filtering: true,
      filterClass: 'ProjectFilter',
      rowDetailUnfurl: true,
      showDeletedCheckbox: true,
      showAllCheckbox: true,
      redirectPath: '/main/projects/',
      disabledRowComparator: object => {
        return object.isDeleted;
      },
      handles: {
        refresh: () => {
          this.props.pageChange();
        },
        ownerDelete: (ownerId, projectId) => {
          this.props.setActionConfirmation(true, {
            key: 'deleteProjectOwner',
            string: t('DeleteOwnerFuture', { ownerId, projectId }),
            ownerId,
            projectId,
            successMessage: t('OwnerHasBeenDeleted')
          });
        },
        putSkills: (projectId, skillsArray) => {
          this.props.setActionConfirmation(true, {
            key: 'putProjectSkills',
            string: t('ChangeSkillSettingsFuture', { projectId }),
            skillsArray,
            projectId,
            successMessage: t('SettingsHaveBeenSaved')
          });
        }
      },
      operators: [
        {
          pretty: t('Add'),
          click: () => this.setState({ openProjectForm: true }),
          comparator: () =>
            binaryPermissioner(false)(0)(0)(0)(1)(1)(1)(this.props.binPem)
        }
      ],
      columns: [
        {
          width: 20,
          field: 'name',
          pretty: t('ProjectName'),
          type: 'text',
          filter: true
        },
        {
          width: 20,
          field: 'client',
          pretty: t('Client'),
          type: 'text',
          filter: true
        },
        {
          width: 20,
          field: 'startDate',
          pretty: t('StartDate'),
          type: 'date',
          filter: true,
          filterFieldOverride: 'fromDate'
        },
        {
          width: 20,
          field: 'estimatedEndDate',
          pretty: t('EndDate'),
          type: 'date',
          filter: true,
          filterFieldOverride: 'toDate'
        },
        {
          width: 10,
          field: 'status',
          pretty: t('Status'),
          multiState: {
            null: t('SelectStatus'),
            0: t('Activated'),
            1: t('NotActivated'),
            2: t('Closed')
          },
          type: 'multiState',
          filter: true
        },
        {
          width: 1,
          toolBox: [
            {
              icon: { icon: 'minus-square', iconType: 'fas' },
              title: t('CloseProjectImperativus'),
              click: object => {
                this.props.setActionConfirmation(true, {
                  key: 'closeProject',
                  string: `${t('CloseProjectInfinitive')} ${object.name}`,
                  id: object.id,
                  successMessage: t('ProjectClosed')
                });
              },
              comparator: object => {
                return (
                  (specialPermissioner().projects.isOwner(
                    object,
                    this.props.login
                  ) ||
                    binaryPermissioner(false)(0)(0)(0)(0)(1)(1)(
                      this.props.binPem
                    )) &&
                  object.status === 0 &&
                  object.isDeleted == false
                );
              }
            },
            {
              icon: { icon: 'eject', iconType: 'fas' },
              title: t('ReactivateProjectImperativus'),
              click: object => {
                this.props.setActionConfirmation(true, {
                  key: 'reactivateProject',
                  string: `${t('ReactivateProjectInfinitive')} ${object.name}`,
                  id: object.id,
                  successMessage: t('ProjectReactivated')
                });
              },
              comparator: object => {
                return (
                  specialPermissioner().projects.isOwner(
                    object,
                    this.props.login
                  ) ||
                  (binaryPermissioner(false)(0)(0)(0)(0)(1)(1)(
                    this.props.binPem
                  ) &&
                    object.isDeleted)
                );
              }
            },
            {
              icon: { icon: 'times' },
              title: t('DeleteProjectImperativus'),
              click: object => {
                this.props.setActionConfirmation(true, {
                  key: 'deleteProject',
                  string: `${t('DeleteProjectInfinitive')} ${object.name}`,
                  id: object.id,
                  successMessage: t('ProjectDeleted')
                });
              },
              comparator: object => {
                return (
                  specialPermissioner().projects.isOwner(
                    object,
                    this.props.login
                  ) ||
                  (binaryPermissioner(false)(0)(0)(0)(0)(1)(1)(
                    this.props.binPem
                  ) &&
                    !object.isDeleted)
                );
              }
            },
            {
              icon: { icon: 'pen-square', iconType: 'fas' },
              title: t('EditProject'),
              click: project => this.setState({ projectToEdit: project }),
              comparator: object => {
                return (
                  specialPermissioner().projects.isOwner(
                    object,
                    this.props.login
                  ) ||
                  binaryPermissioner(false)(0)(0)(0)(0)(1)(1)(this.props.binPem)
                );
              }
            },
            {
              icon: { icon: 'sign-in-alt', iconType: 'fas' },
              title: t('SeeMore'),
              click: object => {
                history.push(`${match.url}/${object.id}`);
              },
              comparator: object => {
                return (
                  specialPermissioner().projects.isOwner(
                    object,
                    this.props.login
                  ) ||
                  binaryPermissioner(false)(1)(0)(1)(0)(1)(1)(this.props.binPem)
                );
              }
            }
          ],
          pretty: ''
        }
      ]
    };

    return (
      <div>
        <SmoothTable
          currentPage={this.props.currentPage}
          totalPageCount={this.props.totalPageCount}
          loading={this.props.loading}
          data={this.props.projects}
          construct={construct}
        />

        {(openProjectForm || projectToEdit) && (
          <PhaseProjectForm
            projectToEdit={projectToEdit}
            onSubmitSucc={projectId => {
              this.setState({ openProjectForm: false });
              if (projectId) history.push(match.url + '/' + projectId);
            }}
            close={() =>
              this.setState({ openProjectForm: false, projectToEdit: null })
            }
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    binPem: state.authReducer.binPem,
    login: state.authReducer.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActionConfirmation: (confirmationInProgress, toConfirm) =>
      dispatch(setActionConfirmation(confirmationInProgress, toConfirm))
  };
}

ProjectsList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  pageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPageCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  projectActions: PropTypes.object
};

export default translate('ProjectsList')(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(ProjectsList))
);
