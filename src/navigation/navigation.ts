import {
  createNavigationContainerRef,
  useNavigation as useNavigationRN,
} from '@react-navigation/native';

import { NavigationParams, NavigationProps } from './Navigation.types';

export const useNavigation = () => useNavigationRN<NavigationProps>();

export const navigationRef = createNavigationContainerRef<NavigationParams>();

export function navigate(name: any, params?: any) {
  navigationRef.current?.navigate(name, params);
}
