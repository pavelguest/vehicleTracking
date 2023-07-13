import { Theme } from './types';

import 'react-native-stylex';

declare module 'react-native-stylex' {
  export interface DefaultTheme extends Theme {}
}
