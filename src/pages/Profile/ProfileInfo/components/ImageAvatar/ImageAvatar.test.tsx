/** Absolute imports */
import { BrowserRouter } from "react-router-dom";

/** Utils */
import { cleanup, fireEvent, render, screen, waitFor } from "../../../../../utils/testUtils";

/** Components */
import { ImageAvatar } from './ImageAvatar';

beforeEach(cleanup);

describe('ImageAvatar', () => {

    const props = {
        profile: {
            id: 'profile-id-1',
            userId: 'user-id-1',
            aboutMe: "I'm a programmer",
            lookingForAJob: true,
            lookingForAJobDescription: 'Full stack developer',
            fullName: 'Nikita Kirav',
            contacts: {
                github: 'https://github.com/NikitaKirav'
            },
            photos: {
                small: '/uploads/smallPhoto.jpg',
                large: '/uploads/largePhoto.jpg'
            }
        },
        isOwner: true,
        isAuth: true,
        onMainPhotoSelected: (e: any) => {},
        sendCorrectedMainPhoto: (e: any) => {}
    }

    it('Renders with buttons Edit photo', async ()=>{

        render(<BrowserRouter>
            <ImageAvatar  {...props} />
        </BrowserRouter>);

        expect(screen.getAllByText(/Edit photo/i).length).toBe(2); // First is for width screen and second for narrow one 
    });

    it('Click the Edit photo button and open a modal window', async ()=>{

        const { getByTestId, queryByText } = render(<BrowserRouter>
            <ImageAvatar  {...props} />
        </BrowserRouter>);

        expect(queryByText(/Upload new Image/i)).not.toBeInTheDocument()

        fireEvent.click(getByTestId("editPhotoButton"));

        await waitFor(() => {
            expect(screen.getByText(/Upload new Image/i)).toBeInTheDocument()
        });    

    });

});