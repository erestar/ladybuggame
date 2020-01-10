import React from 'react';
import './App.css';
import Game from "./components/Game";
import Setup from "./components/Setup";
import {engine} from "./engine"

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
