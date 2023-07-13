import React, { useEffect } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { useStyles } from './Home.styles';
import { THomeProps } from './Home.types';
import { memo } from 'react';
import {
  getStopsAndWaypointsData,
  getVehiclesTrackingData,
} from '../../api/vehicleApi';
import dayjs from 'dayjs';

const Home: React.FC<THomeProps> = () => {
  const styles = useStyles();

  useEffect(() => {
    const currentDate = dayjs().format('DD.MM.YYYY');
    const vehicleNumber = '01';
    getStopsAndWaypointsData(currentDate, vehicleNumber)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    getVehiclesTrackingData(vehicleNumber)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
