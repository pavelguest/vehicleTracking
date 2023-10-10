import React, { useCallback } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THomeProps } from './Home.types';
import { useStyles } from './Home.styles';
import { Touchable } from '../../components/Touchable';

const Home: React.FC<THomeProps> = ({ navigation }) => {
  const styles = useStyles();

  const handleNavigateToScanner = useCallback(() => {
    navigation.navigate('Scanner');
  }, [navigation]);

  const handleNavigateToScannerOld = useCallback(() => {
    navigation.navigate('ScannerOld');
  }, [navigation]);

  const handleNavigateToMap = useCallback(() => {
    navigation.navigate('Map');
  }, [navigation]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        hidden={false}
        backgroundColor="transparent"
      />
      <View style={styles.buttonContainer}>
        <Touchable style={styles.button} onPress={handleNavigateToScanner}>
          <Text style={styles.buttonTitle}>Сканер</Text>
        </Touchable>
        <Touchable style={styles.button} onPress={handleNavigateToScannerOld}>
          <Text style={styles.buttonTitle}>Старый сканер</Text>
        </Touchable>
        <Touchable style={styles.button} onPress={handleNavigateToMap}>
          <Text style={styles.buttonTitle}>Карта</Text>
        </Touchable>
      </View>
    </SafeAreaView>
  );
};

export default memo(Home);
