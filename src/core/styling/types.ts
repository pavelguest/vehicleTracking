import { TextStyle } from 'react-native';

interface Typography {
  fontSize: number;
  fontFamily: string;
  letterSpacing?: number;
  lineHeight?: number;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  fontWeight?: TextStyle['fontWeight'];
  color?: string;
}

export interface Theme {
  palette: {
    background: {
      primary: string;
      tabBar: string;
      activeIcon: string;
      icon: string;
      mapIcon: string;
      card: string;
      button: string;
    };
    text: {
      primary: string;
    };
    border: {
      primary: string;
    };
  };
  typography: {
    header: Typography;
    h1: Typography;
    h2: Typography;
    h3: Typography;
    h4: Typography;
    h5: Typography;
    button: Typography;
    body: Typography;
    body2: Typography;
  };
}
