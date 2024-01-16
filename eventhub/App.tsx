import React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { SplashScreen } from './src/screens';
import AuthNavigator from './src/navigators/AuthNavigator';

const App = () => {
  const [isShowSplash, setisShowSplash] = useState(true);
  useEffect(() =>{
    const timeout = setTimeout(() =>{
      setisShowSplash(false);
    }, 5000);
    return () => clearTimeout(timeout);
  },[]);
  return isShowSplash ? (
    <SplashScreen/>
    ) : (
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>

  );
};

export default App;
