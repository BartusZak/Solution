import React from 'react'
import './quartersPanel.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import Button from '../common/button/button.js';
import EmployeeQuarters from './employeeQuarters/employeeQuarters';
import AddQuarter from './addQuarter/addQuarter';
import { createLastWatchedPersonsArray, changeLinkBeforeRedirect, changeCurrentWatchedUser, createLastWatchedPersonsArrayACreator } from '../../actions/persistHelpActions.js';
import { sendAuthCodePromise } from '../../actions/oneDriveActions.js';
import PlanQuarter from './planQuarter/planQuarter';
import AuthWithOutlook from './authWithOutlookComponent/authWithOutlookComponent';
import { translate } from 'react-translate';
import { API_ENDPOINT } from '../../api';
import EmployeeSearcher from '../shared/employee-searcher/employee-searcher';
const linkTypes = {
    "plan": "/employees/plan/",
    "addquarter": "/employees/addquarter/",
    "employee": "/employees/"
};

class Quarters extends React.PureComponent{
    state = {
        historyLighted: false
    }

    handleBtnClick = (urlToPush, isUrlWithParam, quarterToPopulateId) => {
        const { push } = this.props.history;
        const { currentWatchedUser } = this.props;
        if(isUrlWithParam){
            push({
                pathname: urlToPush + "/" + currentWatchedUser + "?=" + currentWatchedUser,
                state: { quarterToPopulateId }
            });
        }else{
            this.setState({openFindUserModal: true});
        }
    }

    changeActualWatchedUser = person => {
        const { history, match, changeCurrentWatchedUser } = this.props;
        const url = history.location;

        const isUrlWithParam = url.search !== "";
        for(let key in linkTypes){
            if(url.pathname.search(key) !== -1){
                changeCurrentWatchedUser(person);
                this.setState({openFindUserModal: false});
                history.push(`${match.url}${linkTypes[key]}${person}?=${person}`);
                break;
            }
        }
    }

    enterHistoryBtn = () => {
      this.setState({ historyLighted: true });
    }
    overHistoryBtn = () => {
      this.setState({ historyLighted: false });
    }

