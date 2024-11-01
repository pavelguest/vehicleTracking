import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
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
      {item.id && <Text style={styles.bleItemTitle}>{`id: ${item.id}`}</Text>}
      {item.name && (
        <Text style={styles.bleItemTitle}>{`name: ${item.name}`}</Text>
      )}
      {item.rssi && (
        <Text style={styles.bleItemTitle}>{`distance: ${calculateDistance(
          item.rssi,
        ).toFixed(2)} meters`}</Text>
      )}
      {item.rssi && (
        <Text style={styles.bleItemTitle}>{`rssi: ${item.rssi.toFixed(
          2,
        )}`}</Text>
      )}
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
const SERVICE_UUIDS: string[] = []; // add service uuids...
const ALLOW_DUPLICATES = true;

function calculateDistance(rssi: number, measure = -69, multiplier = 2) {
  return Math.pow(10, (measure - rssi) / (10 * multiplier));
}

function addRssiValueAndGetAverage(
  deviceId: string,
  newValue: number,
  rssiRef: React.RefObject<{ [key: string]: number[] }>,
  maxSize = 3,
) {
  const rssiArrays = rssiRef.current;

  if (!rssiArrays) {
    return;
  }

  if (!rssiArrays[deviceId]) {
    rssiArrays[deviceId] = [];
  }
  const values = rssiArrays[deviceId];
  values.push(newValue);

  if (values.length > maxSize) {
    values.shift();
  }

  const averageRssi =
    values.reduce((acc, value) => acc + value, 0) / values.length;
  return averageRssi;
}

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
  const rssiRef = useRef<{ [key: string]: number[] }>({});

  const handleDiscoverPeripheral = (peripheral: IBleDevice) => {
    if (SERVICE_UUIDS.includes(peripheral?.advertising.serviceUUIDs[0])) {
      console.log(peripheral);
      setPeripherals(prevPeripherals => {
        const index = prevPeripherals.findIndex(
          p => p.id === peripheral.id, // Use id for matching
        );

        if (index !== -1) {
          // Обновляем существующий периферийный маячок
          const updatedPeripherals = [...prevPeripherals];
          const averageRssi = addRssiValueAndGetAverage(
            peripheral.id,
            peripheral.rssi,
            rssiRef,
          );
          updatedPeripherals[index] = {
            ...peripheral,
            rssi: averageRssi ? averageRssi : 0,
          };
          return updatedPeripherals;
        } else {
          // Добавляем новый периферийный маячок
          return [...prevPeripherals, peripheral];
        }
      });
    }
  };

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
        rssiRef.current = {}; // Clear rssiRef
        startScan();
      } catch (error) {
        return;
      }
    }, 1000);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setPeripherals([]);
    rssiRef.current = {}; // Clear rssiRef
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
