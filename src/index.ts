/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from '../app.json';
import { withThemeProvider } from './core/styling';

const EnhancedApp = withThemeProvider(App);

AppRegistry.registerComponent(appName, () => EnhancedApp);
