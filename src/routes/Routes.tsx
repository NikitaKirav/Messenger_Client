/** Absolute imports */
import React, { useEffect } from "react";
import { Route, Routes as Switch, BrowserRouter } from "react-router-dom";
import { History } from "history";
import { HistoryRouter as Router } from "redux-first-history/rr6";

/** Pages */
import { AboutPage } from "../pages/About/AboutPage";
import { UsersPage } from "../pages/Users/UsersPage";
import { LoginPage } from "../pages/Login/LoginPage";
import { ProfilePage } from "../pages/Profile/ProfilePage";
import { RegisterPage } from "../pages/Register/RegisterPage";
import { DialogsPage } from "../pages/Dialogs/DialogsPage";
import { ChatPage } from "../pages/Chat/ChatPage";
import { ChatList } from "../pages/ChatList/ChatList";

/** Components */
import Preloader from "../components/Preloader/Preloader";
import { StandartLayout } from "../layouts/Standart/StandartLayout";

/** Enums */
import { routeNames } from "./routeNames";
import { useDispatch } from "react-redux";

/** Store */
import { initializeApp } from "../store/auth/actions";
import { startMessagesListening, stopMessagesListening } from "../store/chat/actions";
import { LayoutWrapper } from "../layouts/LayoutWrapper";




//const CompanyList = React.lazy(() => import('../pages/CompanyList/CompanyList'));
//const DigitalAgenciesList = React.lazy(() => import('../pages/DigitalAgenciesList/DigitalAgenciesList'));

const Routes = ({ history }: { history: History }) => {

  return (
    <Router history={history}>
      <Switch>
          <Route path={routeNames.about} element={<LayoutWrapper type={'standart'} component={AboutPage} />} />

          <Route path={routeNames.profile} element={<LayoutWrapper type={'standart'} component={ProfilePage} />} />
          
          <Route path={routeNames.myProfile} element={<LayoutWrapper type={'standart'} component={ProfilePage} />} />
          
          <Route path={routeNames.dialogs} element={<LayoutWrapper type={'standart'} component={DialogsPage} />} />

          <Route path={routeNames.users} element={<LayoutWrapper type={'standart'} component={UsersPage} />} />

          <Route path={routeNames.login} element={<LayoutWrapper type={'standart'} component={LoginPage} />} />

          <Route path={routeNames.register} element={<LayoutWrapper type={'standart'} component={RegisterPage} />} />
          
          <Route path={routeNames.chat} element={<LayoutWrapper type={'standart'} component={ChatPage} />} />

          <Route path={routeNames.chatlist} element={<LayoutWrapper type={'standart'} component={ChatList} />} />

          {/*<Route path={routeNames.notFound} element={<FreeAuthorizedWrapper children={<WithLayout component={NotFound} layout={MinimalLayout} />} />} />*/}
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