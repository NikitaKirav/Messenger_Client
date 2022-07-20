/** Absolute imports */
import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { StatusType } from "../../../../services/api-ws";

/** Utils */
import { render } from "../../../../utils/testUtils";
import { mockLocalStorage } from "../../../../utils/mockLocalStorage";

/** Components */
import { Chat } from './Chat';


describe('Chat', () => {

    const { getItemMock, setItemMock } = mockLocalStorage();
    it('Chat renders by default', async ()=>{
        const userId = 'user-id-1';
        const token = 'token-id';
    
        let mockFridge = `{"userId":"${userId}","token":"${token}"}`;
        getItemMock.mockReturnValue(mockFridge);
        window.HTMLElement.prototype.scrollIntoView = jest.fn();

        render(<BrowserRouter><Chat userId={'user-id-1'} status={StatusType.READY} /></BrowserRouter>);
        expect(screen.getByText(/Send/i)).toBeInTheDocument();   
    });

});