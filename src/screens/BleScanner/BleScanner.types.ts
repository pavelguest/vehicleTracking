import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParams } from '../../navigation/Navigation.types';

export type TBleScannerProps = NativeStackScreenProps<
  NavigationParams,
  'BleScanner'
>;
interface ManufacturerRawData {
  CDVType: string;
  bytes: number[];
  data: string;
}

interface RawData {
  CDVType: string;
  bytes: number[];
  data: string;
}

interface Advertising {
  isConnectable: boolean;
  localName: string;
  manufacturerData: object;
  manufacturerRawData: ManufacturerRawData;
  rawData: RawData;
  serviceData: object;
  serviceUUIDs: string[];
  txPowerLevel: number;
}

export interface IBleDevice {
  advertising: Advertising;
  id: string;
  name: string;
  rssi: number;
}

export interface IBeaconViewProps {
  item: IBleDevice;
  onPress: () => void;
}
