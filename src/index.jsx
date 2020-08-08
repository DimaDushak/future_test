import React from 'react';
import ReactDOM from 'react-dom';
import { MainMenu } from './AppContainer';

window.addEventListener('load', () => {
    ReactDOM.render(
        <MainMenu />,
        document.getElementById('root')
    );
});
