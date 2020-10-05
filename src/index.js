import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import reducer, { initalState } from './containers/reducer';
import { StateProvider } from './containers/StateProvider';

render(
    <React.StrictMode>
        <StateProvider initalState={initalState} reducer={reducer}>
            <App />
        </StateProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
