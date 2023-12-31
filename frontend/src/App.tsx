import React from 'react';
import './App.scss';
import APIReader from './APIReader'; 
import {SignInButton, SignOutButton, EditProfileButton} from './AuthButtons'; 
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { AuthTokenProvider } from './AuthTokenContext';

const App: React.FC = () => {
  const { accounts } = useMsal();
  const account = accounts[0]; // Assuming a single-account scenario for simplicity
  
  return (
    <>
      <header>
        <div>The Title</div>
        <AuthenticatedTemplate>
          <div>Welcome, {account?.username}!</div>
          <SignOutButton />
          {/* <EditProfileButton /> */}
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <SignInButton />
        </UnauthenticatedTemplate>
      </header>
      <main>
        <AuthenticatedTemplate>
          <div className="something">
            <AuthTokenProvider>
              <APIReader searchTerm="xx" />
            </AuthTokenProvider>
          </div>
        </AuthenticatedTemplate>
      </main>        
      <footer>
        <div>Copyright 2023, mbt1.github.io</div>
      </footer>
    </>
  );
};

export default App;