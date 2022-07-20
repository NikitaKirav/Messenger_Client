/** Absolute imports */
import { BrowserRouter } from "react-router-dom";

/** Utils */
import { render } from "../../utils/testUtils";

/** Components */
import { ChatList } from './ChatList';


describe('ChatList', () => {

    it('ChatList renders with a message from user1', async ()=>{
        const data = {
            handleInfiniteOnLoad: () => {},
            isLoading: false,
            hasMore: false,
            data: [
                {
                    from: 'user-id-1',
                    to: 'user-id-2',
                    fromPhoto: '/uploads/photo-user-1.jpg',
                    toPhoto: '/uploads/photo-user-2.jpg',
                    updateDate: '7/7/2022, 8:30:43 AM',
                    text: 'Hello Bob!',
                    fromUserName: 'Cameron',
                    toUserName: 'Bob',
                    userId: 'user-id-1'
                }
            ]
        }


        const {debug, findByText, queryByText} = render(<BrowserRouter>
            <ChatList {...data} />
        </BrowserRouter>);
        expect(await findByText(/Hello Bob!/i)).toBeInTheDocument();
 
    });

});