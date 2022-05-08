/** Absolute imports */
import React from 'react';
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';

/** Ant design */
import { Input as InputAntD } from 'antd';

/** Utils */
import { FieldValidatorType } from '../../utils/validators/validators';

/** Styles */
import classes from './styles.module.scss';


type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormControlPropsType> = ({ meta: {touched, error}, children })  => {
    const hasError = touched && error;
    return (
        <div className={classes.formControl + " " + (hasError ? classes.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    );
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const { TextArea } = InputAntD;
    const {input, meta, ...restProps} = props;
    return (
            <FormControl {...props}>
                <TextArea {...input} {...restProps}  />
            </FormControl>
    );
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;

    return (
        <FormControl {...props}>
            <InputAntD {...input} {...props}  />
        </FormControl>
);
}

export const Checkbox: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return (
            <input type="checkbox"
                name={input.name}
                checked={input.value}
                onChange={(event) => {
                    return input.onChange(!input.value);
                }}/>
    );
}

export function createField<FormsKeysType extends string>(placeholder: string | undefined, 
                            name: FormsKeysType, 
                            validators: Array<FieldValidatorType>, 
                            component: React.FC<WrappedFieldProps>, 
                            props = {}, text = "") {
    return(
    <div>
        <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props} />
        {text}
    </div>
    );
}

