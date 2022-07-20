/** Absolute imports */
import { BrowserRouter } from "react-router-dom";
import { reduxForm } from "redux-form";

/** Utils */
import { cleanup, fireEvent, render, waitFor } from "../../../../utils/testUtils";

/** Components */
import { AddPostForm } from './AddPostForm';

beforeEach(cleanup);

describe('AddPostForm', () => {

    const handler = jest.fn(() => Promise.resolve());

    const Decorated = reduxForm({
        form: 'profile-add-post'
        //@ts-ignore
    })(AddPostForm)

    it('AddPost Form works successfully', async ()=>{

        const { getByTestId } = render(<BrowserRouter>
            <Decorated onSubmit={handler} />
        </BrowserRouter>);

        fireEvent.change(getByTestId("newPostText"), {
            target: { value: "Hello world!" }
        });
        
        fireEvent.submit(getByTestId("submit"));

        expect(handler).toHaveBeenCalledWith({newPostText: "Hello world!"}, expect.anything(), expect.anything());
 
    });

});