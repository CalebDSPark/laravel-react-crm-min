import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-quill/dist/quill.snow.css';
import 'nprogress/nprogress.css';
import './assets/css/prism.css';
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { SettingsProvider } from './context/SettingsContext';
import { configureStore } from './store';
import { restoreSettings } from './utils/settings';
import { PersistGate } from 'redux-persist/integration/react';
import AppMain from './AppMain';

const { store, persistor } = configureStore();
const settings = restoreSettings();

ReactDOM.render(
    <Provider store={store}>   
        <PersistGate loading={null} persistor={persistor} >
            <SettingsProvider settings={settings}>
                <AppMain />
            </SettingsProvider>
        </PersistGate>     
    </Provider>,    
    document.getElementById('root')
);

