import React from 'react'
import './employeeQuarters.scss';
import { connect } from 'react-redux';
import { getQuartersForEmployeeACreator, getQuartersForEmployee, editQuarterTalkACreator,
    deleteQuarterTalkACreator, reactivateQuarterTalkACreator  } from '../../../actions/quarterTalks.js';
import LoadHandlingWrapper from '../../../hocs/handleLoadingContent';
import List from '../../common/list/list';
import Button from '../../common/button/button.js';
import QuarterListItem from '../others/quarterListItem/quarterListItem';
import QuarterDetailsItem from '../others/quarterDetailsItem/quarterDetailsItem';
import ConfirmModal from '../../common/confimModal/confirmModal.js';
import OperationStatusPrompt from '../../form/operationStatusPrompt/operationStatusPrompt.js';
import Spinner from '../../common/spinner/spinner.js';
import { translate } from 'react-translate';
import { API_ENDPOINT } from '../../../api/index.js';
import EmptyContent from '../../common/empty-content/empty-content.js';
import { getEmployeeId } from '../../../services/methods.js';


class EmployeeQuarters extends React.PureComponent{
    state = {
        isLoadingQuarters: true,
        currentWatchedQuarterDetail: -1,
        quarterToDeleteId: -1,
        isChangingSomethingInQuarterList: false,
        isDeletingQuarter: false,

        markedQuestionsIds: {},
        isMarkedMoreThanOneQuestion: false,
        questionsToDeleteIds: [],
        openQuestionsToDeleteModal: false,
        isDeletingQuestions: false
    }

    functionsToUseForQuestions = [
        {name: "search", searchBy: "question", count: true },
        {name: "sort", sortBy: "question"}
    ];

    functionsToUseForQuarters = [
        {name: "filter", count: true, filterBy: "isDeleted",
            posibleValues: [{value: true, description: this.props.t("Deleted")}, {value: false, description: this.props.t("NotDeleted")}]}
    ];

    quarterFunctions = {
      togleMarkingQuestion: data => this.handleMarkingQuestions(data)
    };

    componentDidMount(){
      this.getQuartersForEmployeeHandler(getEmployeeId());
    }

    componentDidUpdate(prevProps, prevState){
        const { currentWatchedUser, history, quartersForEmployee } = this.props;
        const { state } = history.location;
        if(currentWatchedUser !== prevProps.currentWatchedUser){
            this.setState({isLoadingQuarters: true, markedQuestionsIds: {}});
            this.getQuartersForEmployeeHandler(currentWatchedUser);
        }
        if(this.state.currentWatchedQuarterDetail !== prevState.currentWatchedQuarterDetail) {
          this.setState({markedQuestionsIds: {}});
        }
    }

    quartersFunctionsHandler = (data, name) => {
      this.quarterFunctions[name](data);
    }

    handleMarkingQuestions = question => {
      const markedQuestionsIds = {...this.state.markedQuestionsIds};
      markedQuestionsIds[question.id] = markedQuestionsIds[question.id] ? false : true;
      const isMarkedMoreThanOneQuestion = Object.keys(markedQuestionsIds).findIndex(key => markedQuestionsIds[key]) !== -1;
      this.setState({markedQuestionsIds, isMarkedMoreThanOneQuestion});
    }

    takeOnlyMarkedQuestions = () => {
      const { markedQuestionsIds } = this.state;
      const questionsToDeleteIds = {};
      Object.keys(markedQuestionsIds).forEach(key => {
        if (markedQuestionsIds[key])
          questionsToDeleteIds[key] = markedQuestionsIds[key];
      });
      const openQuestionsToDeleteModal = Object.keys(questionsToDeleteIds).length > 0;
      this.setState({questionsToDeleteIds, openQuestionsToDeleteModal})
    }

    deleteMarkedQuestions = () => {
      const { currentWatchedQuarterDetail, questionsToDeleteIds } = this.state;
      const { quartersForEmployee, editQuarterTalkACreator } = this.props;
      this.setState({isDeletingQuestions: true});
      editQuarterTalkACreator(quartersForEmployee[currentWatchedQuarterDetail].id,
        quartersForEmployee[currentWatchedQuarterDetail], questionsToDeleteIds)
        .then(() => this.setState({isDeletingQuestions: false}))
        .catch(() => this.setState({isDeletingQuestions: false}));
    }

