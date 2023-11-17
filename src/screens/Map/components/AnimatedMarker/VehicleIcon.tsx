import React, { memo } from 'react';
import { View, Text, Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import CaretLeftIcon from '../../../../components/Icons/Map/CaretLeftIcon';
import BusIcon from '../../../../components/Icons/Map/BusIcon';
import TramIcon from '../../../../components/Icons/Map/TramIcon';

const autoType = {
  0: 'bus',
  2: 'tram',
  3: 'bus',
};

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  icon: {
    height: 60,
    width: 60,
    justifyContent: 'center',
  },
  iconMoreThanThreeCharacters: {
    height: 65,
    width: 65,
    justifyContent: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    zIndex: 2,
  },
  busIconContainer: {
    position: 'absolute',
    left: 17,
    height: 25,
    width: 25,
    backgroundColor: 'green',
    borderColor: 'white',
    borderRadius: 15,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  busIconContainerMoreThanThreeCharacters: {
    left: 20,
  },
  triangle: {
    position: 'absolute',
    left: 7.5,
    zIndex: 2,
  },
  busNumberLeftContainer: {
    position: 'absolute',
    left: isAndroid ? 30 : 34,
    height: 20,
    width: 30,
    backgroundColor: 'green',
    borderColor: 'white',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'center',
    paddingRight: 1,
    zIndex: 1,
  },
  busNumberRightContainer: {
    position: 'absolute',
    right: isAndroid ? 30 : 34,
    height: 20,
    width: 30,
    backgroundColor: 'green',
    borderColor: 'white',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    paddingLeft: 1,
    zIndex: 1,
  },
  busNumberLeftContainerMoreThanThree: {
    width: 33,
    left: isAndroid ? 32.5 : 36.5,
  },
  busNumberRightContainerMoreThanThree: {
    width: 33,
    right: isAndroid ? 32.5 : 36.5,
  },
  busNumberTextContainer: {
    position: 'absolute',
    right: -6,
  },
  busNumberText: {
    color: 'white',
    fontSize: 12,
  },
  busNumberTextMoreThanThreeCharacters: {
    color: 'white',
    fontSize: 10.5,
  },
  timeUpdateHint: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'grey',
    // width: 0,
    // height: 0,
    // opacity: 0,
  },
});

export const autoColor = {
  0: 'green',
  2: 'red',
  3: 'purple',
};

const VehicleIcon = ({ vehicle, course }) => {
  const currentCourse = 90 + course >= 360 ? 90 + course - 360 : 90 + course;

  const combinedBusIconContainerStyles = StyleSheet.compose(
    styles.busIconContainer,
    {
      backgroundColor: autoColor[vehicle.routeType],
    },
  );

  const isRightCourse = currentCourse >= 90 && currentCourse <= 270;
  const isMoreThanThreeCharacters = vehicle.routeNumber.toString().length >= 3;

  const combinedBusNumberContainerStyles = StyleSheet.compose(
    isRightCourse
      ? [
          styles.busNumberRightContainer,
          isMoreThanThreeCharacters &&
            styles.busNumberRightContainerMoreThanThree,
        ]
      : [
          styles.busNumberLeftContainer,
          isMoreThanThreeCharacters &&
            styles.busNumberLeftContainerMoreThanThree,
        ],
    {
      backgroundColor: autoColor[vehicle.routeType],
    },
  );

  const combinedBusNumberTextContainerStyles = StyleSheet.compose(
    isRightCourse
      ? null
      : vehicle.routeNumber.toString().length >= 4
      ? styles.busNumberTextContainer
      : null,
    {
      backgroundColor: autoColor[vehicle.routeType],
    },
  );

  const combinedIconContainerStyles = StyleSheet.compose(styles.iconContainer, {
    transform: [{ rotate: `${currentCourse}deg` }],
  });

  return (
    <View
      style={[
        styles.icon,
        isMoreThanThreeCharacters && styles.iconMoreThanThreeCharacters,
      ]}>
      <View style={combinedIconContainerStyles}>
        <View style={combinedBusIconContainerStyles}>
          <View
            style={{
              transform: [{ rotate: `${-currentCourse}deg` }],
            }}>
            {vehicle.routeType !== 2 ? (
              <BusIcon color={'white'} />
            ) : (
              <TramIcon color={'white'} />
            )}
          </View>
        </View>
        <View style={styles.triangle}>
          <CaretLeftIcon color={autoColor[vehicle.routeType]} />
        </View>
      </View>

      <View style={combinedBusNumberContainerStyles}>
        <View style={combinedBusNumberTextContainerStyles}>
          <Text
            style={[
              styles.busNumberText,
              isMoreThanThreeCharacters &&
                styles.busNumberTextMoreThanThreeCharacters,
            ]}>
            {vehicle.routeNumber}
          </Text>
        </View>
      </View>
      <View style={styles.timeUpdateHint}>
        <Text style={styles.busNumberText}>
          {vehicle.t} {currentCourse}
        </Text>
      </View>
    </View>
  );
};

export default memo(VehicleIcon);
