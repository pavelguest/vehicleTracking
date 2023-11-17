import React from 'react';
import { memo } from 'react';
import { TMapObjectProps } from './MapObject.types';
import { useStyles } from './MapObject.styles';
import { Marker, Polyline } from 'react-native-maps-osmdroid';
import { AnimatedMarker } from '../AnimatedMarker';
import StopPoint from '../../../../components/Icons/Map/StopPoint';
import { View } from 'react-native';

const MapObject: React.FC<TMapObjectProps> = ({
  type,
  route,
  vehicle,
  stopPoint,
  openStopPointModal,
}) => {
  const styles = useStyles();

  switch (type) {
    case 'point': {
      return (
        <AnimatedMarker
          vehicle={vehicle}
          coords={{ latitude: vehicle.n, longitude: vehicle.e }}
          course={vehicle.course}
        />
      );
    }
    case 'stop-point': {
      return (
        <Marker
          coordinate={stopPoint.coordinate}
          onPress={openStopPointModal}
          anchor={{ x: 0.5, y: 0.5 }}>
          <View style={styles.iconContainer}>
            <StopPoint color={styles.iconColor.color} />
          </View>
        </Marker>
      );
    }
    case 'route': {
      return (
        <Polyline
          coordinates={route.coordinates}
          strokeColor={route.strokeColor}
          strokeWidth={route.strokeWidth}
        />
      );
    }

    default:
      return null;
  }
};

export default memo(MapObject);
