import React, { useCallback, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Touchable } from '../../components/Touchable';
import { TScannerOldProps } from './ScannerOld.types';
import { useStyles } from './ScannerOld.styles';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const ScannerOld: React.FC<TScannerOldProps> = () => {
  const styles = useStyles();
  // const { hasPermission, requestPermission } = useCameraPermission();
  const [isNextStep, setIsNextStep] = useState<boolean>(false);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  const handleScanAgain = useCallback(() => setIsNextStep(false), []);

  const onRead = (e: { data: string }) => {
    setIsNextStep(true);
    setQrCodeData(e.data);
  };

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
          {qrCodeData && (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>данные: {qrCodeData}</Text>
            </View>
          )}
          <Touchable onPress={handleScanAgain} style={styles.button}>
            <Text style={styles.buttonTitle}>Отсканировать еще раз</Text>
          </Touchable>
        </View>
      ) : (
        <>
          <QRCodeScanner
            onRead={onRead}
            flashMode={RNCamera.Constants.FlashMode.off}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default memo(ScannerOld);
