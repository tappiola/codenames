import React  from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import GameField from './GameField';


function App() {

    const NewGame = () => {
        return <div>New game</div>
    }

    return <Switch>
        <Route exact path="/" component={NewGame}/>
        <Route path="/:keyword" component={GameField}/>
    </Switch>
}

export default App;
