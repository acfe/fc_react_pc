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
import Index from 'src/pages/index/containers';

render(
    <Provider store={store}>
        <div className="app">
            <Router>
                <Index path="index" page="index"/>
            </Router>
            <Loading/>
        </div>
    </Provider>,
    document.getElementById('app')
);
