/** Absolute imports */
import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

/** Utils */
import { render } from "../../utils/testUtils";

/** Components */
import { AboutPage } from './AboutPage';


describe('AboutPage', () => {

    it('AboutPage renders by default', async ()=>{
        render( <BrowserRouter><AboutPage /></BrowserRouter>);
        expect(screen.getByText(/About this project/i)).toBeInTheDocument();   
    });

});