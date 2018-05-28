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
import P1 from 'src/pages/index/components/p1';
import P2 from 'src/pages/index/components/p2';

render(
    <Provider store={store}>
        <Router>
            <Index path="index" page="index"/>
            <P1 path="index/p1" page="p1" a="p1"/>
            <P2 path="index/p2" page="p2" a="p2"/>
        </Router>
    </Provider>,
    document.getElementById('app')
);
