/** Absolute imports */
import { BrowserRouter } from "react-router-dom";

/** Utils */
import { cleanup, fireEvent, render, screen, waitFor } from "../../../../../utils/testUtils";

/** Components */
import { ProfileData } from './ProfileData';

beforeEach(cleanup);

describe('ProfileData', () => {

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
        goToEditMode: () => {},
    }

    it('Renders profile data', async ()=>{

        render(<BrowserRouter>
            <ProfileData  {...props} />
        </BrowserRouter>);

        expect(screen.getByText(/I'm a programmer/i)).toBeInTheDocument();
        expect(screen.getByText(/Full stack developer/i)).toBeInTheDocument(); 
    });

});