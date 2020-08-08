import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppContainer } from './App';
import './main.global.css';

const smallDataRequestLink = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}
&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;

const bigDataRequestLink = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName=
{lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;

export const MainMenu = () => {
    const [ requestLink, setRequestLink ] = React.useState('');

    if (requestLink) {
        return (
            <ErrorBoundary errorMessage="Что-то пошло не так">
                <AppContainer requestLink={requestLink} />
            </ErrorBoundary>
        );
    } else {
        return (
            <div className="center">
                <button
                    className="menu-button"
                    onClick={() => setRequestLink(smallDataRequestLink)}
                >
                    Получить небольшой объем данных
                </button>
                <button
                    className="menu-button"
                    onClick={() => setRequestLink(bigDataRequestLink)}
                >
                    Получить большой объем данных
                </button>
            </div>
        );
    }
}
