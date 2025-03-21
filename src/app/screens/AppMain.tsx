import React from 'react';
import {useAuthContext} from '../contexts';
import {SplashScreen} from './SplashScreen';
import {Login} from './Auth';
import {Primary} from './Main';

export function AppMain() {
  const authContext = useAuthContext();
  return (
    <>
      {authContext.state.isInitialised ? (
        authContext.state.isAuthenticated ? (
          <Primary />
        ) : (
          <Login />
        )
      ) : (
        <SplashScreen />
      )}
    </>
  );
}
