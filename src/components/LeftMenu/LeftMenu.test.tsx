/** Absolute imports */
import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

/** Utils */
import { render } from "../../utils/testUtils";

/** Components */
import { LeftMenu } from './LeftMenu';


describe('LeftMenu', () => {

    it('LeftMenu renders by default', async ()=>{
        render( <BrowserRouter><LeftMenu /></BrowserRouter>);
        expect(screen.getByText(/Profile/i)).toBeInTheDocument();
        expect(screen.getByText(/Users/i)).toBeInTheDocument(); 
        expect(screen.getByText(/Chat/i)).toBeInTheDocument();
        expect(screen.getByText(/About/i)).toBeInTheDocument();     
    });

});