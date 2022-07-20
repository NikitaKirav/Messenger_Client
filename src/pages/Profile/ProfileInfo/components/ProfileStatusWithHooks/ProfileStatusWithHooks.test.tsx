/** Absolute imports */
import { BrowserRouter } from "react-router-dom";

/** Utils */
import { cleanup, fireEvent, render, screen, waitFor } from "../../../../../utils/testUtils";

/** Components */
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

beforeEach(cleanup);

describe('ProfileStatusWithHooks', () => {

    const handler = jest.fn(() => Promise.resolve());
    const props = {
        status: 'first status', 
        updateStatus: handler,
        isOwner: true
    }

    it('Checks default status, then changes status and checks again', async ()=>{

        const { getByTestId } = render(<BrowserRouter>
            <ProfileStatusWithHooks  {...props} />
        </BrowserRouter>);

        expect(screen.getByText(/first status/i)).toBeInTheDocument();

        fireEvent.doubleClick(getByTestId("statusText"));

        fireEvent.change(getByTestId("statusInput"), {
            target: { value: "second status" }
        });
       
        fireEvent.blur(getByTestId("statusInput"));

        await waitFor(() =>
            expect(handler).toBeCalledWith("second status")
        );
    });

});