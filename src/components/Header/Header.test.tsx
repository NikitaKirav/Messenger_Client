/** Absolute imports */
import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

/** Utils */
import { render } from "../../utils/testUtils";

/** Components */
import { Header } from './Header';


describe('Header', () => {

    it('Header renders', async ()=>{
        const {debug, findByText, queryByText}  = render(<BrowserRouter>
                    <Header 
                        logoutCallback={() => {}}
                        isAuth={false}
                        localData={{ userName: 'TestUserName', userId: 'user-id-1' }}
                        avatar={''} />
                </BrowserRouter>);
        expect(screen.getByText(/Come back to Works/i)).toBeInTheDocument(); 
        expect(screen.getByText(/Login/i)).toBeInTheDocument(); 
        expect(queryByText(/TestUserName/i)).toBeNull();     
    });

    it('Header renders with an authorized user', async ()=>{
        const {debug, findByText, queryByText}  = render(<BrowserRouter>
                    <Header 
                        logoutCallback={() => {}}
                        isAuth={true}
                        localData={{ userName: 'TestUserName', userId: 'user-id-1' }}
                        avatar={'/uploads/avatar.jpg'} />
                </BrowserRouter>);
        expect(screen.getByText(/Come back to Works/i)).toBeInTheDocument(); 
        expect(await findByText(/TestUserName/i)).toBeInTheDocument(); 
        expect(queryByText(/Login/i)).toBeNull();  
    });

});
