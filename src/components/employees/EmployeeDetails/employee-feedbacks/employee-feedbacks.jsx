import React from 'react';
import { translate } from 'react-translate';
import { runSingleValidation } from '../../../common/fancy-form/index';
import Button from '../../../common/button/button';

import './employee-feedbacks.scss';
class EmployeeFeedbacks extends React.PureComponent {
  state = {
    isLoadingFeedbacks: this.props.feedbacksCache[this.props.employeeId] ? false : true,
    feedback: '',
    feedbackError: ''
  }

  componentDidMount = () => {
    if (!this.props.feedbacksCache[this.props.employeeId]) {
      this.handleLoadFeedbacks(this.props.employeeId);
    }
  }

  handleLoadFeedbacks = () => {
    this.setState({isLoadingFeedbacks: true});
    this.props.loadFeedbacks(this.props.employeeId);
  }

  componentDidUpdate = prevProps => {
    if (prevProps.feedbacksCache !== this.props.feedbacksCache) {
      this.setState({isLoadingFeedbacks: false});
    }
  }

  validationConfig = { required: true, minLength: 3, maxLength: 500 };

  onChangeFeedback = e => {
    const feedbackError = runSingleValidation(e.target.value, this.validationConfig, 'feedback');
    this.setState({feedback: e.target.value, feedbackError});
  }

  onKeyPressFeedback = e => {
    if(e.key === 'Enter') {
      e.preventDefault();
      this.handleSubmitFeedback();
    }
  }

  handleSubmitFeedback = () => {
    const feedbackError = runSingleValidation(this.state.feedback, this.validationConfig, 'feedback');
    if (!feedbackError) {
      this.handleAddFeedback();
    }
    this.setState({feedbackError});
  }

  handleAddFeedback = () => {
    const { employeeId, addFeedback } = this.props;
    addFeedback({
      description: this.state.feedback, isDeleted: false, projectId: 3, employeeId
    });
  }

  render() {
    const { t, feedbacksCache, employeeId, isAddingFeedback } = this.props;
    if (this.state.isLoadingFeedbacks) return <div className="spinner-new spinner-new-big spinner-new-center" />;

    if (feedbacksCache[employeeId] === null) {
      return (
        <div className="empty-list-comunicate">
          <p>{t("FeedbacksProblem")}</p>
          <i onClick={this.handleLoadFeedbacks} className="fas fa-sync-alt fa-lg clickable"></i>
        </div>
      );
    }

    if (feedbacksCache[employeeId]) {
      const feedbacksCount = feedbacksCache[employeeId].length;
      const { feedback, feedbackError } = this.state;
      return (
        <React.Fragment>
          <p className="important-par">{t("Feedbacks")} ({feedbacksCount})</p>

          {feedbacksCount > 0 ?
            <ul className="feedbacks-list">
              {feedbacksCache[employeeId].map(({id, author, description, project, projectId, client}) => (
                <li key={id} className="feedback">
                  <div className="feedback-header">
                    <img className="user-avatar-medium" src="https://drive.google.com/uc?export=download&id=1No_RfevuUMAQNHGgXWjtzFdT437gatnK" />
                    <span className="author">{author}</span>
                    <div className="project-name">
                      <span>{project} </span>
                      <span>({t("Project")})</span>
                    </div>
                  </div>
                  <article>{description}</article>
                </li>
              ))}
            </ul> :
            <div className="empty-list-comunicate">
              <p>{t("EmptyFeedbacks")}</p>
              <i className="fas fa-comments fa-lg"></i>
            </div>
          }

          <div className="flex-between-c add-feedback-footer">
            <textarea onKeyPress={this.onKeyPressFeedback}
              onChange={this.onChangeFeedback} value={feedback} className="field"></textarea>
            <Button onClick={this.handleSubmitFeedback}
              spinnerClass="spinner-new spinner-new-center"
              isLoading={isAddingFeedback} disable={feedbackError !== ''} mainClass="circle-button-35 dcmt-light-btn clickable">
              <i className="fa fa-plus"></i>
            </Button>
          </div>
        </React.Fragment>
      );
    }

    return null;

  }
}
export default translate('EmployeeFeedbacks')(EmployeeFeedbacks);
