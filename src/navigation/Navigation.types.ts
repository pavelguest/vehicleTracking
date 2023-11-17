import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type NavigationParams = {
  Home: undefined;
  Map: undefined;
  Scanner: undefined;
  ScannerOld: undefined;
};

export type NavigationProps = NativeStackNavigationProp<NavigationParams>;

export type HeaderTitleProps = {
  /**
   * The title text of the header.
   */
  children: string;
  /**
   * Whether title font should scale to respect Text Size accessibility settings.
   */
  allowFontScaling?: boolean;
  /**
   * Tint color for the header.
   */
  tintColor?: string;
};
