/** Absolute imports */
import { BrowserRouter } from "react-router-dom";

/** Utils */
import { render } from "../../utils/testUtils";

/** Components */
import { RegisterPage } from './RegisterPage';


describe('RegisterPage', () => {

    it('RegisterPage renders', async ()=>{

        const {debug, findByText, queryByText} = render(<BrowserRouter>
            <RegisterPage />
        </BrowserRouter>);
        expect(await findByText(/Register/i)).toBeInTheDocument();
 
    });

});