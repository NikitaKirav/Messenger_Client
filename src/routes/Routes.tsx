/** Absolute imports */
import React from "react";
import { Route, Routes as Switch } from "react-router-dom";
import { History } from "history";
import { HistoryRouter as Router } from "redux-first-history/rr6";

/** Pages */
import { AboutPage } from "../pages/About/AboutPage";
import { UsersPage } from "../pages/Users/UsersPage";
import { LoginPage } from "../pages/Login/LoginPage";
import { ProfilePage } from "../pages/Profile/ProfilePage";
import { RegisterPage } from "../pages/Register/RegisterPage";
//import { DialogsPage } from "../pages/Dialogs/DialogsPage";
import { ChatPage } from "../pages/Chat/ChatPage";
import { ChatListContainer } from "../pages/ChatList/ChatListContainer";

/** Components */
import Preloader from "../components/Preloader/Preloader";

/** Enums */
import { routeNames } from "./routeNames";

/** Store */
import { LayoutWrapper } from "../layouts/LayoutWrapper";




//const CompanyList = React.lazy(() => import('../pages/CompanyList/CompanyList'));
//const DigitalAgenciesList = React.lazy(() => import('../pages/DigitalAgenciesList/DigitalAgenciesList'));

const Routes = ({ history }: { history: History }) => {

  return (
    <Router history={history} basename={'/works/messenger/'}>
      <Switch>
          <Route path={routeNames.about} element={<LayoutWrapper type={'standart'} component={AboutPage} />} />

          <Route path={routeNames.profile} element={<LayoutWrapper type={'standart'} component={ProfilePage} />} />
          
          <Route path={routeNames.myProfile} element={<LayoutWrapper type={'standart'} component={ProfilePage} />} />
          
          {/*<Route path={routeNames.dialogs} element={<LayoutWrapper type={'standart'} component={DialogsPage} />} />*/}

          <Route path={routeNames.users} element={<LayoutWrapper type={'standart'} component={UsersPage} />} />

          <Route path={routeNames.login} element={<LayoutWrapper type={'standart'} component={LoginPage} />} />

          <Route path={routeNames.register} element={<LayoutWrapper type={'standart'} component={RegisterPage} />} />
          
          <Route path={routeNames.chat} element={<LayoutWrapper type={'standart'} component={ChatPage} />} />

          <Route path={routeNames.chatlist} element={<LayoutWrapper type={'standart'} component={ChatListContainer} />} />

          <Route path={routeNames.notFound} element={<div>Hello world</div>} />
      </Switch>
    </Router>
  );
}

type LazyLoadComponentType = {
	component: JSX.Element
}

const LazyLoadComponent: React.FC<LazyLoadComponentType> = ({component}) => {
    return (
        <React.Suspense fallback={<Preloader />}>
            {component}
        </React.Suspense>
    );
} 

export default Routes;