import { Dimensions, Platform } from 'react-native';

export {
  /**
   * iOS: This is IDFV or a random string if IDFV is unavaliable. Once UID is generated it is stored in iOS Keychain and NSUserDefaults. So it would stay the same even if you delete the app or reset IDFV. You can carefully consider it a persistent, cross-install unique ID. It can be changed only in case someone manually override values in Keychain/NSUserDefaults or if Apple would change Keychain and NSUserDefaults implementations. Beware: The IDFV is calculated using your bundle identifier and thus will be different in app extensions.
   * android: Prior to Oreo, this id (ANDROID_ID) will always be the same once you set up your phone.
   */
  getUniqueId,
  getBuildNumber,
  getVersion,
} from 'react-native-device-info';

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const WINDOW_WIDTH = Dimensions.get('window').width;
