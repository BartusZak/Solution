import React, { Component } from "react";
import * as asyncActions from "../../../actions/asyncActions";
import { deleteSkill, getAllSkillsACreator, editSkillACreator } from '../../../actions/skillsActions';
import { ACTION_CONFIRMED } from "../../../constants";
import { bindActionCreators } from "redux";
import { translate } from "react-translate";
import { connect } from "react-redux";

class SkillList extends Component {
  constructor(props){
    super(props);
    this.state = {
      hoveredIndex: -1,
      editingSkillIndex: -1,
      selectedIndex: -1,
      editingInputId: -1,
      editInputValue: '',
      editingSubmited: false,
      editingError: '',
      saveIconClass: 'fa fa-save'
    };

    this.myRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.myRef && this.state.editingSkillIndex !== -1 && !this.myRef.current.contains(event.target)) {
      this.closeEdit();
    }
  }


  componentWillReceiveProps(nextProps){
    if (this.validatePropsForAction(nextProps, "deleteSkill")) {
      this.props.async.setActionConfirmationProgress(true);
      this.props.deleteSkill(
        this.props.toConfirm.skillId,
      ).then(resposne => {
        this.props.getAllSkills([]);
        this.setState({
          selectedIndex: -1
        })
      });
    }

    if(nextProps.editedSkillError !== this.props.editedSkillError) {
      this.setState({
        editingError: nextProps.editedSkillError
      })
    }
  }

  validatePropsForAction(nextProps, action) {
    return (
      nextProps.confirmed &&
      !nextProps.isWorking &&
      nextProps.type === ACTION_CONFIRMED &&
      nextProps.toConfirm.key === action
    );
  }

  handleHover = (index) => {
    if(index === this.state.hoveredIndex)
    {
      index = -1;
    }
    this.setState({
      hoveredIndex: index
    })
  }

  checkHoveredIndex = (index) => {
    const {hoveredIndex} = this.state;

    if(hoveredIndex === index) {
      return true;
    } else {
      return false;
    }
  }

  toogleEdit = (index, value, id) => {
    this.setState({
      editingSkillIndex: index,
      editInputValue: value,
      editingInputId: id
    })
  }

  closeEdit = () => [
    this.setState({
      editingSkillIndex: -1,
      editInputValue: '',
      editingInputId: -1,
      editingError: ''
    })
  ]

  checkEditingIndex = (index) => {
    const {editingSkillIndex} = this.state;

    if(editingSkillIndex === index) {
      return true;
    } else {
      return false;
    }
  }

  handleEditInputChange = (e, t) => {
    if(e.target.value.length > 100)
    {
      this.setState({
        editingError: t("SkillLenghtError")
      })
    } else {
      this.setState({
        editInputValue: e.target.value,
        editingError: ''
      })
    }
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.editSkillSubmit();
    }
  }

  editSkillSubmit = () => {
    const { editInputValue, editingInputId} = this.state;
    this.setState({
      saveIconClass: 'fa fa-save animate'
    });
    this.props.editSkillACreator(editingInputId, editInputValue)
      .then(resopnse => {this.setState({saveIconClass: 'fa fa-save edit-icon'}); this.closeEdit()})
      .catch(error => {this.setState({saveIconClass: 'fa fa-save edit-icon'})});
  }

  deleteSkill = (skillName, skillId, t) => {
    this.props.async.setActionConfirmation(true, {
      key: "deleteSkill",
      string: t("DeleteSkillQuestion") + ` : ${skillName}`,
      skillId,
      successMessage: t("SuccessfullyDeletedSkill")
    });
  };


  render() {
    const {skills, showNewAddingTemplate, newSkillName, newSkillNameError, newAddedCounter, newAddSkillColor, t} = this.props;
    const { editInputValue, saveIconClass } = this.state;
    let skillListMarkup = null;

    if(skills.length === 0){
      skillListMarkup = <div className="empty-list-container"><p className="empty-list-sk">{t("NoResults")}</p></div>;
    }
    else{
      skillListMarkup = (
        <ul ref={this.myRef}>
            {showNewAddingTemplate && !newSkillNameError &&
            <li className="new-adding-template">
                <span>{newSkillName}</span>
                <b style={{background: newAddSkillColor}}></b>
            </li>}
            {skills.map((skill, index) => (
              <React.Fragment key={skill.skill.name}>
               <li className={this.state.selectedIndex === skill.skill.id ? "selected-row" : ""} onMouseEnter={() => this.handleHover(index)} onMouseLeave={() => this.handleHover(index)} onClick={() => {this.setState({selectedIndex: skill.skill.id}); this.props.skillChoosen(skill.skill.id, skill.skill.name)}}>
                    <span>
                      {skill.class &&
                        <i className={skill.class}>N</i>
                      }
                      <b style={{background: skill.color}}></b>
                      {this.checkEditingIndex(index)
                      ?
                        <div className='edit-input-container'>
                          <input type="text" className='skill-edit-input' value={editInputValue} onChange={(e) => this.handleEditInputChange(e, t)} onKeyPress={(e) => this.handleKeyPress(e)}/>
                          <i className="fa fa-times close" title={t("CloseEdit")} onClick={() => this.closeEdit()}></i>
                        </div>
                      :
                        <div className='name'>
                          {skill.skill.name}
                        </div>
                      }
                    </span>

                    {this.checkHoveredIndex(index) && !this.checkEditingIndex(index) &&
                      <div className="operations-container slide-left">
                        <i className="fa fa-edit" title={t("EditSkill")} onClick={() => {this.toogleEdit(index, skill.skill.name, skill.skill.id)}}></i>
                        <i className="fa fa-times" title={t("DeleteSkill")} onClick={() => this.deleteSkill(skill.skill.name, skill.skill.id, t)}></i>
                      </div>}

                    {this.checkEditingIndex(index) &&
                      <div className="operations-container slide-left">
                        <i className={saveIconClass} title={t("SaveChanges")} onClick={() => {this.editSkillSubmit()}}></i>
                      </div>
                    }

                </li>
                {this.state.editingError !== '' && this.checkEditingIndex(index) && <div className="editing-skill-error">{this.state.editingError}</div>}
            </React.Fragment>
            ))}
        </ul>
      );
    }

    return skillListMarkup;
  }
}

const mapStateToProps = state => {
  return {
    confirmed: state.asyncReducer.confirmed,
    toConfirm: state.asyncReducer.toConfirm,
    isWorking: state.asyncReducer.isWorking,
    type: state.asyncReducer.type,

    editedSkillError: state.skillsReducer.editedSkillError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteSkill: skillId => dispatch(deleteSkill(skillId)),
    async: bindActionCreators(asyncActions, dispatch),
    getAllSkillsACreator: currentSkills =>
      dispatch(getAllSkillsACreator(currentSkills)),
    editSkillACreator: (skillId, skillName) => dispatch(editSkillACreator(skillId, skillName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate("SkillList")(SkillList));
