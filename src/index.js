import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Nav from './Nav';

ReactDOM.render(
    <Provider store={ store }>
        <Nav />
    </Provider>,
    document.getElementById('root')
)