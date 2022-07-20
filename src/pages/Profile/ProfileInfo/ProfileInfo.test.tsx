/** Absolute imports */
import { BrowserRouter } from "react-router-dom";
import { reduxForm } from "redux-form";

/** Utils */
import { cleanup, fireEvent, render, screen, waitFor } from "../../../utils/testUtils";

/** Components */
import { ProfileInfo } from './ProfileInfo';

beforeEach(cleanup);

describe('ProfileInfo', () => {

    const props = {
        profile: {
            id: 'profile-id-1',
            userId: 'user-id-1',
            aboutMe: "I'm a programmer",
            lookingForAJob: true,
            lookingForAJobDescription: 'Full stack developer',
            fullName: 'Cameron Diaz',
            contacts: {
                github: 'https://github.com/NikitaKirav'
            },
            photos: {
                small: '/uploads/smallPhoto.jpg',
                large: '/uploads/largePhoto.jpg'
            }
        },
        isOwner: true,
        status: 'test status',
        isAuth: true
    }

    it('Renders profile data', async ()=>{

        render(<BrowserRouter>
            <ProfileInfo  {...props} />
        </BrowserRouter>);

        expect(screen.getAllByText(/Cameron Diaz/i).length).toBe(2);
        expect(screen.getByText(/Full stack developer/i)).toBeInTheDocument(); 
    });

});