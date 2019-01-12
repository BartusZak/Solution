import React from 'react'
import { translate } from 'react-translate';
import { connect } from 'react-redux';

import TypeAhead from '../../common/fancy-form/type-ahead/type-ahead';
import { loadEmployees } from '../../../actions/employeesActions';

import Button from '../../common/button/button';

class EmployeeSearcher extends React.PureComponent {

  getEmployees = value => {
    const config = {
      limit: 1000, ascending: true, query: value,
      employeeFilter: {
        hasAccount: true
      }
    };
    const page = 1;
    const limit = 25;

    return this.props.loadEmployees(page, limit, config);
  }

  employeeValidators = { minLength: 2, maxLength: 15 };

  render(){
      const { t, loadEmployees, emitEmployeeClick } = this.props;
      return (
        <TypeAhead label={t("Employee")}
          placeholder={t("EmployeeSearcherPlaceholder")}
          requestFunction={value => this.getEmployees(value)}
          validators={this.employeeValidators}
          renderDataList={(dataList, resetAll, isListEmpty) => {
            if(isListEmpty === false) {
              return (
                <ul className="input-data-list">
                  {dataList.map(item => (
                    <li onClick={() => {
                      resetAll();
                      emitEmployeeClick(item.id);
                    }}
                      key={item.id}>
                      {item.fullName}
                    </li>
                  ))}
                  <li className="list-footer">
                    <Button title="CLOSE" onClick={resetAll} mainClass="label-btn main"/>
                  </li>
                </ul>
              );
            }
            else if(isListEmpty) return <div onClick={resetAll} className="empty-data-list">{t("EmptyEmployeeQuery")}</div>;
          }}/>
      );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadEmployees: (page, limit, other) => dispatch(loadEmployees(page, limit, other))
  }
}

export default connect(null, mapDispatchToProps)(translate("EmployeeSearcher")(EmployeeSearcher));

