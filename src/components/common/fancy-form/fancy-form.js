import React from 'react';
import { validatorsFunctions, checkFormContainErrors, createSlotFunctionsNames,
  runSingleValidation, runOnSubmitValidation } from './index';
import Select from './select';
import DatePicker from 'react-datepicker';
import TypeAndSelect from '../../common/fancy-form/fancy-data-list';
import Button from '../button/button';
import moment from 'moment';

import './fancy-form.scss';
export const dFormat = "YYYY/MM/DD";
export const minDate = "1994/01/01";
export const maxDate = "2100/01/01";

const now = moment();
const defaultDatePickerConfig = {
  minDate: moment(minDate),
  maxDate: moment(maxDate),
  dateFormat: dFormat,
  peekNextMonth: true,
  showMonthDropdown: true,
  showYearDropdown: true,
  dropdownMode: "select"
};

class FancyForm extends React.PureComponent {
    constructor(props) {
        super(props);
        const formKeys = Object.keys(props.initialValues);
        this.slots = createSlotFunctionsNames(props.settings, formKeys);
        this.state = {
            formKeys: formKeys,
            values: {...props.initialValues},
            errors: {},
            settings: {...props.settings},
            isFormDirty: false,
            isFormInvalid: false
        };
    }
    slots;

    componentDidUpdate = prevProps => {
        if (prevProps.initialValues !== this.props.initialValues) {
          this.detectInitialValuesChanges(this.props.initialValues);
        }
        if (prevProps.settings !== this.props.settings) {
          this.setState({settings: {...this.props.settings}});
        }
        if(prevProps.submitFromFlag !== this.props.submitFromFlag) {
          this.checkSubmitedData();
        }
    }

    componentWillUnmount() {
      const { onUnmount } = this.props;
      if (onUnmount) onUnmount(this.state.values);
    }

    detectInitialValuesChanges = initialValues => {
      const { values: oldValues, settings } = this.state;
      const values = {...initialValues}; const errors = {...this.state.errors}; const formKeys = Object.keys(values);
      let isFormInvalid = false;
      formKeys.forEach(key => {
        if (oldValues[key] !== values[key])
          errors[key] = runSingleValidation(values[key], settings[key].validators, settings[key].label);
        if (errors[key])
          isFormInvalid = true;
      });

      this.setState({values, formKeys, errors, isFormInvalid});
    }

    putChanges = (value, key) => {
      const { settings, isFormDirty } = this.state;
      const values = {...this.state.values};
      const errors = {...this.state.errors};
      values[key] = value;
      errors[key] = runSingleValidation(values[key], settings[key].validators, settings[key].label);

      if (isFormDirty) this.setState({ values, errors, isFormInvalid: checkFormContainErrors(errors) });
      else this.setState({values, errors});

    }

    handleChangeFromEvent = (e, key) => this.putChanges(e.target.value, key);
    handleDateChange = (date, key) => this.putChanges(date, key);
    handleChangeValues = values => { this.detectInitialValuesChanges(values); }

    checkSubmitedData = () => {
        const { values, formKeys, settings } = this.state;
        const { errors, isFormInvalid } = runOnSubmitValidation(values, formKeys, settings);
        if (!isFormInvalid) this.props.onSubmit(this.state.values);

        this.setState({errors, isFormInvalid, isFormDirty: true});
    }

    handleSubmit = (e, values) => {
        e.preventDefault();
        this.checkSubmitedData();
    }


    renderComponent = (settings, props) => {
      switch(settings.component) {
        case 'select':
          return <Select {...settings.componentProps} {...props} listData={settings.listData} />;
        case 'textarea':
          return <textarea {...settings.componentProps} {...props} style={{resize: 'none'}}></textarea>;
        case 'date-picker':
          return (
            <DatePicker {...defaultDatePickerConfig} {...settings.componentProps}
              onChange={date => this.handleDateChange(date, props.key)} selected={props.value ? props.value : null}
          />
          );
        case 'type-and-select':
          return <TypeAndSelect {...settings.componentProps} {...props} listName={props.key} listData={settings.listData} />
        default:
          return <input {...settings.componentProps} {...props} />;
      }
    }

    render() {
        const { formKeys, values, errors, isFormInvalid, isFormDirty, settings } = this.state;
        const { renderForm, renderSubmitBtn, btnTitle, formClass, inputWrapperClass, labelClass, errorClass, btnClass,
          isSubmiting } = this.props;
        return (
            <React.Fragment>
                {renderForm ? renderForm(formKeys, values, errors, isFormInvalid, isFormDirty, this.handleChangeFromEvent, this.handleSubmit) :
                <form className={formClass} onSubmit={this.handleSubmit}>
                    {formKeys.map(key => {
                        if (settings[key].needsSlot && this.props[this.slots[key]])
                            return this.props[this.slots[key]](key, values, this.handleChangeFromEvent, settings[key], errors, this.handleChangeValues);

                        else {
                            return (
                                <section className={inputWrapperClass} key={key}>
                                    <label className={labelClass}>
                                      {settings[key].label} {settings[key].validators ? settings[key].validators.required ? '*' : null : null}
                                    </label>

                                    {this.renderComponent(settings[key], {
                                        value: values[key], onChange: e => this.handleChangeFromEvent(e, key), key
                                    })}

                                    <p className={errorClass}>{errors[key]}</p>
                                </section>
                            );
                        }

                    })}

                    {renderSubmitBtn ? renderSubmitBtn(this.handleSubmit) :
                        <Button title={btnTitle} mainClass={btnClass} type="submit" disable={isFormInvalid || isSubmiting} />
                    }

                </form>
                }
            </React.Fragment>
        )
    }
}

FancyForm.defaultProps = {
    formClass: 'form animate-form-content',
    inputWrapperClass: 'fields-wrapper-col',
    labelClass: 'field-label',
    errorClass: 'field-error',
    btnClass: 'label-btn btn-submit-form ',
    btnTitle: 'submit'
};

export default FancyForm;
