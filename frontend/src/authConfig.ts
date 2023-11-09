// src/authConfig.ts
import { LogLevel, Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '0d35788a-4819-4936-8083-963b99be79d5',
    authority: 'https://GTPAssistant001.b2clogin.com/GTPAssistant001.onmicrosoft.com/B2C_1_GPTAssistant001_login',
    knownAuthorities: ['GTPAssistant001.b2clogin.com','https://GTPAssistant001.b2clogin.com/GTPAssistant001.onmicrosoft.com/B2C_1_GPTAssistant001_edit'],
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage', // 'localStorage' or 'sessionStorage'
    storeAuthStateInCookie: isIE11(), // recommended to set to true for IE 11
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      }
    }
  }
};

function isIE11(): boolean {
  return window.navigator.userAgent.indexOf('MSIE') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
}
