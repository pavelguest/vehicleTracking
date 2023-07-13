import React, { memo } from 'react';

import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { useHeaderConfig } from './headerConfig';
import { NavigationParams } from './Navigation.types';
import { Home } from '../screens/Home';

const Stack = createNativeStackNavigator<NavigationParams>();

const defaultOptions: NativeStackNavigationOptions = {
  headerShown: false,
  orientation: 'portrait',
};

const NavigationRoot = () => {
  const headerConfig = useHeaderConfig();

  return (
    <Stack.Navigator screenOptions={defaultOptions} initialRouteName={'Home'}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={() => ({
          title: 'Главная',
          ...headerConfig,
        })}
      />
    </Stack.Navigator>
  );
};

export default memo(NavigationRoot);
