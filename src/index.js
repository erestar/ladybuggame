import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import game from './reducers'
import {Provider} from "react-redux";
import {startGame, takeTurn} from "./actions";
import seedrandom from 'seedrandom';

const store = createStore(game, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
seedrandom('a', { global: true });

//todo Remove this to use the interface to start the game. For now, the initial players are hard coded.
store.dispatch(startGame());
store.dispatch(takeTurn());
store.dispatch(takeTurn());
store.dispatch(takeTurn());
store.dispatch(takeTurn());
store.dispatch(takeTurn());
store.dispatch(takeTurn());
store.dispatch(takeTurn());
store.dispatch(takeTurn());
store.dispatch(takeTurn());
store.dispatch(takeTurn());
// store.dispatch(takeTurn());
// store.dispatch(takeTurn());
// store.dispatch(takeTurn());
// store.dispatch(takeTurn());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
