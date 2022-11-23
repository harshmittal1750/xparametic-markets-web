import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from 'redux/store';

import { ScrollToTop } from 'components';

import ThemeProvider from 'contexts/theme';

import { NetworkProvider } from 'hooks/useNetwork';
import { PolkamarketsServiceProvider } from 'hooks/usePolkamarketsService';

import App from './App';
import reportWebVitals from './reportWebVitals';

import 'styles/main.scss';

const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider>
        <Provider store={store}>
          <Router>
            <ScrollToTop />
            <NetworkProvider>
              <PolkamarketsServiceProvider>
                <App />
              </PolkamarketsServiceProvider>
            </NetworkProvider>
          </Router>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

render();

reportWebVitals();
