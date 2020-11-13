import React from 'react';
import "./App.css";
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Nav from './components/nav/Nav';
import Home from './pages/home/Home';
import TestPage from './pages/test/TestPage';
import TestPage2 from './pages/test/TestPage2';
import ResultsPage from './pages/resultspage/ResultsPage';

export default function App() {
    return (
        <BrowserRouter>
            <div className="App">
               <Nav />
                <Switch>
                    <Route exact path="/"  component={Home} />
                    <Route path="/about" component={TestPage} />
                    <Route path="/home" component={Home} />
                    <Route exact path="/:recivedPhoto" component={TestPage2} />
                    <Route exact path='/user/:name' component={ResultsPage} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}
