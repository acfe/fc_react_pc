import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
// redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from 'src/common/redux/reducers';
const middleware = [thunk];
const store = createStore(
    reducer,
    applyMiddleware(...middleware)
);

// components
import Router from 'fcbox/react/static_router';
import Loading from 'fcbox/react/public/loading';
import Toast from 'fcbox/react/public/toast';
import ButtonsIndex from 'src/pages/index/containers';

render(
    <Provider store={store}>
        <div className="app">
            <Router>
                <ButtonsIndex path="index" page="index"/>
            </Router>
            <Toast/>
            <Loading/>
        </div>
    </Provider>,
    document.getElementById('app')
);
