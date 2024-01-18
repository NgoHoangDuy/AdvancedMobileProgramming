import React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { SplashScreen } from './src/screens';
import AuthNavigator from './src/navigators/AuthNavigator';
import { StatusBar } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigators/MainNavigator';

const App = () => {
  const [isShowSplash, setisShowSplash] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const {getItem, setItem} = useAsyncStorage('assetToken');
  useEffect(() =>{
    const timeout = setTimeout(() =>{
      setisShowSplash(false);
    }, 5000);
    return () => clearTimeout(timeout);
  },[]);

  useEffect(() =>{
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = await getItem();
    token && setAccessToken(token);
  };
  return (
    <>
    <StatusBar barStyle="dark-content"
    backgroundColor="transparent"
    translucent/>
    {
      isShowSplash ? (
        <SplashScreen/>
        ) : (
          <NavigationContainer>
            {accessToken ? <MainNavigator/>
            : <AuthNavigator />}
            
          </NavigationContainer>

      )
    }
    </>
  );
};

export default App;
