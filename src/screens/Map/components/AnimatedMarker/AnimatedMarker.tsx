import React, { memo, useCallback, useEffect } from 'react';
import { TAnimatedMarkerProps } from './AnimatedMarker.types';
// import { useStyles } from './AnimatedMarker.styles';
import { Marker } from 'react-native-maps-osmdroid';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CargoIcon from '../../../../components/Icons/Map/CargoIcon';

const AnimateMarker = Animated.createAnimatedComponent(Marker) as any;

export const useAnimatedRegion = (location: {
  longitude: number;
  latitude: number;
}) => {
  const latitute = useSharedValue(location.latitude);
  const longitude = useSharedValue(location.longitude);

  const animatedProps = useAnimatedProps(() => ({
    coordinate: {
      latitude: latitute.value ?? 0,
      longitude: longitude.value ?? 0,
    },
  }));

  const animate = useCallback(
    (options: {
      duration: number;
      easing: any;
      latitude: number;
      longitude: number;
    }) => {
      const { duration = 500, easing = Easing.inOut(Easing.ease) } = options;

      const animateValue = (value: any, toValue: number) => {
        if (!toValue) {
          return;
        }

        value.value = withTiming(toValue, {
          duration,
          easing,
        });
      };

      animateValue(latitute, options.latitude);
      animateValue(longitude, options.longitude);
    },
    [latitute, longitude],
  );

  return {
    props: animatedProps,
    animate,
  };
};

const AnimatedMarker: React.FC<TAnimatedMarkerProps> = ({ coords }) => {
  // const styles = useStyles();

  const animatedRegion = useAnimatedRegion(coords);

  useEffect(() => {
    animatedRegion.animate({
      latitude: coords.latitude,
      longitude: coords.longitude,
      duration: 5000,
      easing: Easing.linear,
    });
  }, [animatedRegion, coords.latitude, coords.longitude]);

  return (
    <AnimateMarker
      animatedProps={animatedRegion.props}
      anchor={{ x: 0.5, y: 0.5 }}>
      <CargoIcon color={'black'} />
    </AnimateMarker>
  );
};

export default memo(AnimatedMarker);
