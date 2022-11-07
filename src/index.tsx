import { StrictMode } from 'react';
import { render } from 'react-dom';

import App from './App';

import 'styles/main.scss';
import type { ReportHandler } from 'web-vitals';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

((onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
})();
