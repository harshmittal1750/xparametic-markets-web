import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from 'redux/store';

import ThemeProvider from 'contexts/theme';

import App from './App';
import reportWebVitals from './reportWebVitals';

import 'styles/main.scss';

render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
