import React, { useEffect, useState, useCallback, memo } from 'react';
import {
  Text,
  TextInput,
  View,
  Alert,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TChangeBleScannerProps } from './ChangeBleScanner.types';
import { useStyles } from './ChangeBleScanner.styles';
import { Touchable } from '../../components/Touchable';
import BleManager from 'react-native-ble-manager';

const ChangeBleScanner: React.FC<TChangeBleScannerProps> = ({
  navigation,
  route,
}) => {
  const styles = useStyles();

  const peripheral = route.params?.peripheral;
  const [pinCode, setPinCode] = useState('');
  const [newName, setNewName] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    peripheral?.name && setNewName(peripheral.name);
  }, [peripheral?.name]);

  const changeBeaconName = useCallback(() => {
    const serviceUUID = peripheral?.advertising?.serviceUUIDs
      ? peripheral.advertising.serviceUUIDs[0]
      : '';
    if (newName && peripheral && serviceUUID) {
      setIsLoading(true);

      BleManager.connect(peripheral.id)
        .then(() => {
          console.log('Connected to ' + peripheral.id);
          setIsConnected(true);

          // const characteristicUUID = '';
          // const base64String = btoa(newName);

          // return BleManager.write(
          //   peripheral.id,
          //   serviceUUID,
          //   characteristicUUID,
          //   base64String,
          // );
          return BleManager.setName(newName);
        })
        .then(() => {
          Alert.alert('Выполнено', 'Имя маячка изменено');
          return BleManager.disconnect(peripheral.id);
        })
        .then(() => {
          console.log('Disconnected from ' + peripheral.id);
          setIsConnected(false);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          Alert.alert('Ошибка', 'Имя маячка изменить не удалось');
          setIsConnected(false);
          setIsLoading(false);
        });
    } else {
      // Alert.alert('Error', 'Please enter pin code and new name');
    }
  }, [newName, peripheral]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        hidden={false}
        backgroundColor="transparent"
      />
      <View>
        {peripheral?.name && (
          <Text style={styles.bleItemTitle}>
            Текущее имя маячка: {peripheral.name}
          </Text>
        )}
        {peripheral?.name && (
          <Text style={styles.bleItemTitle}>
            Подключено: {isConnected ? 'Да' : 'Нет'}
          </Text>
        )}
        {/* <TextInput
          placeholder="Enter Pin Code"
          value={pinCode}
          onChangeText={setPinCode}
          secureTextEntry
          style={styles.input}
        /> */}
        <TextInput
          placeholder="Введите имя"
          value={newName}
          onChangeText={setNewName}
          style={styles.input}
        />
        <Touchable onPress={changeBeaconName} style={styles.button}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Изменить</Text>
          )}
        </Touchable>
      </View>
    </SafeAreaView>
  );
};

export default memo(ChangeBleScanner);
