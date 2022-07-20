/** Absolute imports */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

/** Ant design */
import { message } from 'antd';

/** Services */
import { StatusType } from '../../services/api-ws';

/** Store */
import { ApplicationState } from '../../store';
import { makeGetcChatList, makeGetStatus } from '../../store/chat/selectors';
import { LastMessageInChatList } from '../../store/chat/types';
import { getChatList } from '../../store/chat/actions';

/** Styles */
import { ChatList } from './ChatList';



interface ChatListSelectors {
    status: StatusType;
    chatList: LastMessageInChatList[];
}

export const ChatListContainer = () => {

    const [data, setData] = useState<LastMessageInChatList[]>([]);
    const [isLoading, changeIsLoading] = useState(false);
    const [hasMore, changeHasMore] = useState(true);
    const dispatch = useDispatch();


    const selectors = createStructuredSelector<
        ApplicationState,
        ChatListSelectors
    >({
        status: makeGetStatus(),
        chatList: makeGetcChatList()
    });

    const { status, chatList } = useSelector(selectors);

    
    const handleInfiniteOnLoad = () => {
        changeIsLoading(true);

        if (data.length > 14) {
          message.warning('Infinite List loaded all');
          changeIsLoading(false);
          changeHasMore(false);
          return;
        }
    };
    
    useEffect(() => {
        if(status === "ready") {
            dispatch(getChatList());
        }
    }, [status]);

    useEffect(() => {
        setData(chatList);
    }, [chatList])


    return (
        <ChatList handleInfiniteOnLoad={handleInfiniteOnLoad}
                  isLoading={isLoading}
                  hasMore={hasMore}
                  data={data} />
    );
}