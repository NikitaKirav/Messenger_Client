/** Absolute imports */
import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';

/** Components */
import { createField, Textarea } from '../../../../components/FormsControls/FormsControls';

/** Utils */
import { maxLengthCreator, required } from '../../../../utils/validators/validators';
import { NewMessageFormValuesType } from '../../types';

const maxLength50 = maxLengthCreator(50);
type NewMessageFormValuesKeys = Extract<keyof NewMessageFormValuesType, string>;

const AddMessage: React.FC<InjectedFormProps<NewMessageFormValuesType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                { createField<NewMessageFormValuesKeys>("Enter you message...", "newMessageBody", [required, maxLength50], Textarea) }
            </div>
            <div><button>Send</button></div>
        </form>
    );
}

export const AddMessageForm = reduxForm<NewMessageFormValuesType>({form: "dialogAddMessageForm"})(AddMessage);