import React from 'react';
import { validatorsFunctions, checkFormContainErrors, createSlotFunctionsNames } from './index';
import Input from './input';
import Select from './select';
import './fancy-form.scss';

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
    slots;
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

    handleChange = (e, key) => {
        const values = {...this.state.values};
        const errors = {...this.state.errors};
        values[key] = e.target.value;
        errors[key] = this.runSingleValidation(key, values[key]);

        if (this.state.isFormDirty) this.setState({ values, errors, isFormInvalid: checkFormContainErrors(errors) });
        else this.setState({values, errors});

        return errors[key];
    }

    runSingleValidation = (key, value) => {
        const { settings } = this.state;
        const { validators, label } = settings[key];
        for(let vk in validators) {
            const expectedVal = validators[vk];
            const error = validatorsFunctions[vk](value, expectedVal, label);
            if (error) return error;
        }
        return '';
    }

    runOnSubmitValidation = funcRef => {
        const { values, formKeys } = this.state;
        const errors = {...this.state.errors};
        let isFormInvalid = false;
        formKeys.forEach(key => {
            errors[key] = this.runSingleValidation(key, values[key]);
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
                return <Input {...settings.componentProps} {...props} />;
        }
    }

    render() {
        const { formKeys, values, errors, isFormInvalid, isFormDirty, settings } = this.state;
        const { renderForm, renderSubmitBtn, btnTitle, formClass, inputWrapperClass, labelClass, errorClass, btnClass } = this.props;
        return (
            <React.Fragment>
                {renderForm ? renderForm(formKeys, values, errors, isFormInvalid, isFormDirty, this.handleChange, this.handleSubmit) :
                <form className={formClass} onSubmit={this.handleSubmit}>
                    {formKeys.map(key => {
                        if (settings[key].needsSlot && this.props[this.slots[key]])
                            return this.props[this.slots[key]](key, values[key], errors[key], this.handleChange, this.handleSubmit);

                        else {
                            return (
                                <section className={inputWrapperClass} key={key}>
                                    <label className={labelClass}>{settings[key].label}</label>

                                    {this.renderComponent(settings[key], {
                                        value: values[key], onChange: e => this.handleChange(e, key)
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
    inputWrapperClass: 'fields-wrapper',
    labelClass: 'field-label',
    errorClass: 'field-error',
    btnClass: 'label-submit',
    btnTitle: 'submit'
};

export default FancyForm;
