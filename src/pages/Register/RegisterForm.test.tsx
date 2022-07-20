/** Absolute imports */
import { BrowserRouter } from "react-router-dom";

/** Utils */
import { cleanup, fireEvent, render, waitFor } from "../../utils/testUtils";

/** Components */
import { RegisterForm } from './RegisterForm';

beforeEach(cleanup);

describe('RegisterForm', () => {

    const handler = jest.fn(() => Promise.resolve());

    it('Register Form works successfully', async ()=>{

        const { getByTestId } = render(<BrowserRouter>
            <RegisterForm onFinish={handler} onFinishFailed={() => {}} />
        </BrowserRouter>);

        fireEvent.change(getByTestId("userName"), {
            target: { value: "BobKing" }
        });
        fireEvent.change(getByTestId("email"), {
            target: { value: "my@email.com" }
        });
        fireEvent.change(getByTestId("password"), {
          target: { value: "passw0rd" }
        });    
        fireEvent.submit(getByTestId("submit"));

        await waitFor(() =>
            expect(handler).toBeCalledWith({ password: "passw0rd", email: "my@email.com", userName: 'BobKing' })
        );
 
    });

});