import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'


const root = document.getElementById('root');
if (root === null) {
  throw new Error("Root element not found");
}

const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(<App />);

