import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Flights from  './components/Flights';
import Search from './components/Search';
import Summary from './components/Summary';
import NotFound from './components/NotFound';

const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/flights" component={Flights} />
            <Route path="/search" component={Search} />
            <Route path="/summary" component={Summary} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
