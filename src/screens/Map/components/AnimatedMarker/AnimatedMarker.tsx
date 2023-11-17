import React, { memo, useCallback, useEffect, useState } from 'react';
import { TAnimatedMarkerProps } from './AnimatedMarker.types';
// import { useStyles } from './AnimatedMarker.styles';
import { Marker } from 'react-native-maps-osmdroid';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import VehicleIcon from './VehicleIcon';

const AnimateMarker = Animated.createAnimatedComponent(Marker) as any;

export const useAnimatedRegion = (
  location: {
    longitude: number;
    latitude: number;
  },
  handleChangeCourseAnimation: (isEnd: boolean) => void,
) => {
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

        if (value.value === toValue) {
          return;
        }

        value.value = withTiming(
          toValue,
          {
            duration,
            easing,
          },
          finished => {
            // console.log(value.value, toValue, finished);
            finished && runOnJS(handleChangeCourseAnimation)(finished);
          },
        );
      };

      animateValue(latitute, options.latitude);
      animateValue(longitude, options.longitude);
    },
    [handleChangeCourseAnimation, latitute, longitude],
  );

  return {
    props: animatedProps,
    animate,
  };
};

const AnimatedMarker: React.FC<TAnimatedMarkerProps> = ({
  vehicle,
  coords,
  course,
}) => {
  // const styles = useStyles();

  const [oldCoords, setOldCoords] = useState(null);
  const [angle, setAngle] = useState(null);
  const [isEndAnimation, setIsEndAnimation] = useState(false);

  const handleChangeCourseAnimation = useCallback((isEnd: boolean) => {
    setIsEndAnimation(isEnd);
  }, []);

  const animatedRegion = useAnimatedRegion(coords, handleChangeCourseAnimation);

  useEffect(() => {
    if (oldCoords && coords) {
      const rad = Math.atan2(
        coords.longitude - oldCoords.longitude,
        coords.latitude - oldCoords.latitude,
      );
      const deg = (rad / Math.PI) * 180;

      deg && setAngle(Math.ceil(deg));
    }
  }, [coords, oldCoords]);

  useEffect(() => {
    if (coords) {
      setOldCoords(coords);
    }
  }, [coords]);

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
      {/* <CargoIcon color={'black'} /> */}
      <VehicleIcon
        vehicle={vehicle}
        course={angle && !isEndAnimation ? angle : vehicle?.course}
      />
    </AnimateMarker>
  );
};

export default memo(AnimatedMarker);
