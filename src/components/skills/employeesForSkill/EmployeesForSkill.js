import React, { Component } from "react";
import { translate } from "react-translate";
import './EmployeesForSkill.scss';
import { API_ENDPOINT } from '../../../api';
import EmployeeCard from './EmployeeCard';

class EmployeesForSkill extends Component {
  constructor(props){
    super(props);
    this.state={
      selectClass:'',
      selectedOption: this.props.t("ChooseOption"),
      selectedOptionKey: '',
      sortedEmployees: []
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if(this.props.employeesBySkill !== nextProps.employeesBySkill)
    {
      this.setState({
        selectedOption: this.props.t("ChooseOption"),
        selectedOptionKey: '',
      })
    }
  }

  inHoverSelect = () => {
    this.setState({
      selectClass:'list-visible'
    })
  }

  outHoverSelect = () => {
    this.setState({
      selectClass:''
    })
  }

  changeSelectedOption = (value, optionName) => {
    const { employeesBySkill } = this.props;

    if(value === 'exp') {

      if(employeesBySkill && employeesBySkill.length > 0) {
        const sortedEmployees = employeesBySkill.sort((a,b) => b.experience - a.experience)
        this.setState({
          sortedEmployees: sortedEmployees
        })
      }

      this.setState({
        selectedOption: optionName,
        selectedOptionKey: value
      })
    }

    if(value === 'lvl') {

      if(employeesBySkill && employeesBySkill.length > 0) {
        const sortedEmployees = employeesBySkill.sort((a,b) => b.skillLevel - a.skillLevel)
        this.setState({
          sortedEmployees: sortedEmployees
        })
      }

      this.setState({
        selectedOption: optionName,
        selectedOptionKey: value
      })
    }
  }

  render() {
    const { selectedOptionKey } = this.state;
    const { t } = this.props;

    return (
      <div className="employees-for-skill-container">
        <div className="header">{t("EmployeesWithSkill")}</div>
        <div className="sort-by-header" onMouseEnter={() => this.inHoverSelect()} onMouseLeave={() => this.outHoverSelect()}>{t("SortingBy")}
          <div className="sorting-by-option">{this.state.selectedOption}
            <ul className={this.state.selectClass}>
              {selectedOptionKey === 'exp'
                ? <li className="selected" onClick={() => this.changeSelectedOption('exp', t("YearsOfExp"))}>{t("YearsOfExp")}</li>
                : <li onClick={() => this.changeSelectedOption('exp', t("YearsOfExp"))}>{t("YearsOfExp")}</li>}
              {selectedOptionKey === 'lvl'
                ? <li className="selected" onClick={() => this.changeSelectedOption('lvl', t("SkillLvl"))}>{t("SkillLvl")}</li>
                : <li onClick={() => this.changeSelectedOption('lvl', t("SkillLvl"))}>{t("SkillLvl")}</li>}
            </ul>
          </div>
        </div>

        <div className="employees-for-skill-list-container">
          {this.props.employeesBySkill && this.props.employeesBySkill.map((employee, index) => {
            return (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                history={this.props.history}
                language={this.props.language}
              />
            )
          })}
        </div>

      </div>
    )
  }
}

export default translate("EmployeesForSkill")(EmployeesForSkill);
