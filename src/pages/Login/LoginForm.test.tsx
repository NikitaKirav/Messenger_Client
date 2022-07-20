/** Absolute imports */
import { BrowserRouter } from "react-router-dom";

/** Utils */
import { cleanup, fireEvent, render, waitFor } from "../../utils/testUtils";

/** Components */
import { LoginForm } from './LoginForm';

beforeEach(cleanup);

describe('LoginForm', () => {

    const handler = jest.fn(() => Promise.resolve());

    it('Login Form works successfully', async ()=>{

        const { getByTestId } = render(<BrowserRouter>
            <LoginForm onFinish={handler} onFinishFailed={() => {}} />
        </BrowserRouter>);

        fireEvent.change(getByTestId("email"), {
            target: { value: "my@email.com" }
        });
        fireEvent.change(getByTestId("password"), {
          target: { value: "passw0rd" }
        });    
        fireEvent.submit(getByTestId("submit"));

        await waitFor(() =>
            expect(handler).toBeCalledWith({ password: "passw0rd", email: "my@email.com", remember: true })
        );
 
    });

});