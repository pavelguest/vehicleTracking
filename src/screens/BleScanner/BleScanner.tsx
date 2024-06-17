import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  FlatList,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  IBeaconViewProps,
  IBleDevice,
  TBleScannerProps,
} from './BleScanner.types';
import { useStyles } from './BleScanner.styles';
import { Touchable } from '../../components/Touchable';
import BleManager, {
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
} from 'react-native-ble-manager';

const BeaconView: React.FC<IBeaconViewProps> = ({ item, onPress }) => {
  const styles = useStyles();

  return (
    <Touchable style={styles.beaconContainer} onPress={onPress}>
      <Text style={styles.bleItemTitle}>{item.name}</Text>
    </Touchable>
  );
};

export const handleBlePermissions = () => {
  if (Platform.OS === 'android' && Platform.Version >= 31) {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]).then(result => {
      if (result) {
        console.debug(
          '[handleAndroidPermissions] User accepts runtime permissions android 12+',
        );
      } else {
        console.error(
          '[handleAndroidPermissions] User refuses runtime permissions android 12+',
        );
      }
    });
  } else if (Platform.OS === 'android' && Platform.Version >= 23) {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(checkResult => {
      if (checkResult) {
        console.debug(
          '[handleAndroidPermissions] runtime permission Android <12 already OK',
        );
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(requestResult => {
          if (requestResult) {
            console.debug(
              '[handleAndroidPermissions] User accepts runtime permission android <12',
            );
          } else {
            console.error(
              '[handleAndroidPermissions] User refuses runtime permission android <12',
            );
          }
        });
      }
    });
  }
};

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const SECONDS_TO_SCAN_FOR = 3;
const SERVICE_UUIDS: string[] = ['b2352b64-cec0-4afb-bca5-84c3eedbe704'];
const ALLOW_DUPLICATES = true;

export const startScan = (
  setRefreshing?: Dispatch<SetStateAction<boolean>>,
): void => {
  try {
    console.debug('[startScan] starting scan...');
    BleManager.scan(SERVICE_UUIDS, SECONDS_TO_SCAN_FOR, ALLOW_DUPLICATES, {
      matchMode: BleScanMatchMode.Sticky,
      scanMode: BleScanMode.LowLatency,
      callbackType: BleScanCallbackType.AllMatches,
    })
      .then(() => {
        console.debug('[startScan] scan promise returned successfully.');
        setRefreshing && setRefreshing(false);
      })
      .catch(err => {
        console.error('[startScan] ble scan returned in error', err);
        setRefreshing && setRefreshing(false);
      });
  } catch (error) {
    console.error('[startScan] ble scan error thrown', error);
    setRefreshing && setRefreshing(false);
  }
};

const BleScanner: React.FC<TBleScannerProps> = ({ navigation }) => {
  const styles = useStyles();
  const [peripherals, setPeripherals] = useState<IBleDevice[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    try {
      BleManager.start({ showAlert: false })
        .then(() => {
          console.debug('BleManager started.');
        })
        .catch(error =>
          console.error('BeManager could not be started.', error),
        );
    } catch (error) {
      console.error('unexpected error starting BleManager.', error);
      return;
    }

    const listeners = [
      bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      ),
      bleManagerEmitter.addListener('BleManagerStopScan', () => {}),
      bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', () => {}),
      bleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        () => {},
      ),
    ];

    handleBlePermissions();

    return () => {
      console.debug('[app] main component unmounting. Removing listeners...');
      for (const listener of listeners) {
        listener.remove();
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      try {
        setPeripherals([]);
        startScan();
      } catch (error) {
        return;
      }
    }, 1000);
  }, []);

  console.log(
    'serviceData',
    peripherals[0]?.advertising.serviceData,
    peripherals[1]?.advertising.serviceData,
  );

  const handleDiscoverPeripheral = (peripheral: IBleDevice) => {
    if (peripheral?.advertising.serviceUUIDs[0] === SERVICE_UUIDS[0]) {
      setPeripherals(prevPeripherals => {
        const index = prevPeripherals.findIndex(
          p => p.name === peripheral.name,
        );

        if (index !== -1) {
          // Обновляем существующий периферийный маячок
          const updatedPeripherals = [...prevPeripherals];
          updatedPeripherals[index] = peripheral;
          return updatedPeripherals;
        } else {
          // Добавляем новый периферийный маячок
          return [...prevPeripherals, peripheral];
        }
      });
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPeripherals([]);
    startScan(setRefreshing);
  };

  const handleBeaconPress = (item: IBleDevice) => {
    navigation.navigate('ChangeBleScanner', { peripheral: item });
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        hidden={false}
        backgroundColor="transparent"
      />
      <FlatList
        data={peripherals}
        keyExtractor={item => 'beacon_' + item.id}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <BeaconView item={item} onPress={() => handleBeaconPress(item)} />
        )}
        ListEmptyComponent={() => (
          <View style={styles.listEmptyContainer}>
            <Text style={styles.bleItemTitle}>
              Маяков поблизости не обнаружено
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default memo(BleScanner);
