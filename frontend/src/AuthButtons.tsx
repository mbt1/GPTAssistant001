// src/auth.tsx
import React from 'react';
import { useMsal } from '@azure/msal-react';
import { promises } from 'dns';

export const SignInButton: React.FC = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup().catch((e) => console.error(e));
  };

  return <button onClick={handleLogin}>Sign In</button>;
};

export const SignOutButton: React.FC = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutPopup().catch((e) => console.error(e));
  };

  return <button onClick={handleLogout}>Sign Out</button>;
};

export const EditProfileButton: React.FC = () => {

  const handleEdit = () => {
    // msalEditInstance.initialize().then(()=>{
    //   msalEditInstance.loginPopup().catch((e) => console.error(e))
    // });
  };

  return <button onClick={handleEdit}>Profile</button>;
};
