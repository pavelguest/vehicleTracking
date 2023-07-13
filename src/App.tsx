import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { useTheme } from 'react-native-stylex';
import { navigationRef } from './navigation/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import NavigationRoot from './navigation/NavigationRoot';
import { StatusBar } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import RNBootSplash from 'react-native-bootsplash';

function App() {
  const theme = useTheme();
  const routeNameRef: MutableRefObject<string | undefined> = useRef();
  const styleFlex = {
    flex: 1,
    backgroundColor: theme.palette.background.primary,
  };

  const handleStateChange = useCallback(() => {
    if (!navigationRef.current) {
      return;
    }
    const currentRouteName = navigationRef.current.getCurrentRoute()?.name;

    routeNameRef.current = currentRouteName;
  }, []);

  return (
    <GestureHandlerRootView style={styleFlex}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current =
              navigationRef?.current?.getCurrentRoute()?.name;
            setTimeout(() => {
              RNBootSplash.hide({ fade: true });
            }, 2000);
          }}
          onStateChange={handleStateChange}>
          <StatusBar
            barStyle="dark-content"
            translucent={true}
            hidden={false}
            backgroundColor="transparent"
          />
          <NavigationRoot />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
