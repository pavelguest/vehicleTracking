import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TScannerProps } from './Scanner.types';
import { useStyles } from './Scanner.styles';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { Touchable } from '../../components/Touchable';

const Scanner: React.FC<TScannerProps> = () => {
  const styles = useStyles();
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const [isNextStep, setIsNextStep] = useState<boolean>(false);
  const [qrCodeData, setQrCodeData] = useState<Code[] | null>(null);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes?.length) {
        setIsNextStep(true);
        setQrCodeData(codes);
        return;
      }
    },
  });

  const handleScanAgain = useCallback(() => setIsNextStep(false), []);

  useEffect(() => {
    requestPermission().then(res => {
      if (!res && !hasPermission) {
        Alert.alert(
          'Доступ к камере заблокирован',
          'Чтобы включить службы камеры, перейдите в настройки устройства и разрешите доступ к камере.',
          [
            {
              text: 'Отмена',
              style: 'cancel',
            },
            {
              text: 'Перейти в настройки',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        return;
      }
    });
  }, [hasPermission, requestPermission]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        hidden={false}
        backgroundColor="transparent"
      />
      {isNextStep ? (
        <View>
          {qrCodeData &&
            qrCodeData.map((qr, index) => (
              <View style={styles.titleContainer} key={index}>
                {qr.type && <Text style={styles.title}>тип: {qr.type}</Text>}
                {qr.value && (
                  <Text style={styles.title}>данные: {qr.value}</Text>
                )}
              </View>
            ))}
          <Touchable onPress={handleScanAgain} style={styles.button}>
            <Text style={styles.buttonTitle}>Отсканировать еще раз</Text>
          </Touchable>
        </View>
      ) : (
        <>
          {!device ? (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Ошибка</Text>
            </View>
          ) : hasPermission ? (
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={hasPermission}
              codeScanner={codeScanner}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default memo(Scanner);
