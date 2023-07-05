
import React from 'react';
import { createRoot } from 'react-dom/client';
import { AzureAD } from 'react-aad-msal';

import App from './App';
import { authProvider } from './authProvider';

createRoot(document.getElementById('root')).render(
  <AzureAD provider={authProvider} forceLogin={true}>
    <App />
  </AzureAD>
);

