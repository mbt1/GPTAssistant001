// MsalWrapper.tsx
import React, { ReactNode } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';

export const msalInstance = new PublicClientApplication(msalConfig);

interface MsalWrapperProps {
    children: ReactNode;
  }

const MsalWrapper: React.FC<MsalWrapperProps> = ({ children }) => {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};

export default MsalWrapper;
