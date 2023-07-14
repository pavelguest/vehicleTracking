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
// import { WebView } from 'react-native-webview';

const DEFAULT_COORDINATE: LatLng = {
  lat: 58.0105,
  lng: 56.2502,
};

const regexStopPoints = /POINT \((\d+\.\d+) (\d+\.\d+)\)/;

const regexTrackGeometry = /\(([\d.]+\s[\d.]+)(?:,\s)?/g;

const Home: React.FC<THomeProps> = () => {
  const styles = useStyles();
  const [stopsAndWaypoints, setStopsAndWaypoints] =
    useState<IStopsAndWaPointsData | null>(null);

  const [stopData, setStopsData] = useState<IStopPointsData | undefined>(
    undefined,
  );

  const selectStopPointsModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const currentDate = dayjs().format('DD.MM.YYYY');
    const vehicleNumber = '01';
    getStopsAndWaypointsData(currentDate, vehicleNumber)
      .then(response => {
        setStopsAndWaypoints(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    getVehiclesTrackingData(vehicleNumber)
      .then(response => {
        // console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
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
            icon: '📍',
            title: stopPoints.stoppointName,
            id: stopPoints.stoppointId,
          };
        }
      }
    });
  }, [stopsAndWaypoints, regexStopPoints]);

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
            icon: '📍',
            title: stopPoints.stoppointName,
            id: stopPoints.stoppointId,
          };
        }
      }
    });
  }, [stopsAndWaypoints, regexStopPoints]);

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

      console.log('Coordinates:', coordinates);
      return {
        shapeType: MapShapeType.POLYLINE,
        positions: coordinates,
        color: 'red',
      };
    }
  }, [stopsAndWaypoints, regexTrackGeometry]);

  const handleNavigateToSelectStopPoints = useCallback(() => {
    selectStopPointsModalRef.current?.present();
  }, []);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        hidden={false}
        backgroundColor="transparent"
      />
      <LeafletView
        // mapShapes={bkwdTrackGeometry}
        mapMarkers={
          fwdStopPointsLocation &&
          bkwdStopPointsLocation && [
            ...fwdStopPointsLocation,
            ...bkwdStopPointsLocation,
          ]
        }
        mapCenterPosition={DEFAULT_COORDINATE}
        zoom={12}
        onMessageReceived={msg => {
          if (msg.event === 'onMapMarkerClicked') {
            const findFwdStop = stopsAndWaypoints?.fwdStoppoints.find(
              stop => stop.stoppointId === msg.payload?.mapMarkerID,
            );
            const findbkwdStop = stopsAndWaypoints?.bkwdStoppoints.find(
              stop => stop.stoppointId === msg.payload?.mapMarkerID,
            );

            setStopsData(findFwdStop || findbkwdStop);
            handleNavigateToSelectStopPoints();
          }
        }}
      />
      {/* <WebView
        source={{ uri: 'https://reactnative.dev/' }}
        style={{ flex: 1 }}
      /> */}
      <SelectStopPoints
        title={'Остановка'}
        modalRef={selectStopPointsModalRef}
        stopPointsData={stopData}
      />
    </SafeAreaView>
  );
};

export default memo(Home);
