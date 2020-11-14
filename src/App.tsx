import React from 'react';
import "./App.css";
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Nav from './components/nav/Nav';
import Home from './pages/home/Home';
import TestPage from './pages/test/TestPage';
import ResultsPage from './pages/resultspage/ResultsPage';

export default function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path="/"  component={Home} />
                    <Route exact path="/:modal/:recivedPhoto" component={TestPage} />
                    <Route path="/home" component={Home} />
                    <Route exact path="/:recivedPhoto" component={ResultsPage} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}
