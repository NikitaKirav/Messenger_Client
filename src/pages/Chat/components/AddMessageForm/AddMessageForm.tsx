/** Absolute imports */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Ant design */
import { Avatar, Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

/** Services */
import { StatusType } from '../../../../services/api-ws';

/** Store */
import { ApplicationState } from '../../../../store';
import { sendMessage } from '../../../../store/chat/actions';
import { makeGetUserAvatar } from '../../../../store/chat/selectors';
import { UserAvatarType } from '../../../../store/chat/types';

/** Styles */
import classes from '../../styles.module.scss';
import { baseUrl } from '../../../../services/baseURL';

type PathParamsType = {
    userId: string;
    status: StatusType;
}

interface AddMessageFormSelectors {
    avatars: UserAvatarType | undefined;
}

const { TextArea } = Input;

export const AddMessageForm: React.FC<PathParamsType> = ({userId, status}) => {
    let [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const localData = JSON.parse(localStorage.getItem('userData_Messanger') ?? '{}');
    const [avatar, setAvatar] = useState('');

    const selectors = createStructuredSelector<
        ApplicationState,
        AddMessageFormSelectors
    >({
        avatars: makeGetUserAvatar()
    });

    const { avatars } = useSelector(selectors);

    useEffect(() => {
        if (localData.userId) {
            if(avatars && avatars.userAvatar) {
                setAvatar(avatars.userAvatar);
            }
        }
    }, [avatars])
    
    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessage(localData.userId, message.replace (/[\n\r]/g, ' ').replace (/\s{2,}/g, ' '), userId));
        setMessage('');
    }

    return (
        <div className={classes.addMessageform}>
            {avatar ? <Avatar src={baseUrl + avatar} alt={localData.userName??''} /> : <Avatar size={32} icon={<UserOutlined />} />}
            <div style={{width: '100%', marginLeft: '15px'}}>                
                <TextArea showCount onChange={(e) => setMessage(e.target.value)} value={message}  autoSize={{ minRows: 2, maxRows: 6 }} />
                <Button className={classes.sendButton} type="primary" disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
            </div>
        </div>
    );
}