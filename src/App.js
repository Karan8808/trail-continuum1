import React from 'react';
import { AzureAD, AuthenticationState } from 'react-aad-msal';
import { authProvider } from './authProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LeaveTracker from './Pages/LeaveTracker';
import HomePage from './Pages/HomePage';
import TimeSheet from './Pages/TimeSheet';

import './App.css';

function App() {
  return (
    <AzureAD provider={authProvider} forceLogin={false}>
      {({ authenticationState, accountInfo }) => (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  isAuthenticated={authenticationState === AuthenticationState.Authenticated}
                  accountInfo={accountInfo}
                />
              }
            />
            <Route path="/LeaveTracker" element={<LeaveTracker />} />
            <Route path="/TimeSheet" element={<TimeSheet />} />
          </Routes>
        </Router>
      )}
    </AzureAD>
  );
}

export default App;