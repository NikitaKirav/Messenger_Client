/** Absolute imports */
import React from 'react';

export type ChatMessageType = {
    text: string
    fromPhoto: string
    from: string
    to: string
    updateDate: string
}

export const Message: React.FC<{message: ChatMessageType, userId: string}> = React.memo(({message, userId}) => {
    return (<>
        {userId === message.from ?
            <div className="myMessage message-orange" data-testid="myMessage">
                <div className="message-content">{message.text}</div>
                <div className="message-timestamp-left">{message.updateDate}</div>
            </div>
         :
            <div className="otherMessage message-blue" data-testid="otherMessage">
                <div className="message-content">{message.text}</div>
                <div className="message-timestamp-right">{message.updateDate}</div>
            </div>
        }
        </>
    );
});