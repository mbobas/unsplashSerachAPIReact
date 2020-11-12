import React from 'react';
import "./App.css";
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';

export default function App() {
    return (
        <BrowserRouter>
            <div className="App">
               <Nav />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/home" component={Home} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

const About =()=> (
    <div>
        <h1>Home</h1>
    </div>
);
