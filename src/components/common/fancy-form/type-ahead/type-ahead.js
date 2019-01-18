import React from 'react';
import { runSingleValidation } from '../index';
import { AheadClassContext } from './index';

import './type-ahead.scss';
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
      this.setState({isLoading: false, isListEmpty: null});
      clearTimeout(this.delayTimeout);
    }

    if (error) {
      this.setState({isLoading: false});
    }
    else if(value.length > 0) {
      this.delayTimeout = setTimeout(() => {

        this.setState({isLoading: true, touched: true});

        requestFunction(value).then(dataList => {
          this.setState({isLoading: false, dataList, isListEmpty: dataList.length === 0});
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
    const { Consumer } = AheadClassContext;

    return (
      <Consumer>
        {aheadClass => (
          <div className={wrapperClass}>
            {aheadClass === "aheadClass" &&
              <label className="field-label">{label}</label>
            }
            <div className={aheadClass === 'aheadClass' ? 'field-block' : aheadClass}>

              <input onChange={this.handleRequest} type={type} placeholder={placeholder} value={value} />
              <div className="field-icon">
                { isLoading ? <div className="spinner-new spinner-new-small field-spinner" />: <i className={`fa ${icon}`} /> }
              </div>

              {renderDataList && renderDataList(dataList, this.resetAll, isListEmpty, isLoading)}

              {error && <div onClick={this.resetAll} className="empty-data-list field-error-color">{error}</div>}
            </div>
        </div>
        )}
      </Consumer>
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
