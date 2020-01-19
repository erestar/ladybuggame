import React from 'react';
import {engine} from "./engine"
import {Setup} from "./components/Setup";
import {Game} from "./components/Game";
import './App.css';

const App = () => (
    <div className="App">
        <h1>The Ladybug Game</h1>
        <Setup/>

        <Game
            spaces={engine.spaces}
        />
    </div>
);

export default App;
