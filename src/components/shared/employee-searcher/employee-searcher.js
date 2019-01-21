import React from 'react'
import { translate } from 'react-translate';
import { connect } from 'react-redux';
import { loadEmployees } from '../../../actions/employeesActions';
import TypeAhead from '../../common/fancy-form/type-ahead/type-ahead';
import Button from '../../common/button/button';

class EmployeeSearcher extends React.PureComponent {

  getEmployees = value => {
    const { employeeFilter } = this.props;
    const config = {
      limit: 1000, ascending: true, query: value, isDeleted: false,
      employeeFilter: employeeFilter ? employeeFilter : { hasAccount: true }
    };
    const page = 1;
    const limit = 1000;
    return this.props.loadEmployees(page, limit, config);
  }

  employeeValidators = { minLength: 2, maxLength: 15 };

  render(){
      const { t, emitEmployeeClick, placeholder } = this.props;
      return (
        <TypeAhead label={t("Employee")}
          placeholder={t(placeholder)}
          requestFunction={value => this.getEmployees(value)}
          validators={this.employeeValidators}
          renderDataList={(dataList, resetAll, isListEmpty) => {
            if(isListEmpty === false) {
              return (
                <div className="input-data-list">
                  <ul>
                    {dataList.map(item => (
                      <li onClick={() => {
                        resetAll();
                        emitEmployeeClick(item);
                      }}
                        key={item.id}>
                        {item.fullName}
                      </li>
                    ))}
                  </ul>
                  <div className="list-footer">
                    <Button title="CLOSE" onClick={resetAll} mainClass="label-btn main"/>
                  </div>
                </div>
              );
            }
            else if(isListEmpty) return <div onClick={resetAll} className="empty-data-list">{t("EmptyEmployeeQuery")}</div>;
          }}/>
      );
  }
}

EmployeeSearcher.defaultProps = {
  placeholder: 'EmployeeSearcherPlaceholder'
}

const mapDispatchToProps = dispatch => {
  return {
    loadEmployees: (page, limit, other) => dispatch(loadEmployees(page, limit, other))
  }
}

export default connect(null, mapDispatchToProps)(translate("EmployeeSearcher")(EmployeeSearcher));
