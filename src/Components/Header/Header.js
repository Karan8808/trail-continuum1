import React from 'react';
import { AzureAD, AuthenticationState } from 'react-aad-msal';
import { authProvider } from '../../authProvider';
import { Link } from 'react-router-dom';

import Logo from '../Header/Logo';
import UserInfo from '../Header/UserInfo';

import '../../Styling/header.css';

const Header = () => {
  const handleLogout = () => {
    authProvider.logout();
  };

  return (
    <AzureAD provider={authProvider}>
      {({ authenticationState, accountInfo, login }) => {
        if (authenticationState !== AuthenticationState.Authenticated) {
          return (
            <header className='navbar'>
              <nav>
                <button className='login-button' onClick={login}>Login</button>
              </nav>
              <Logo />
            </header>
          );
        }

        const userName = accountInfo?.account?.name;
        const abbreviatedName = userName.split(' ').map(name => name.charAt(0)).join('');

        return (
          <header className='navbar'>
            <nav>
              <Link to="/TimeSheet" className='time-sheet-link'>Time Sheet</Link>
              <Link to="/LeaveTracker" className='leave-tracker-link'>Leave Tracker</Link>
            </nav>
            <Logo />
            <UserInfo abbreviatedName={abbreviatedName} handleLogout={handleLogout} />
          </header>
        );
      }}
    </AzureAD>
  );
};

export default Header;