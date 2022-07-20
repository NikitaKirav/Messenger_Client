/** Absolute imports */
import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

/** Utils */
import { render } from "../../utils/testUtils";

/** Components */
import { Footer } from './Footer';


describe('Footer', () => {

    it('Footer renders by default', async ()=>{
        render( <BrowserRouter><Footer /></BrowserRouter>);
        expect(screen.getByText(/Created by Nikita Kirav/i)).toBeInTheDocument();    
    });

});