    getQuartersForEmployeeHandler = employeeId => {
        const { history, getQuartersForEmployeeACreator,
            changeCurrentWatchedUser, currentWatchedUser } = this.props;
        const { state } = history.location;
        getQuartersForEmployeeACreator(employeeId)
        .then(items => {
            let quarterIdToSet = 0;
            if(state){
                if(state.quarterTalkId){
                    quarterIdToSet = items.findIndex(item => item.id === state.quarterTalkId);
                }
            }
            if(employeeId !== currentWatchedUser){
                changeCurrentWatchedUser(employeeId);
                createLastWatchedPersonsArrayACreator(employeeId);
            }
            this.setState({isLoadingQuarters: false, currentWatchedQuarterDetail: quarterIdToSet});
        })
        .catch(() => {
            if(!getEmployeeId()){
                changeCurrentWatchedUser("");
            }
            this.setState({isLoadingQuarters: false});
        });
    }

    onClickOperationHandler = (quarter, operationName) => {
      const { reactivateQuarterTalkACreator, quartersForEmployee, generateQuarterDocACreator } = this.props;
      switch(operationName){
        case "delete":
          this.setState({quarterToDeleteId: quarter.id})
        break;
        case "reactivate":
          this.setState({isChangingSomethingInQuarterList: true});
          reactivateQuarterTalkACreator(quarter.id, quartersForEmployee).then(() => {
              this.setState({isChangingSomethingInQuarterList: false});
          }).catch(() => this.setState({isChangingSomethingInQuarterList: false}));
        break;
        case "generateDoc":
          window.open(`${API_ENDPOINT}/QuarterTalks/GenerateDocx/${quarter.id}`)
        break;
        default:
          const currentWatchedItemId = quartersForEmployee.findIndex(item => item.id === quarter.id);
          this.setState({currentWatchedQuarterDetail: currentWatchedItemId});
        break;
      }
    }

    handleQuarterTalkDelete = () => {
        const { deleteQuarterTalkACreator, quartersForEmployee } = this.props;
        const { quarterToDeleteId } = this.state;
        this.setState({isDeletingQuarter: true});
        deleteQuarterTalkACreator(quarterToDeleteId, quartersForEmployee).then(() => {
            this.setState({quarterToDeleteId: -1, isDeletingQuarter: false});
        }).catch(() => this.setState({isDeletingQuarter: false}));
    }

    closeConfirmDeleteModal = () => {
      this.setState({quarterToDeleteId: -1});
    }

    fillAnswersForQuarter = () => {
      const { quartersForEmployee } = this.props;
      const { currentWatchedQuarterDetail } = this.state;
      this.props.redirectToPopulatingQuarter(quartersForEmployee[currentWatchedQuarterDetail].id);
    }

