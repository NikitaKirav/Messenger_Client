/** Absolute imports */
import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import * as redux from 'react-redux';

/** Types */
import { StatusType } from "../../../../services/api-ws";

/** Utils */
import { render } from "../../../../utils/testUtils";
import { mockLocalStorage } from "../../../../utils/mockLocalStorage";

/** Components */
import { AddMessageForm } from './AddMessageForm';

describe('AddMessageForm', () => {

    const { getItemMock, setItemMock } = mockLocalStorage();
    it('AddMessageForm renders by default', async ()=>{

        render(<BrowserRouter><AddMessageForm userId={'user-id-1'} status={StatusType.READY} /></BrowserRouter>);
        expect(screen.getByText(/Send/i)).toBeInTheDocument();   
    });

    it('AddMessageForm renders with local storage and state', async ()=>{

        /** Local Storage */
        const userId = 'user-id-1';
        const token = 'token-id';    
        let mockFridge = `{"userId":"${userId}","token":"${token}"}`;
        getItemMock.mockReturnValue(mockFridge);

        /** State */
        const spy = jest.spyOn(redux, 'useSelector');
        spy.mockReturnValue({ avatars: [{
            userId: 'user-id-1',
            userAvatar: '/uploads/avatar1.jpg',
            userName: 'Bob Marley'
            }] }
        );

        render(<BrowserRouter><AddMessageForm userId={'user-id-1'} status={StatusType.READY} /></BrowserRouter>);
        expect(screen.getByText(/Send/i)).toBeInTheDocument();   
    });

});