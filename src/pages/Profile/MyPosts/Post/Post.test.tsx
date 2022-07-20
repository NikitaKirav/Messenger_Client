/** Absolute imports */
import { BrowserRouter } from "react-router-dom";

/** Utils */
import { cleanup, fireEvent, render, screen, waitFor } from "../../../../utils/testUtils";

/** Components */
import { Post } from './Post';

beforeEach(cleanup);

describe('Post', () => {

    const props = {
        post: {
            id: 'post-id-1',
            userId: 'user-id-1',
            avatar: '/uploads/avatar-user1.jpg',
            createDate: '7/8/2022, 2:15:15 PM',
            text: 'First post!',
            userName: 'Kira',
            likes: 555,
            dislikes: 23,
            userLike: 'liked'   //User has his like
        },
        userId: 'user-id-1',
        isAuth: true
    }

    it('Post renders with data', async ()=>{

        render(<BrowserRouter>
            <Post  {...props} />
        </BrowserRouter>);

        expect(screen.getByText(/Kira/i)).toBeInTheDocument();
        expect(screen.getByText(/First post!/i)).toBeInTheDocument();
    });

    it('Click a dislike. Likes become less, Dislikes become more', async ()=>{

        const { getByTestId } = render(<BrowserRouter>
            <Post  {...props} />
        </BrowserRouter>);

        fireEvent.click(getByTestId("dislike"));

        await waitFor(() => {
            expect(screen.getByText(/554/i)).toBeInTheDocument() //Likes become less 555-1=554
            expect(screen.getByText(/24/i)).toBeInTheDocument()  //Dislikes become more 23+1=24 
        });    

    });

});