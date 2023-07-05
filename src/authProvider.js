import { MsalAuthProvider, LoginType } from 'react-aad-msal';

const config = {
  auth: {
    authority: 'https://login.microsoftonline.com/7126d9eb-b146-44e5-bb54-996428263eff',
    clientId: '89a7da85-c126-4574-81c2-73d6d98df84e',
    redirectUri: 'http://localhost:3000/LeaveTracker'
    //CHANGE THIS TO '/' and SEE if login becomes first
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false
  }
};

const authenticationParameters = {
  scopes: ['openid', 'profile', 'email']
};

const options = {
  loginType: LoginType.Redirect,
  tokenRefreshUri: window.location.origin + '/auth.html'
};

export const authProvider = new MsalAuthProvider(config, authenticationParameters, options);
