import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StatusBar } from 'react-native';
import { useStyles } from './Home.styles';
import {
  IAutosData,
  IStopPointsData,
  IStopsAndWaPointsData,
  THomeProps,
} from './Home.types';
import { memo } from 'react';
import {
  getStopsAndWaypointsData,
  getVehiclesTrackingData,
} from '../../api/vehicleApi';
import dayjs from 'dayjs';
import {
  LatLng,
  LeafletView,
  MapMarker,
  MapShape,
  MapShapeType,
} from 'react-native-leaflet-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SelectStopPoints } from '../../modals/SelectStopPoints';

const DEFAULT_COORDINATE: LatLng = {
  lat: 58.0105,
  lng: 56.2502,
};

const DEFAULT_VEHICLE_NUMBER = '01';

const regexStopPoints = /POINT \((\d+\.\d+) (\d+\.\d+)\)/;

const regexTrackGeometry = /\(([\d.]+\s[\d.]+)(?:,\s)?/g;

const Home: React.FC<THomeProps> = () => {
  const styles = useStyles();
  const [stopsAndWaypoints, setStopsAndWaypoints] =
    useState<IStopsAndWaPointsData | null>(null);

  const [stopData, setStopsData] = useState<IStopPointsData | undefined>(
    undefined,
  );

  const [autosData, setAutosData] = useState<IAutosData | undefined>(undefined);

  const selectStopPointsModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const currentDate = dayjs().format('DD.MM.YYYY');
    getStopsAndWaypointsData(currentDate, DEFAULT_VEHICLE_NUMBER)
      .then(response => {
        setStopsAndWaypoints(response.data);
      })
      .catch(error => {
        console.warn(error);
      });
  }, []);

  useEffect(() => {
    setInterval(() => {
      getVehiclesTrackingData(DEFAULT_VEHICLE_NUMBER)
        .then(response => {
          setAutosData(response.data);
        })
        .catch(error => {
          console.warn(error);
        });
    }, 10000);
  }, []);

  const fwdStopPointsLocation: MapMarker[] | undefined = useMemo(() => {
    return stopsAndWaypoints?.fwdStoppoints.map(stopPoints => {
      if (stopPoints.location) {
        const match = regexStopPoints.exec(stopPoints.location);
        if (match) {
          return {
            position: {
              lng: match[1],
              lat: match[2],
            },
            size: [32, 32],
            icon: '🚏',
            id: stopPoints.stoppointId,
          };
        }
      }
    });
  }, [stopsAndWaypoints]);

  const bkwdStopPointsLocation: MapMarker[] | undefined = useMemo(() => {
    return stopsAndWaypoints?.bkwdStoppoints.map(stopPoints => {
      if (stopPoints.location) {
        const match = regexStopPoints.exec(stopPoints.location);
        if (match) {
          return {
            position: {
              lng: match[1],
              lat: match[2],
            },
            size: [32, 32],
            icon: '🚏',
            id: stopPoints.stoppointId,
          };
        }
      }
    });
  }, [stopsAndWaypoints]);

  const autosPointsLocation: MapMarker[] | undefined = useMemo(() => {
    return autosData?.autos.map(auto => {
      if (auto) {
        return {
          position: {
            lng: auto.e,
            lat: auto.n,
          },
          size: [32, 32],
          icon: '🚌',
          title: auto.gosNom,
          id: 'car',
        };
      }
    });
  }, [autosData?.autos]);

  const fwdTrackGeometry: MapShape[] | undefined = useMemo(() => {
    const matches = stopsAndWaypoints?.bkwdTrackGeom.match(regexTrackGeometry);

    if (matches) {
      const coordinates = matches.map(match => {
        const latlng = match
          .replace('(', '')
          .replace(',', '')
          .trim()
          .split(' ');

        return {
          lng: latlng[0],
          lat: latlng[1],
        };
      });

      return {
        shapeType: MapShapeType.POLYLINE,
        positions: coordinates,
        color: 'green',
      };
    }
  }, [stopsAndWaypoints]);

  const bkwdTrackGeometry: MapShape[] | undefined = useMemo(() => {
    const matches = stopsAndWaypoints?.bkwdTrackGeom.match(regexTrackGeometry);

    if (matches) {
      const coordinates = matches.map(match => {
        const latlng = match
          .replace('(', '')
          .replace(',', '')
          .trim()
          .split(' ');

        return {
          lng: latlng[0],
          lat: latlng[1],
        };
      });

      return {
        shapeType: MapShapeType.POLYLINE,
        positions: coordinates,
        color: 'blue',
      };
    }
  }, [stopsAndWaypoints]);

  const handleNavigateToSelectStopPoints = useCallback(
    (stopsData: IStopPointsData | undefined) => {
      setStopsData(stopsData);
      selectStopPointsModalRef.current?.present();
    },
    [],
  );

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        hidden={false}
        backgroundColor="transparent"
      />
      <LeafletView
        mapShapes={
          fwdTrackGeometry &&
          bkwdTrackGeometry && [fwdTrackGeometry, bkwdTrackGeometry]
        }
        mapMarkers={
          autosPointsLocation
            ? fwdStopPointsLocation &&
              bkwdStopPointsLocation && [
                ...fwdStopPointsLocation,
                ...bkwdStopPointsLocation,
                ...autosPointsLocation,
              ]
            : fwdStopPointsLocation &&
              bkwdStopPointsLocation && [
                ...fwdStopPointsLocation,
                ...bkwdStopPointsLocation,
              ]
        }
        mapCenterPosition={DEFAULT_COORDINATE}
        zoom={12}
        onMessageReceived={msg => {
          if (
            msg.event === 'onMapMarkerClicked' &&
            msg.payload?.mapMarkerID !== 'car'
          ) {
            const findFwdStop = stopsAndWaypoints?.fwdStoppoints.find(
              stop => stop.stoppointId === +msg.payload?.mapMarkerID!,
            );
            const findbkwdStop = stopsAndWaypoints?.bkwdStoppoints.find(
              stop => stop.stoppointId === +msg.payload?.mapMarkerID!,
            );

            handleNavigateToSelectStopPoints(findFwdStop || findbkwdStop);
          }
        }}
      />
      <SelectStopPoints
        title={'Остановка'}
        modalRef={selectStopPointsModalRef}
        stopPointsData={stopData}
      />
    </SafeAreaView>
  );
};

export default memo(Home);