    render(){
        const { isLoadingQuarters, currentWatchedQuarterDetail, quarterToDeleteId, isDeletingQuarter, isChangingSomethingInQuarterList, markedQuestionsIds,
          isMarkedMoreThanOneQuestion, openQuestionsToDeleteModal, isDeletingQuestions } = this.state;
        const { t, getQuartersForEmployee, quartersForEmployee,
            quartersForEmployeeStatus, quartersForEmployeeErrors, shouldLoadDataAfterLinkChange,
            generateDocStatus, generateDocErrors, generateQuarterDoc, currentWatchedUser } = this.props;
        return (
            <LoadHandlingWrapper errors={quartersForEmployeeErrors} closePrompt={() => getQuartersForEmployee([], null, [])}
                operationStatus={quartersForEmployeeStatus} isLoading={isLoadingQuarters}>
                <main className="employee-quarters">
                    <div className="quarters-list-container">
                        <List isDoingRequest={isChangingSomethingInQuarterList}
                        listClass="quarter-list" functionsToUse={this.functionsToUseForQuarters} componentProps={{
                            currentWatchedItemId: currentWatchedQuarterDetail,
                            subHeader: t("QuarterItemSubHeader"),
                            doneQuarter: t("DoneQuarter"),
                            incomingQuarter: t("IncomingQuarter"),
                            deleteTranslation: t("Delete"),
                            reactivate: t("Reactivate"),
                            conduct: t("Conduct"),
                            forQuarter: t("ForQuarter"),
                            connector: t("In"),
                            inYear: t("InYear"),
                            quarter: t("Quarter"),
                            QuarterDeletedPrompt: t("QuarterDeletedPrompt")
                        }}
                        shouldAnimateList
                        clickItemFunction={this.onClickOperationHandler}
                        items={quartersForEmployee}
                        component={QuarterListItem}
                        listTitle={`${t("QuaterTalks")} ${currentWatchedUser}`}
                        allKeysOfItems={["id", "isTaken", "year", "quarter" ,"quarterTalkQuestionItems", "questionerId", "plannedTalkDate"]}/>
                    </div>
                    <div className="quarter-detail">
                        {quartersForEmployeeStatus && quartersForEmployee[currentWatchedQuarterDetail] && quartersForEmployee[currentWatchedQuarterDetail].isTaken &&
                            <List functionsToUse={this.functionsToUseForQuestions} listTitle={t("SpeechState")} listClass="question-list"
                            clickItemFunction={this.quartersFunctionsHandler} componentProps={{markedQuestionsIds: markedQuestionsIds}}
                            component={QuarterDetailsItem} items={quartersForEmployee[currentWatchedQuarterDetail].quarterTalkQuestionItems}>

                              {isMarkedMoreThanOneQuestion &&
                                <Button onClick={this.takeOnlyMarkedQuestions} title={t("DeleteMarked")}
                                  mainClass="btn medium-btn danger-btn animated-icon-btn" ><i className="fa fa-times"/></Button>
                              }

                            </List>
                        }
                        {quartersForEmployeeStatus && quartersForEmployee[currentWatchedQuarterDetail] && !quartersForEmployee[currentWatchedQuarterDetail].isTaken &&
                            <EmptyContent action={this.fillAnswersForQuarter} sizeClass="quaters-size"
                                shouldShowTopIcon={t("startQuarterTranslation")}
                                content={t("NoAnswers")}
                                operationIcon="fa fa-plus"
                                mainIcon="fa fa-comments"
                            />
                        }
                    </div>
                </main>

                <ConfirmModal
                operation={this.handleQuarterTalkDelete} denyName={t("Deny")}
                operationName={t("Delete")} header={t("MakeSureYouWantDeleteQuarter")}
                onClose={this.closeConfirmDeleteModal} open={quarterToDeleteId !== -1}>
                    {isDeletingQuarter && <Spinner fontSize="3px" positionClass="abs-spinner"/>}
                </ConfirmModal>

                <ConfirmModal
                operation={this.deleteMarkedQuestions} denyName={t("Deny")}
                operationName={t("Delete")} header={t("MakeSureYouWantDeleteQuestion")}
                onClose={() => this.setState({questionsToDeleteIds: [], openQuestionsToDeleteModal: false})} open={openQuestionsToDeleteModal}>
                    {isDeletingQuestions && <Spinner fontSize="3px" positionClass="abs-spinner"/>}
                </ConfirmModal>

                {generateDocStatus === false &&
                  <OperationStatusPrompt closePrompt={generateQuarterDoc}
                      operationPromptContent={generateDocErrors[0]}
                      operationPrompt={false}
                  />
                }

            </LoadHandlingWrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
      quartersForEmployee: state.quarterTalks.quartersForEmployee,
      quartersForEmployeeStatus: state.quarterTalks.quartersForEmployeeStatus,
      quartersForEmployeeErrors: state.quarterTalks.quartersForEmployeeErrors,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getQuartersForEmployee: (quarter, status, errors) => dispatch(getQuartersForEmployee(quarter, status, errors)),
        getQuartersForEmployeeACreator: (employeeId) => dispatch(getQuartersForEmployeeACreator(employeeId)),
        deleteQuarterTalkACreator: (quarterToDeleteId, quartersForEmployee) => dispatch(deleteQuarterTalkACreator(quarterToDeleteId, quartersForEmployee)),
        reactivateQuarterTalkACreator: (quarterId, quartersForEmployee) => dispatch(reactivateQuarterTalkACreator(quarterId, quartersForEmployee)),
        editQuarterTalkACreator: (id, currentQuarter, questionsToDeleteIds) => dispatch(editQuarterTalkACreator(id, currentQuarter, questionsToDeleteIds))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(translate("Quaters")(EmployeeQuarters));
