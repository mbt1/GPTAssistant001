// TokenContext.tsx
import React, { ReactNode, createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useMsal } from '@azure/msal-react';
import { InteractionRequiredAuthError } from '@azure/msal-browser';


const TokenContext = createContext(null);

export const useAuthToken = () => useContext(TokenContext);

interface AuthTokenProviderProps {
    children: ReactNode;
}
export const AuthTokenProvider = ({ children }: AuthTokenProviderProps) => {
  const { instance, accounts } = useMsal();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  ((v)=>{useEffect(()=>{((vv:any)=>{console.warn(`AuthTokenProvider:StateChange:${v}= ${vv}`)})(eval(v))}),[eval(v)]})("instance");
  ((v)=>{useEffect(()=>{((vv:any)=>{console.warn(`AuthTokenProvider:StateChange:${v}= ${vv}`)})(eval(v))}),[eval(v)]})("accounts");
  ((v)=>{useEffect(()=>{((vv:any)=>{console.warn(`AuthTokenProvider:StateChange:${v}= ${vv}`)})(eval(v))}),[eval(v)]})("token");
  ((v)=>{useEffect(()=>{((vv:any)=>{console.warn(`AuthTokenProvider:StateChange:${v}= ${vv}`)})(eval(v))}),[eval(v)]})("error");
//   ((v)=>{useEffect(()=>{((vv:any)=>{console.warn(`AuthTokenProvide:StateChange:${v}=${vv}`)})(eval(v))}),[eval(v)]})("getToken");

  const getToken = useCallback(async () => {
    console.warn('started: getToken()')
    if (accounts.length > 0) {
      const request = {
        scopes: ["https://GTPAssistant001.onmicrosoft.com/API/task.read","https://GTPAssistant001.onmicrosoft.com/API/task.change"],
        account: accounts[0]
      };
      console.warn('has an account: getToken()')
      try {
        const response = await instance.acquireTokenSilent(request);
        console.warn("Token acquired:-----------------------------------------------------")
        console.warn(response);
        console.warn("--------------------------------------------------------------------")
        setToken(response.accessToken);
      } catch (err) {
        console.warn('has an error: getToken():',err)
        if (err instanceof InteractionRequiredAuthError) {
          // fallback to interactive method when silent call fails
          try {
            const response = await instance.acquireTokenPopup(request);
            setToken(response.accessToken);
          } catch (interactiveError) {
            setError(interactiveError);
          }
        } else {
          setError(err);
        }
      }
    }
  }, [instance, accounts]);

  useEffect(() => {
    console.warn('calling getToken()')
    getToken();
  }, [getToken]);

  return (
    <TokenContext.Provider value={{ token, error, getToken }}>
      {children}
    </TokenContext.Provider>
  );
};
