/** Absolute imports */
import { BrowserRouter } from "react-router-dom";
import { reduxForm } from "redux-form";

/** Utils */
import { cleanup, fireEvent, render, waitFor } from "../../../../../utils/testUtils";

/** Components */
import { ProfileDataForm } from './ProfileDataForm';

beforeEach(cleanup);

describe('ProfileDataForm', () => {

    const profile = {
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
    };

    const handler = jest.fn(() => Promise.resolve());

    const Decorated = reduxForm({
        form: 'edit-profile'
        //@ts-ignore
    })(ProfileDataForm)

    it('ProfileData Form renders with data. Changes user full name', async ()=>{

        const { getByTestId } = render(<BrowserRouter>
        {/*@ts-ignore*/}
            <Decorated onSubmit={handler} onCancel={jest.fn()} initialValues={profile} />
        </BrowserRouter>);

        fireEvent.change(getByTestId("fullName"), {
            target: { value: "Bob Marley" }
        });
        
        fireEvent.submit(getByTestId("submit"));

        expect(handler).toHaveBeenCalledWith({...profile, fullName: "Bob Marley"}, expect.anything(), expect.anything());
 
    });

});