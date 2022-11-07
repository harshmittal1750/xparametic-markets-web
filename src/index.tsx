import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from 'redux/store';

import { ScrollToTop } from 'components';

import ThemeProvider from 'contexts/theme';

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
            <App />
          </Router>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

render();

reportWebVitals();
