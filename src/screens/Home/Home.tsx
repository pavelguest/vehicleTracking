import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { useStyles } from './Home.styles';
import { THomeProps } from './Home.types';
import { memo, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const Home: React.FC<THomeProps> = () => {
  const styles = useStyles();

  const selectVehicleCategoriesModalRef = useRef<BottomSheetModal>(null);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        hidden={false}
        backgroundColor="transparent"
      />
      <Text>Hello</Text>
    </View>
  );
};

export default memo(Home);
