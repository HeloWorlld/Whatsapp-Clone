import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Chat from '../components/Chat';
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import { useStateValue } from './StateProvider';

function App() {
    const [{ user }, dispatch] = useStateValue();

    return (
        // BEM naming convention
        <div className="app">
            {user ? (
                <div className="app__body">
                    <Router>
                        <Sidebar />
                        <Switch>
                            <Route path="/rooms/:roomId">
                                <Chat />
                            </Route>
                            <Route path="/">
                                <Chat />
                            </Route>
                        </Switch>
                    </Router>
                </div>
            ) : (
                    <Login />
                )}

        </div>
    );
}

export default App;
