/** Absolute imports */
import { BrowserRouter } from "react-router-dom";
import * as redux from 'react-redux';
import { StatusType } from "../../../../services/api-ws";

/** Utils */
import { render } from "../../../../utils/testUtils";

/** Components */
import { MessangerHead } from './MessangerHead';


describe('MessangerHead', () => {

    it('MessangerHead renders with UserName (Bob Marley) which we get from useSelect using UserId (from Props)', async ()=>{
        const spy = jest.spyOn(redux, 'useSelector');
        spy.mockReturnValue({ avatars: [{
            userId: 'user-id-1',
            userAvatar: '/uploads/avatar1.jpg',
            userName: 'Bob Marley'
            }] }
        );


        const {debug, findByText, queryByText} = render(<BrowserRouter><MessangerHead userId={'user-id-1'} status={StatusType.READY} /></BrowserRouter>);
        expect(await findByText(/Bob Marley/i)).toBeInTheDocument();
 
    });

});