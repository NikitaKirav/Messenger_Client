/** Absolute imports */
import React from "react";
import { Provider } from "react-redux";

/** Redux */
import configureStore, { history } from "./store";

/** Routes */
import Routes from "./routes";


const store = configureStore();

const App = () => {

    return (
      <Provider store={store}>
            <Routes history={history}  />
      </Provider>
    );
}
           
export default App;
