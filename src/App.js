import React from 'react';
import './App.css';
import Setup from "./components/Setup";
import {engine} from "./engine"
import {Game} from "./components/Game";

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
