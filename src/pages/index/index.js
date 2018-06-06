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
import Router from 'fcbox/react/static_router/index';
import Index from 'src/pages/index/containers/index';

render(
    <Provider store={store}>
        <Router>
            <Index path="index" page="index"/>
        </Router>
    </Provider>,
    document.getElementById('app')
);
