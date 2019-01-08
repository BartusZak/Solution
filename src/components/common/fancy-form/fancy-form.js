import React from 'react';
import { validatorsFunctions, checkFormContainErrors, createSlotFunctionsNames, runSingleValidation } from './index';
import Select from './select';

export class InputSettings {
  constructor(label, validators, listData = [], needsSlot = false, component = 'input', componentProps = {className: 'field'}) {
    this.label = label;
    this.validators = validators;
    this.listData = listData;
    this.needsSlot = needsSlot;
    this.component = component;
    componentProps.placeholder = `type your ${label}...`;
    this.componentProps = componentProps;
  }
}

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
    }

    detectInitialValuesChanges = initialValues => {
        const values = {...initialValues, ...this.state.values};
        const formKeys = Object.keys(values);
        this.setState({values, formKeys});
    }

    putChanges = (value, key) => {
      const { settings, isFormDirty } = this.state;
      const values = {...this.state.values};
      const errors = {...this.state.errors};
      values[key] = value;
      errors[key] = runSingleValidation(values[key], settings[key].validators, settings[key].label);

      if (isFormDirty) this.setState({ values, errors, isFormInvalid: checkFormContainErrors(errors) });
      else this.setState({values, errors});

      return errors[key];
    }

    handleChangeFromEvent = (e, key) => this.putChanges(e.target.value, key);
    handleChangeDirectly = (value, key) => this.putChanges(value, key);


    runOnSubmitValidation = funcRef => {
        const { values, formKeys, settings } = this.state;
        const errors = {...this.state.errors};
        let isFormInvalid = false;
        formKeys.forEach(key => {
            errors[key] = runSingleValidation(values[key], settings[key].validators, settings[key].label);
            if (errors[key]) {
                isFormInvalid = true;
            }
        });
        this.setState({errors, isFormInvalid, isFormDirty: true}, () => funcRef(isFormInvalid));
    }

    handleSubmit = (e, values) => {
        e.preventDefault();
        this.runOnSubmitValidation(isFormInvalid => {
            if (!isFormInvalid) {
                this.props.onSubmit(this.state.values);
            }
        });
    }

    renderComponent = (settings, props) => {
        switch(settings.component) {
            case 'select':
              return <Select {...settings.componentProps} {...props} listData={settings.listData} />;
            default:
              return <input {...settings.componentProps} {...props} />;
        }
    }

    render() {
        const { formKeys, values, errors, isFormInvalid, isFormDirty, settings } = this.state;
        const { renderForm, renderSubmitBtn, btnTitle, formClass, inputWrapperClass, labelClass, errorClass, btnClass } = this.props;
        return (
            <React.Fragment>
                {renderForm ? renderForm(formKeys, values, errors, isFormInvalid, isFormDirty, this.handleChangeFromEvent, this.handleSubmit) :
                <form className={formClass} onSubmit={this.handleSubmit}>
                    {formKeys.map(key => {
                        if (settings[key].needsSlot && this.props[this.slots[key]])
                            return this.props[this.slots[key]](key, values[key], errors[key], this.handleChangeFromEvent, this.handleChangeDirectly);

                        else {
                            return (
                                <section className={inputWrapperClass} key={key}>
                                    <label className={labelClass}>{settings[key].label}</label>

                                    {this.renderComponent(settings[key], {
                                        value: values[key], onChange: e => this.handleChangeFromEvent(e, key)
                                    })}

                                    <p className={errorClass}>{errors[key]}</p>
                                </section>
                            );
                        }
                    })}

                    {renderSubmitBtn ? renderSubmitBtn(this.handleSubmit) :
                        <button className={btnClass} type="submit" disabled={isFormInvalid}>
                            {btnTitle}
                        </button>
                    }

                </form>
                }
            </React.Fragment>
        )
    }
}

FancyForm.defaultProps = {
    formClass: 'form',
    inputWrapperClass: 'fields-wrapper-col',
    labelClass: 'field-label',
    errorClass: 'field-error',
    btnClass: 'label-submit',
    btnTitle: 'submit'
};

export default FancyForm;
