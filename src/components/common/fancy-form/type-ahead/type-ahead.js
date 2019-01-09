import React from 'react';
import './type-ahead.scss';

import { validatorsFunctions, runSingleValidation } from '../index';

class TypeAhead extends React.PureComponent {
  state = {
    isLoading: false,
    error: '',
    value: '',
    dataList: [],
    isListEmpty: null
  };
  delayTimeout;

  handleRequest = e => {
    const { validators, label, requestFunction, delay } = this.props;
    const { value } = e.target;
    const error = runSingleValidation(value, validators, label);

    if(this.delayTimeout) {
      this.setState({isLoading: false});
      clearTimeout(this.delayTimeout);
    }

    if (error) {
      this.setState({isLoading: false});
    }
    else {
      this.delayTimeout = setTimeout(() => {

        this.setState({isLoading: true, touched: true});

        requestFunction(value).then(dataList => {
          if (dataList) this.setState({isLoading: false, dataList, isListEmpty: dataList.length === 0});

          else this.setState({isLoading: false});

        }).catch(error => this.setState({isLoading: false, error}));

      }, delay);
    }

    this.setState({value, error});
  }

  resetAll = () => {
    this.setState({dataList: [], value: '', error: '', isListEmpty: null});
  }

  render() {
    const { isLoading, isListEmpty, error, value, dataList } = this.state;
    const { icon, type, label, wrapperClass, placeholder, renderDataList } = this.props;

    return (
      <React.Fragment>

        <div className={wrapperClass}>
          <label className="field-label">{label}</label>
          <div className="field-block">

            <input onChange={this.handleRequest} type={type} placeholder={placeholder} value={value} />
            <div className="field-icon">
              { isLoading ? <div className="spinner-new type-ahead-spinner" />: <i className={`fa ${icon}`} /> }
            </div>

            {renderDataList && renderDataList(dataList, this.resetAll, isListEmpty, isLoading)}

            {error && <div onClick={this.resetAll} className="empty-data-list">{error}</div>}
          </div>
        </div>

      </React.Fragment>
    );
  }
}

TypeAhead.defaultProps = {
  icon: 'fa-search',
  type: 'text',
  wrapperClass: 'fields-wrapper-col',
  delay: 500
};

export default TypeAhead;
