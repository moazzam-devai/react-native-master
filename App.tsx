/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './src/store';
import {AuthContextProvider} from './src/app/contexts';
import {AppMain} from './src/app/screens';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView>
        <ReduxProvider store={store}>
          <AuthContextProvider>
            <AppMain />
          </AuthContextProvider>
        </ReduxProvider>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
