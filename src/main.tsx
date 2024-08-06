import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import useGlobalStyles from './styles/globalStyles';

const Root: React.FC = () => {
    useGlobalStyles();

    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);
