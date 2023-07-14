import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParams } from '../../navigation/Navigation.types';

export type THomeProps = NativeStackScreenProps<NavigationParams, 'Home'>;

export interface IStopsAndWaPointsData {
  routeId: string;
  routeNumber: null;
  routeName: null;
  routeTypeId: null;
  fwdTrackGeom: string;
  bkwdTrackGeom: string;
  fwdStoppoints: IStopPointsData[];
  bkwdStoppoints: IStopPointsData[];
  fwdHaltes: null;
  bkwdHaltes: null;
  timeTable: null;
  arrivalTimes: null;
  routeDate: null;
  routeDateNew: null;
  routeVar: null;
  routeVarNext: null;
  fwdTrack: null;
  bkwdTrack: null;
  autos: null;
}

export interface IStopPointsData {
  nodeId: null;
  stoppointId: number;
  stoppointName: string;
  note: null;
  course: number;
  equippedWithBoard: boolean;
  board: null;
  labelXOffset: number;
  labelYOffset: number;
  design: null;
  dimension: null;
  areaId: null;
  landmark: null;
  pavilionType: null;
  act: null;
  photo: null;
  district: null;
  stoppointTypeCode: number;
  timeTable: null;
  routes: null;
  location: string;
}
