import React, { useCallback, useState } from 'react';
import { Linking, StatusBar, Text, View } from 'react-native';
import { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THomeProps } from './Home.types';
import { useStyles } from './Home.styles';
import { Touchable } from '../../components/Touchable';
import { Tabs } from '../../components/Tabs';

const Home: React.FC<THomeProps> = ({ navigation }) => {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const googlePlayURL = 'market://details?id=com.proezdnoy59app';

  const isGooglePlayInstalled = async () => {
    const supported = await Linking.canOpenURL(googlePlayURL);

    return supported;
  };

  const handleCheckUpdate = useCallback(() => {
    isGooglePlayInstalled().then(installed => {
      if (installed) {
        Linking.openURL(googlePlayURL);
      }
    });
  }, []);

  const handleNavigateToScanner = useCallback(() => {
    navigation.navigate('Scanner');
  }, [navigation]);

  const handleNavigateToScannerOld = useCallback(() => {
    navigation.navigate('ScannerOld');
  }, [navigation]);

  const handleNavigateToMap = useCallback(() => {
    navigation.navigate('Map');
  }, [navigation]);

  const handleNavigateToBleScanner = useCallback(() => {
    navigation.navigate('BleScanner');
  }, [navigation]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        hidden={false}
        backgroundColor="transparent"
      />
      <Tabs
        items={['first', 'second']}
        selectedIndex={selectedTab}
        onChange={i => {
          setSelectedTab(i);
        }}
        barColor={styles.container.backgroundColor}
        indicatorColor={'blue'}
        activeTextColor={'white'}
        inactiveTextColor={'grey'}
      />
      {selectedTab === 0 && (
        <View style={styles.tabsContainer}>
          <Text>First</Text>
        </View>
      )}
      {selectedTab === 1 && (
        <View style={styles.tabsContainer}>
          <Text>Second</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Touchable style={styles.button} onPress={handleCheckUpdate}>
          <Text style={styles.buttonTitle}>Открыть маркет</Text>
        </Touchable>
        <Touchable style={styles.button} onPress={handleNavigateToScanner}>
          <Text style={styles.buttonTitle}>Сканер</Text>
        </Touchable>
        <Touchable style={styles.button} onPress={handleNavigateToScannerOld}>
          <Text style={styles.buttonTitle}>Старый сканер</Text>
        </Touchable>
        <Touchable style={styles.button} onPress={handleNavigateToMap}>
          <Text style={styles.buttonTitle}>Карта</Text>
        </Touchable>
        <Touchable style={styles.button} onPress={handleNavigateToBleScanner}>
          <Text style={styles.buttonTitle}>Ble scanner</Text>
        </Touchable>
      </View>
    </SafeAreaView>
  );
};

export default memo(Home);
