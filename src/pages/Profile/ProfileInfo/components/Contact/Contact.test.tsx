/** Absolute imports */
import { BrowserRouter } from "react-router-dom";

/** Utils */
import { render } from "../../../../../utils/testUtils";

/** Components */
import { Contact } from './Contact';


describe('Contact', () => {

    it('Contact renders with data', async ()=>{
        const contactTitle = 'github', 
              contactValue = 'https://github.com/NikitaKirav';
        const {debug, findByText, findAllByText, queryByText} = await render(<BrowserRouter>
            <Contact contactTitle={contactTitle} contactValue={contactValue} />
        </BrowserRouter>);
        expect((await findAllByText(/github/i)).length).toBe(2);
        expect(await findByText(/https:\/\/github.com\/NikitaKirav/i)).toBeInTheDocument();
 
    });

});