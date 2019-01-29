import React from 'react';
import { translate } from 'react-translate';
import './employee-informations.scss';
const EmployeeInformations = ({isLoading, status, employee,
  reloadEmployeeData, togleExtender, changeComponentInExtender, t, currentOpenedCart, feedbacksCount}) => {

  let content = null;
  if (isLoading) content = <div className="spinner-new spinner-new-big spinner-new-center" />;

  else if (!status) {
    content =
    <div className="empty-list-comunicate">
      <p>{t("LoadEmployeeDetailsProblem")}</p>
      <i onClick={reloadEmployeeData} className="fas fa-sync-alt fa-lg clickable"></i>
    </div>
  }

  else {
    content =
      <div onClick={togleExtender} className="employee-profile flex-column">
        {renderEmployeeProfileHeader(employee)}
        {renderInformationCrumbs(employee, t)}
        {renderFteBar(employee.capacity)}
        {renderProfileNavigation(t, changeComponentInExtender, currentOpenedCart, employee, feedbacksCount)}
      </div>;
  }


  return (
    <div onClick={togleExtender} className={`employee-profile flex-column ${isLoading ? 'employee-profile-in' : ''}`}>
      {content}
    </div>
  );
}

const renderInformationCrumbs = ({firstName, lastName, localization, team, isDeleted}, t) => (
  <div className="informations-crumbs">
    <div className="detail-label">
        <span className="dcmt-light-color">{t('Status')}</span>
        <span>{isDeleted ? 'unactive' : 'active'}</span>
    </div>
    <div className="detail-label">
        <span className="dcmt-light-color">{t("LeadSupervisor")}</span>
        <span>{firstName} {lastName}</span>
    </div>
    <div className="detail-label">
        <span className="dcmt-light-color">{t("Localization")}}</span>
        <span>{localization}</span>
    </div>
    <div className="detail-label">
        <span className="dcmt-light-color">{t("Team")}</span>
        <span>{team}</span>
    </div>
  </div>
);

const renderEmployeeProfileHeader = ({firstName, lastName, seniority, title}) => (
  <React.Fragment>
    <header>
        <img id="bg" src="https://drive.google.com/uc?export=download&id=1BIiNhMhRqxz-Mrl-BKvIwyHbEbLI47_a" />
        <img id="svg-bg" src="https://drive.google.com/uc?export=download&id=1r9hxJpLb0HLjsbODP5iF9GrzEs3cG8fS" />
        <img id="person" src="https://drive.google.com/uc?export=download&id=1No_RfevuUMAQNHGgXWjtzFdT437gatnK" />
    </header>
    <div className="personality">
      <span className="emp-name">{firstName} {lastName}</span>
      <div>
        <span className="emp-role dcmt-light-color">{title} </span>
        <span className="emp-seniority">({seniority})</span>
      </div>
    </div>
  </React.Fragment>
);

const renderFteBar = capacity => (
  <div className="progress-marker">
    <div className="progress-value" style={{width: `${capacity * 100}%`}}>
      <span className="progress-title dcmt-light-color">FTE</span>
      <span className="progress-number-value">{capacity * 100}%</span>
    </div>
  </div>
);

const renderProfileNavigation = (t, changeComponentInExtender, currentOpenedCart, employee, feedbacksCount) => (
  <div className="profile-navigation">
      <div onClick={() => changeComponentInExtender('feedbacks')} className="icon-wrapper">
        <i className={`fa fa-comments ${currentOpenedCart === 'feedbacks' ? 'rotated-icon' : ''}`}/>
        {feedbacksCount !== null &&
        <span className="element-counter">
          {feedbacksCount}
        </span>
        }
      </div>
      <div onClick={() => changeComponentInExtender('projects')} className="icon-wrapper projects-icon-wrapper">
        <i className={`fa fa-suitcase ${currentOpenedCart === 'projects' ? 'rotated-icon' : ''}`} />
      </div>
      <div onClick={() => changeComponentInExtender('skills')} className="icon-wrapper skills-icon-wrapper">
        <i className={`fa fa-chart-bar ${currentOpenedCart === 'skills' ? 'rotated-icon' : ''}`}/>
        <span className="element-counter">
          {employee.skills.length}
        </span>
      </div>
      <div className="icon-wrapper">
        <i className="fa fa-graduation-cap"/>
      </div>
      <div className="icon-wrapper">
        <i className="fa fa-chalkboard-teacher"/>
      </div>
      <span className="small-link onboards">{t("CheckOnboards")}</span>
      <span className="small-link supervisors">{t("AllSupervisors")}</span>
  </div>
);

export default translate('EmployeeInformations')(EmployeeInformations);
