import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Topbar from './components/topbar';

const Routes = () => {
    return (
        <Router>
            <Topbar />
            <Switch>
                <Route exact path="/" component={Dashboard} />
            </Switch>
        </Router>
    );
};

export default Routes;