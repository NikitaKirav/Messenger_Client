/** Absolute imports */
import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

/** Utils */
import { render } from "../../../../../utils/testUtils";

/** Components */
import { WriteMessageOrFollow } from './WriteMessageOrFollow';

describe('WriteMessageOrFollow', () => {


    it('WriteMessageOrFollow renders by default', async ()=>{

        render(<BrowserRouter><WriteMessageOrFollow userId={'user-id-1'} /></BrowserRouter>);
        expect(screen.getByText(/Write a message/i)).toBeInTheDocument();   
    });

});