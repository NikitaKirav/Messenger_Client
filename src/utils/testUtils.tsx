import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';

/** Redux */
import configureStore from "../store";

const store = configureStore(undefined);

const ReduxProvider = ({ children }: any) => {
    return <Provider store={store}> { children } </Provider>;
}


const reduxRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult =>
    render(ui, { wrapper: ReduxProvider, ...options});


export * from "@testing-library/react";
export { reduxRender as render };

