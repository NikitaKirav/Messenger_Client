/** Absolute imports */
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';

/** Components */
import { DialogItem } from './components/DialogItem/DialogItem';
import { Message } from './components/Message/Message';
import { AddMessageForm } from './components/AddMessageForm/AddMessageForm';

/** Store */
import { sendMessage } from '../../store/dialog/actions';
import { ApplicationState } from '../../store';
import { makeGetDialogs, makeGetMessages } from '../../store/dialog/selectors';
import { DialogType, MessageType } from '../../store/dialog/types';

/** Style */
import classes from './styles.module.scss';

/** Types */
import { NewMessageFormValuesType } from './types';


interface DialogsPageSelectors {
    dialogs: DialogType[];
    messages: MessageType[];
}

export const DialogsPage = () => {

    const dispatch = useDispatch();

    let addNewMessage = (values: NewMessageFormValuesType) => {
        dispatch(sendMessage(values.newMessageBody));
    } 

    const selectors = createStructuredSelector<
        ApplicationState,
        DialogsPageSelectors
    >({
        dialogs: makeGetDialogs(),
        messages: makeGetMessages()
    });

    const { dialogs, messages } = useSelector(selectors);

    let dialogElement = dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    let messageElement = messages.map(m => <Message message={m.message} key={m.id}/>);

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs_items}>
                {dialogElement}
            </div>
            <div className={classes.messages}>
                <div>{messageElement}</div>
                <AddMessageForm onSubmit={addNewMessage.bind(this)} />
            </div>                
        </div>
    );
}
