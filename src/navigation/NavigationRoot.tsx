import React, { memo } from 'react';

import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { useHeaderConfig, useHeaderWithBackConfig } from './headerConfig';
import { NavigationParams } from './Navigation.types';
import { Map } from '../screens/Map';
import { Home } from '../screens/Home';
import { Scanner } from '../screens/Scanner';
import { ScannerOld } from '../screens/ScannerOld';
import { BleScanner } from '../screens/BleScanner';
import { ChangeBleScanner } from '../screens/ChangeBleScanner';

const Stack = createNativeStackNavigator<NavigationParams>();

const defaultOptions: NativeStackNavigationOptions = {
  headerShown: false,
  orientation: 'portrait',
};

const NavigationRoot = () => {
  const headerConfig = useHeaderConfig();
  const headerWithBackConfig = useHeaderWithBackConfig();

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
      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={() => ({
          title: 'Сканер',
          ...headerWithBackConfig,
        })}
      />
      <Stack.Screen
        name="ScannerOld"
        component={ScannerOld}
        options={() => ({
          title: 'Старый сканер',
          ...headerWithBackConfig,
        })}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={() => ({
          title: 'Карта',
          ...headerWithBackConfig,
        })}
      />
      <Stack.Screen
        name="BleScanner"
        component={BleScanner}
        options={() => ({
          title: 'Ble scanner',
          ...headerWithBackConfig,
        })}
      />
      <Stack.Screen
        name="ChangeBleScanner"
        component={ChangeBleScanner}
        options={() => ({
          title: 'Change Ble Scanner',
          ...headerWithBackConfig,
        })}
      />
    </Stack.Navigator>
  );
};

export default memo(NavigationRoot);
