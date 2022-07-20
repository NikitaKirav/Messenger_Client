/** Absolute imports */
import { BrowserRouter } from "react-router-dom";

/** Utils */
import { render } from "../../utils/testUtils";

/** Components */
import { LoginPage } from './LoginPage';


describe('LoginPage', () => {

    it('LoginPage renders', async ()=>{

        const {debug, findByText, queryByText} = render(<BrowserRouter>
            <LoginPage />
        </BrowserRouter>);
        expect(await findByText(/Login/i)).toBeInTheDocument();
 
    });

});