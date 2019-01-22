import React, { Component } from 'react';
import { translate } from 'react-translate';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { languageChange } from '../../actions/languageActions';

import './TranslationsSwitch.css';

class TranslationsSwitch extends Component {
  state = {};

  createOnChangeHandler = available => ({ currentTarget }) => {
    this.props.languageChange(
      currentTarget.options[currentTarget.selectedIndex].value
    );
  };

  render() {
    const { t, language } = this.props;
    const available = ['pl', 'en'];

    return (
      <div className="language-changer-container">
        <span>{t('CHANGE_LANGUAGE')}</span>
        <select
          value={language}
          onChange={this.createOnChangeHandler(available)}
        >
          {available.map((item, index) => (
            <option className={`flag-${item}`} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { language: state.languageReducer.language };
};

function mapDispatchToProps(dispatch) {
  return {
    languageChange: bindActionCreators(languageChange, dispatch)
  };
}

export default translate('TranslationsSwitch')(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TranslationsSwitch)
);
