import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import AppRouters from './src/navigators/AppRouters';
import store from './src/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import {HandleNotification} from './src/utils/handleNotification';
import Toast from 'react-native-toast-message';
import linking from './src/linking';
import Geocoder from 'react-native-geocoding';

Geocoder.init(process.env.MAP_API_KEY as string);

const App = () => {
  useEffect(() => {
    HandleNotification.checkNotificationPersion();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <Host>
          <NavigationContainer linking={linking}>
            <AppRouters />
          </NavigationContainer>
        </Host>
      </Provider>
      <Toast />
    </GestureHandlerRootView>
  );
};

export default App;