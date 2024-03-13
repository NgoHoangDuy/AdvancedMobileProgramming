import React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { SplashScreen } from './src/screens';
import AuthNavigator from './src/navigators/AuthNavigator';
import { StatusBar } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigators/MainNavigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppRouters from './src/navigators/AppRouters';

const App = () => {
  const [isShowSplash, setisShowSplash] = useState(true);
  
  useEffect(() =>{
    const timeout = setTimeout(() =>{
      setisShowSplash(false);
    }, 5000);
    return () => clearTimeout(timeout);
  },[]);


  return (
    <>
    <Provider store={store}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />

        <NavigationContainer>
          <AppRouters />
        </NavigationContainer>
      </Provider>

    </>
  );
};

export default App;