    render(){
        const { match, history, lastWatchedPersons, planQuarterACreator, createLastWatchedPersonsArray,
            linkBeforeRedirectToOutlookAuth, changeLinkBeforeRedirect, sendAuthCodePromise,
            authCodeStatus, authCodeErrors, currentWatchedUser, changeCurrentWatchedUser, t } = this.props;
        const { historyLighted } = this.state;

        const isHistoryExist = lastWatchedPersons && lastWatchedPersons.length > 0;
        return (
            <div className="quarters-panel">
                <header className="block-header">
                    <span><i className="fa fa-comments"></i>{t("QuarterTalkHeader")} </span>
                {currentWatchedUser &&
                    <span>{t("QuarterTalkSubHeader")} <b>{currentWatchedUser}</b></span>
                }
                </header>
                {isHistoryExist &&
                  <div className={`recent-watched ${historyLighted ? "light-history" : ""}`}>
                    {lastWatchedPersons.map(person => {
                        return (
                            <div onClick={() => this.changeActualWatchedUser(person)} className={`last-watched-person ${person === currentWatchedUser ? "last-watched-person-focused" : ""}`} key={person}>
                                <div className="avatar-container">
                                    <div className="image" style={{backgroundImage: `url(${API_ENDPOINT + "/ProfilePhotos/" + person + ".jpg"})`}}>
                                    </div>
                                    <i className="fa fa-user"></i>
                                </div>
                                <div>
                                    {person}
                                </div>
                            </div>
                        );
                    })}
                  </div>
                }

                <nav className="quarter-talks-navigation">
                  <EmployeeSearcher emitEmployeeClick={employee => this.changeActualWatchedUser(employee.id)} />

                  <div className="btns-nav-wrapper">
                    <Button onClick={() => this.handleBtnClick(`${match.url}/employees`, true)}
                        title={t("QuaterTalks")} mainClass="btn xl-btn ok-btn animated-icon-btn"><i className="fa fa-comments"/></Button>
                    <Button onClick={() => this.handleBtnClick(`${match.url}/employees/addquarter`, true)}
                        title={t("AddQuarter")} mainClass="btn xl-btn ok-btn animated-icon-btn"><i className="fa fa-plus"/></Button>
                    <Button onClick={() => this.handleBtnClick(`${match.url}/employees/plan`, true)}
                        title={t("PlanQuarter")} mainClass="btn xl-btn ok-btn animated-icon-btn"><i className="fa fa-comment"/></Button>

                    {isHistoryExist &&
                      <Button onClick={() => createLastWatchedPersonsArray([])} title={t("ClearHistory")}
                          mainClass="btn xl-btn danger-btn animated-icon-btn" ><i className="fa fa-history"/></Button>
                    }
                  </div>
                </nav>
                <div className="quarters-content">
                    <Switch>
                      <Route path={`${match.url}/employees/calendar/auth`} render={() => (
                          <AuthWithOutlook linkBeforeRedirectToOutlookAuth={linkBeforeRedirectToOutlookAuth} push={history.push}
                          authCodeStatus={authCodeStatus} authCodeErrors={authCodeErrors} match={match}
                          sendAuthCodePromise={sendAuthCodePromise} />
                      )}/>
                      <Route exact path={`${match.url}/employees/plan/:id`} render={() => (
                          <PlanQuarter currentWatchedUser={currentWatchedUser} location={history.location} planQuarterACreator={planQuarterACreator} match={match}
                            redirectToLastWatchedPerson={this.handleBtnClick} changeLinkBeforeRedirect={changeLinkBeforeRedirect}/>
                      )}/>
                      <Route exact path={match.url + "/employees/addquarter/:id"} render={() => (
                          <AddQuarter history={history} currentWatchedUser={currentWatchedUser} onCloseModal={() => this.handleBtnClick(`${match.url}/employees`, true)}/>
                      )} />
                      <Route exact path={`${match.url}/employees/:id`} render={() => (
                          <EmployeeQuarters createLastWatchedPersonsArrayACreator={createLastWatchedPersonsArrayACreator}
                          changeCurrentWatchedUser={changeCurrentWatchedUser} lastWatchedPersons={lastWatchedPersons}
                          redirectToPopulatingQuarter={(quarterId) => this.handleBtnClick(`${match.url}/employees/addquarter`, true, quarterId)}
                          history={history} currentWatchedUser={currentWatchedUser} />
                      )}/>
                    </Switch>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lastWatchedPersons: state.persistHelpReducer.lastWatchedPersons,
        linkBeforeRedirectToOutlookAuth: state.persistHelpReducer.linkBeforeRedirectToOutlookAuth,

        authCodeStatus: state.authReducer.authCodeStatus,
        authCodeErrors: state.authReducer.authCodeErrors,

        currentWatchedUser: state.persistHelpReducer.currentWatchedUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createLastWatchedPersonsArray: (lastWatchedPersons) => dispatch(createLastWatchedPersonsArray(lastWatchedPersons)),
        createLastWatchedPersonsArrayACreator: (employeeId) => dispatch(createLastWatchedPersonsArrayACreator(employeeId)),
        changeLinkBeforeRedirect: (linkBeforeRedirectToOutlookAuth) => dispatch(changeLinkBeforeRedirect(linkBeforeRedirectToOutlookAuth)),
        sendAuthCodePromise: (url, shouldGoForOutlook) => dispatch(sendAuthCodePromise(url, shouldGoForOutlook)),
        changeCurrentWatchedUser: (currentWatchedUser) => dispatch(changeCurrentWatchedUser(currentWatchedUser))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(translate("Quaters")(withRouter(Quarters)));
