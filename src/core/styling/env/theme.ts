import { Theme } from '../types';

const COLOR_PRIMARY = '#ffffff';

export const theme: Theme = {
  palette: {
    background: {
      primary: '#313034',
      tabBar: '#2B2B2B',
      activeIcon: '#1088C5',
      icon: COLOR_PRIMARY,
      mapIcon: '#FF0000',
      card: '#414144',
      button: '#6600ff',
    },
    text: {
      primary: COLOR_PRIMARY,
    },
    border: {
      primary: '#515151',
    },
  },
  typography: {
    header: {
      fontFamily: 'Mulish-Regular',
      fontSize: 17,
      lineHeight: 22,
      fontWeight: '600',
      color: COLOR_PRIMARY,
      textTransform: 'uppercase',
    },
    h1: {
      fontFamily: 'Mulish-Bold',
      fontSize: 36,
      color: COLOR_PRIMARY,
    },
    h2: {
      fontFamily: 'Mulish-Regular',
      fontSize: 20,
      color: COLOR_PRIMARY,
    },
    h3: {
      fontFamily: 'Mulish-Regular',
      fontSize: 16,
      color: COLOR_PRIMARY,
    },
    h4: {
      fontFamily: 'Mulish-Regular',
      fontSize: 18,
      fontWeight: '600',
      color: COLOR_PRIMARY,
    },
    h5: {
      fontFamily: 'Mulish-Regular',
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 19,
      color: COLOR_PRIMARY,
    },
    button: {
      fontFamily: 'Mulish-Bold',
      fontSize: 16,
      lineHeight: 24,
      color: COLOR_PRIMARY,
    },
    body: {
      fontFamily: 'Mulish-Regular',
      fontSize: 14,
      color: COLOR_PRIMARY,
    },
    body2: {
      fontFamily: 'Mulish-Regular',
      fontSize: 16,
      lineHeight: 24,
      color: COLOR_PRIMARY,
    },
  },
};
