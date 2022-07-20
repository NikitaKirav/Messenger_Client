/** Absolute imports */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Store */
import { ApplicationState } from '../../../../store';
import { makeGetMessage, makeGetMessages } from '../../../../store/chat/selectors';
import { ChatMessageType } from '../../../../store/chat/types';
import { Message } from '../Message/Message';

/** Styles */
import classes from '../../styles.module.scss';

interface MessagesSelectors {
    message: ChatMessageType | undefined;
    messages: ChatMessageType[];
}

export const Messages: React.FC = () => {
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(false);
    const localData = JSON.parse(localStorage.getItem('userData_Messanger') ?? '{}');
    const [data, setData] = useState<ChatMessageType[]>([]);

    const selectors = createStructuredSelector<
        ApplicationState,
        MessagesSelectors
    >({
        message: makeGetMessage(),
        messages: makeGetMessages(),
    });

    const { message, messages } = useSelector(selectors);

  
    useEffect(() => {
        setData(messages);
        setIsAutoScroll(true);
    }, [messages]);

    useEffect(() => {
        if (message)
            setData([...data, message]);
    }, [message]);

    useEffect(() => {
        if(isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView();
        }
    },[data])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true);
        } else {
            isAutoScroll && setIsAutoScroll(false);
        }
    }

    return (
        <div className={classes.messageList} onScroll={scrollHandler}>
            {data && data.map((m, index) => <Message key={index} message={m} userId={localData.userId} />)}
            <div ref={messagesAnchorRef}></div>
        </div>
    );
}