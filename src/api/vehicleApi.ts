import axios from 'axios';
import { VEHICLE_API } from '../core/utils/constants';

export const getStopsAndWaypointsData = (date: string, routeId: string) =>
  axios.get(`${VEHICLE_API.BASE_URL}full-route/${date}/${routeId}`);

export const getVehiclesTrackingData = (routeIds: string) =>
  axios.get(`${VEHICLE_API.BASE_URL}get-moving-autos/${routeIds}`);
