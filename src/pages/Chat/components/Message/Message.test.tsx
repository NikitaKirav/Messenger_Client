/** Absolute imports */
import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

/** Utils */
import { render } from "../../../../utils/testUtils";

/** Components */
import { Message } from './Message';


describe('Message', () => {

    it('Message renders (chat of the user1: message from user1 to user2)', async ()=>{
        const message = {
            text: 'Hello Ben!',
            fromPhoto: '',
            from: 'user-id-1',
            to: 'user-id-2',
            updateDate: '7/7/2022, 8:30:43 AM'
        };

        render(<BrowserRouter><Message userId={'user-id-1'} message={message} /></BrowserRouter>);
        const element = screen.getByTestId('myMessage');
        expect(element).toHaveTextContent(/Hello Ben!/i);   
 
    });

    it('Message renders (chat of the user1: message from user2 to user1)', async ()=>{
        const message = {
            text: 'Hello Cameron!',
            fromPhoto: '',
            from: 'user-id-2',
            to: 'user-id-1',
            updateDate: '7/7/2022, 8:30:43 AM'
        };

        render(<BrowserRouter><Message userId={'user-id-1'} message={message} /></BrowserRouter>);
        const element = screen.getByTestId('otherMessage');
        expect(element).toHaveTextContent(/Hello Cameron!/i);   
 
    });

});