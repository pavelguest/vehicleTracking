import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Platform, StatusBar } from 'react-native';
import { useStyles } from './Map.styles';
import {
  IAutosData,
  IStopPointsData,
  IStopsAndWaPointsData,
  TMapProps,
} from './Map.types';
import { memo } from 'react';
import {
  getStopsAndWaypointsData,
  getVehiclesTrackingData,
} from '../../api/vehicleApi';
import dayjs from 'dayjs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SelectStopPoints } from '../../modals/SelectStopPoints';
import MapView from 'react-native-maps-osmdroid';
import { MapControls } from './components/MapControls';
import { MapObject } from './components/MapObject';

export const defaultZoom = 16;
export const autosVisibleZoom = 14;

export const defaultAltitude = 1200;
export const autosVisibleAltitude = 4700;

export const maxZoomIn = 19;
export const maxZoomOut = 6;

export const DEFAULT_COORDINATE = {
  latitude: 58.0105,
  longitude: 56.2502,
  latitudeDelta: 0.0222,
  longitudeDelta: 0.0121,
};

const DEFAULT_VEHICLE_NUMBER = '01';

const regexStopPoints = /POINT \((\d+\.\d+) (\d+\.\d+)\)/;

const regexTrackGeometry = /(\d+\.\d+)/g;

const Map: React.FC<TMapProps> = () => {
  const styles = useStyles();

  const mapRef = useRef<React.useRef<MapView | null>>(null);

  const [stopsAndWaypoints, setStopsAndWaypoints] =
    useState<IStopsAndWaPointsData | null>(null);

  const [stopData, setStopData] = useState<IStopPointsData | undefined>(
    undefined,
  );

  const [autosData, setAutosData] = useState<IAutosData | undefined>(undefined);

  const [currentMovingAutoData, setCurrentMovingAutoData] =
    useState<any>(undefined);
  const [currentMarkerIndex, setcurrentMarkerIndex] = useState<number>(0);

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
          console.log(response);

          setAutosData(response.data);
        })
        .catch(error => {
          console.warn(error);
        });
    }, 5000);
  }, []);

  const zoomIn = () => {
    mapRef.current
      .getCamera()
      .then((camera: { altitude: number; zoom: number }) => {
        let cameraLevel = Platform.OS === 'ios' ? defaultAltitude : defaultZoom;

        if (Platform.OS === 'ios') {
          cameraLevel = Math.round(camera.altitude * 0.7);
        } else {
          cameraLevel =
            camera.zoom + 1 <= maxZoomIn ? camera.zoom + 1 : maxZoomIn;
        }

        mapRef.current.setCamera({
          ...camera,
          zoom: cameraLevel,
          altitude: cameraLevel,
        });
      });
  };

  const zoomOut = () => {
    mapRef.current
      .getCamera()
      .then((camera: { altitude: number; zoom: number }) => {
        let cameraLevel = Platform.OS === 'ios' ? defaultAltitude : defaultZoom;

        if (Platform.OS === 'ios') {
          cameraLevel = Math.round(camera.altitude * 1.3);
        } else {
          cameraLevel =
            camera.zoom - 1 >= maxZoomOut ? camera.zoom - 1 : maxZoomOut;
        }

        mapRef.current.setCamera({
          ...camera,
          zoom: cameraLevel,
          altitude: cameraLevel,
        });
      });
  };

  const getTrackGeometry = (trackGeometry: any, color: string) => {
    if (!trackGeometry) {
      return;
    }
    const matches = trackGeometry.match(regexTrackGeometry);

    const coordinates = [];

    if (matches) {
      for (let i = 0; i < matches.length; i += 2) {
        coordinates.push({
          longitude: Number(matches[i]),
          latitude: Number(matches[i + 1]),
        });
      }

      return {
        coordinates: coordinates,
        strokeWidth: 5,
        strokeColor: color,
      };
    }
  };

  const fwdTrackGeometry = useMemo(() => {
    return getTrackGeometry(stopsAndWaypoints?.fwdTrackGeom, 'green');
  }, [stopsAndWaypoints?.fwdTrackGeom]);

  const bkwdTrackGeometry = useMemo(() => {
    return getTrackGeometry(stopsAndWaypoints?.bkwdTrackGeom, 'blue');
  }, [stopsAndWaypoints?.bkwdTrackGeom]);

  const getStopPointsLocation = stopPoints => {
    if (!stopPoints) {
      return;
    }
    return stopPoints.map(stopPoint => {
      const match = regexStopPoints.exec(stopPoint.location);

      return {
        coordinate: {
          longitude: Number(match[1]),
          latitude: Number(match[2]),
        },
        id: stopPoint.stoppointId.toString(),
        name: stopPoint.stoppointName,
        note: stopPoint.note,
      };
    });
  };

  const fwdStopPointsLocation = useMemo(() => {
    return getStopPointsLocation(stopsAndWaypoints?.fwdStoppoints);
  }, [stopsAndWaypoints?.fwdStoppoints]);

  const bkwdStopPointsLocation = useMemo(() => {
    return getStopPointsLocation(stopsAndWaypoints?.bkwdStoppoints);
  }, [stopsAndWaypoints?.bkwdStoppoints]);

  const handleNavigateToSelectStopPoints = useCallback(
    (stopsData: IStopPointsData | undefined) => {
      setStopData(stopsData);
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
      <MapView
        ref={mapRef}
        style={styles.mapContainer}
        provider={Platform.OS === 'ios' ? null : 'osmdroid'}
        rotateEnabled={false}
        initialRegion={DEFAULT_COORDINATE}
        maxZoomIn={maxZoomIn}
        maxZoomOut={maxZoomOut}
        onRegionChangeComplete={() => {}}>
        {fwdTrackGeometry && (
          <MapObject type="route" route={fwdTrackGeometry} />
        )}
        {bkwdTrackGeometry && (
          <MapObject type="route" route={bkwdTrackGeometry} />
        )}
        {fwdStopPointsLocation &&
          fwdStopPointsLocation.map(stopPoint => (
            <MapObject
              key={stopPoint.id}
              type={'stop-point'}
              stopPoint={stopPoint}
              openStopPointModal={() => {
                handleNavigateToSelectStopPoints(stopPoint);
              }}
            />
          ))}
        {bkwdStopPointsLocation &&
          bkwdStopPointsLocation.map(stopPoint => (
            <MapObject
              key={stopPoint.id}
              type={'stop-point'}
              stopPoint={stopPoint}
              openStopPointModal={() => {
                handleNavigateToSelectStopPoints(stopPoint);
              }}
            />
          ))}
        {bkwdTrackGeometry &&
          fwdTrackGeometry &&
          autosData?.autos &&
          autosData.autos.map(auto => {
            return (
              <MapObject
                key={`${auto.gosNom}_${auto.kodPe}_${auto.routeId}`}
                type={'point'}
                vehicle={auto}
              />
            );
          })}
      </MapView>
      <MapControls onClickZoomIn={zoomIn} onClickZoomOut={zoomOut} />
      <SelectStopPoints
        title={'Остановка'}
        modalRef={selectStopPointsModalRef}
        stopPointsData={stopData}
      />
    </SafeAreaView>
  );
};

export default memo(Map);
