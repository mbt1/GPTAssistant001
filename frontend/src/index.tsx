import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import MsalWrapper from './MsalWrapper';

const root = document.getElementById('root');
if (root === null) {
  throw new Error("Root element not found");
}

const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(
  <React.StrictMode>
    <MsalWrapper>
      <App />
    </MsalWrapper>
  </React.StrictMode>
);

